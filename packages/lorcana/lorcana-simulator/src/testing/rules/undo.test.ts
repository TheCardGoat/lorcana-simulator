import { describe, expect, it } from "bun:test";
import {
  arielOnHumanLegs,
  stitchNewDog,
  friendsOnTheOtherSide,
} from "@tcg/lorcana-cards/cards/001";
import {
  getLorcanaServerAuthoritativeSnapshot,
  loadLorcanaServerAuthoritativeSnapshot,
} from "@tcg/lorcana-engine";
import type { MatchStaticResources } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";

const inkableCard = arielOnHumanLegs;
const vanillaCharacter = stitchNewDog;
const drawAction = friendsOnTheOtherSide;

function getServerCardCatalog(server: { getResolvedStaticResources(): MatchStaticResources }) {
  return server.getResolvedStaticResources().cards;
}

describe("Undo", () => {
  describe("undoable moves", () => {
    it("ink a card -> undo succeeds -> card back in hand, ink restored", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkableCard],
        deck: 1,
      });

      const server = engine.getServerEngine();
      const initialStateID = server.getStateID();

      expect(engine.asPlayerOne().ink(inkableCard)).toBeSuccessfulCommand();
      expect(engine.asPlayerOne().getZonesCardCount().hand).toBe(0);
      expect(engine.asPlayerOne().getZonesCardCount().inkwell).toBe(1);
      expect(server.getStateID()).toBe(initialStateID + 1);

      expect(server.canUndo(PLAYER_ONE)).toBe(true);
      expect(server.undo(PLAYER_ONE).success).toBe(true);

      expect(engine.asPlayerOne().getZonesCardCount().hand).toBe(1);
      expect(engine.asPlayerOne().getZonesCardCount().inkwell).toBe(0);
      expect(engine.asPlayerOne().getCardZone(inkableCard)).toBe("hand");
      expect(server.getStateID()).toBe(initialStateID + 2);
      expect(server.getMoveHistory()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            moveId: "putCardIntoInkwell",
            transitionType: "move",
            newStateID: initialStateID + 1,
          }),
          expect.objectContaining({
            moveId: "undo",
            transitionType: "undo",
            undoneStateID: initialStateID + 1,
            restoredCheckpointStateID: initialStateID,
            newStateID: initialStateID + 2,
            undoneMoveId: "putCardIntoInkwell",
          }),
        ]),
      );
    });

    it("quest with character (no triggered draw) -> undo succeeds -> lore reverted, card readied", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [vanillaCharacter],
        inkwell: vanillaCharacter.cost,
        deck: 1,
      });

      const server = engine.getServerEngine();
      const loreBefore = engine.asPlayerOne().getLore(PLAYER_ONE);

      expect(engine.asPlayerOne().quest(vanillaCharacter)).toBeSuccessfulCommand();
      expect(engine.asPlayerOne().getLore(PLAYER_ONE)).toBe(loreBefore + vanillaCharacter.lore);
      expect(engine.asPlayerOne().isExerted(vanillaCharacter)).toBe(true);

      expect(server.canUndo(PLAYER_ONE)).toBe(true);
      expect(server.undo(PLAYER_ONE).success).toBe(true);

      expect(engine.asPlayerOne().getLore(PLAYER_ONE)).toBe(loreBefore);
      expect(engine.asPlayerOne().isExerted(vanillaCharacter)).toBe(false);
    });

    it("challenge (no triggered draw) -> undo succeeds -> damage reverted", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: arielOnHumanLegs, exerted: false }],
          inkwell: arielOnHumanLegs.cost,
          deck: 1,
        },
        {
          play: [{ card: vanillaCharacter, exerted: true }],
          deck: 1,
        },
      );

      const server = engine.getServerEngine();

      expect(
        engine.asPlayerOne().challenge(arielOnHumanLegs, vanillaCharacter),
      ).toBeSuccessfulCommand();

      expect(server.canUndo(PLAYER_ONE)).toBe(true);
      expect(server.undo(PLAYER_ONE).success).toBe(true);

      // After undo, damage should be reverted
      expect(engine.asPlayerOne().getDamage(arielOnHumanLegs)).toBe(0);
      expect(engine.asPlayerOne().isExerted(arielOnHumanLegs)).toBe(false);
    });
  });

  describe("non-undoable moves", () => {
    it("play action card that draws -> undo fails (info revealed)", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [drawAction],
        inkwell: drawAction.cost,
        deck: 10,
      });

      const server = engine.getServerEngine();

      expect(engine.asPlayerOne().playCard(drawAction)).toBeSuccessfulCommand();

      expect(server.canUndo(PLAYER_ONE)).toBe(false);
      expect(server.undo(PLAYER_ONE).success).toBe(false);
    });
  });

  describe("undo restrictions", () => {
    it("only the acting player can undo (opponent request rejected)", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [inkableCard],
          deck: 1,
        },
        {
          deck: 1,
        },
      );

      const server = engine.getServerEngine();

      expect(engine.asPlayerOne().ink(inkableCard)).toBeSuccessfulCommand();

      expect(server.canUndo(PLAYER_ONE)).toBe(true);
      expect(server.canUndo(PLAYER_TWO)).toBe(false);
      expect(server.undo(PLAYER_TWO).success).toBe(false);

      // Player one can still undo
      expect(server.canUndo(PLAYER_ONE)).toBe(true);
    });

    it("undo clears after next move (only most recent undoable move)", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkableCard],
        play: [vanillaCharacter],
        inkwell: vanillaCharacter.cost,
        deck: 1,
      });

      const server = engine.getServerEngine();

      // First move: ink
      expect(engine.asPlayerOne().ink(inkableCard)).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(true);

      // Second move: quest
      expect(engine.asPlayerOne().quest(vanillaCharacter)).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(true);

      // Undo restores the quest, not the ink
      expect(server.undo(PLAYER_ONE).success).toBe(true);
      expect(engine.asPlayerOne().isExerted(vanillaCharacter)).toBe(false);
      // Ink should still be applied
      expect(engine.asPlayerOne().getCardZone(inkableCard)).toBe("inkwell");
    });

    it("pass turn -> undo checkpoint cleared (same-turn scope)", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [inkableCard],
          deck: 1,
        },
        {
          deck: 1,
        },
      );

      const server = engine.getServerEngine();

      expect(engine.asPlayerOne().ink(inkableCard)).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(true);

      // Pass turn clears checkpoint (passTurn triggers draw -> info revealed -> non-undoable)
      expect(engine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(false);
      expect(server.canUndo(PLAYER_TWO)).toBe(false);
    });

    it("non-undoable move clears previous checkpoint", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkableCard, drawAction],
        inkwell: drawAction.cost,
        deck: 10,
      });

      const server = engine.getServerEngine();

      // Undoable move
      expect(engine.asPlayerOne().ink(inkableCard)).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(true);

      // Non-undoable move clears checkpoint
      expect(engine.asPlayerOne().playCard(drawAction)).toBeSuccessfulCommand();
      expect(server.canUndo(PLAYER_ONE)).toBe(false);
    });

    it("player client sees undo after ink and can execute it", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkableCard],
        deck: 1,
      });

      const playerOne = engine.asPlayerOne();

      expect(playerOne.canUndo()).toBe(false);
      expect(playerOne.ink(inkableCard)).toBeSuccessfulCommand();
      expect(playerOne.canUndo()).toBe(true);

      const undoResult = playerOne.undo();
      expect(undoResult.success).toBe(true);
      expect(playerOne.canUndo()).toBe(false);
      expect(playerOne.getCardZone(inkableCard)).toBe("hand");
      expect(playerOne.getZonesCardCount().inkwell).toBe(0);
      expect(playerOne.getStateID()).toBe(2);
    });

    it("restores undo checkpoint from authoritative snapshot and keeps client undo available", () => {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkableCard],
        deck: 1,
      });
      const server = engine.asServer();
      const playerOne = engine.asPlayerOne();

      expect(playerOne.ink(inkableCard)).toBeSuccessfulCommand();
      expect(playerOne.canUndo()).toBe(true);

      const snapshot = getLorcanaServerAuthoritativeSnapshot(server, engine.getCardsMaps());
      loadLorcanaServerAuthoritativeSnapshot(
        snapshot,
        getServerCardCatalog(
          server as typeof server & {
            getResolvedStaticResources(): MatchStaticResources;
          },
        ),
        server,
      );

      expect(server.canUndo(PLAYER_ONE)).toBe(true);
      expect(playerOne.canUndo()).toBe(true);

      const undoResult = playerOne.undo();
      expect(undoResult.success).toBe(true);
      expect(playerOne.getCardZone(inkableCard)).toBe("hand");
      expect(playerOne.getStateID()).toBe(2);
    });
  });
});
