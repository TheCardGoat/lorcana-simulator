import { describe, expect, it } from "bun:test";
import type { ZoneId } from "@tcg/lorcana-engine";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockAction,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { fireflySwarm } from "./130-firefly-swarm";

const weakTarget = createMockCharacter({
  id: "firefly-swarm-weak",
  name: "Weak Target",
  cost: 2,
  strength: 2,
  willpower: 4,
});

const strongTarget = createMockCharacter({
  id: "firefly-swarm-strong",
  name: "Strong Target",
  cost: 4,
  strength: 4,
  willpower: 5,
});

const filler1 = createMockAction({ id: "firefly-swarm-filler-1", name: "Filler 1", cost: 1 });
const filler2 = createMockAction({ id: "firefly-swarm-filler-2", name: "Filler 2", cost: 1 });

describe("Firefly Swarm", () => {
  it("option 1: banishes a chosen character with 2 strength or less", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [fireflySwarm],
        inkwell: fireflySwarm.cost,
      },
      {
        play: [weakTarget],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardWithChoice(fireflySwarm, 0, {
        targets: [weakTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(weakTarget)).toBe("discard");
  });

  it("option 1: cannot banish a character with more than 2 strength", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [fireflySwarm],
        inkwell: fireflySwarm.cost,
      },
      {
        play: [strongTarget],
      },
    );

    testEngine.asPlayerOne().playCardWithChoice(fireflySwarm, 0, {
      targets: [strongTarget],
    });

    expect(testEngine.asPlayerTwo().getCardZone(strongTarget)).toBe("play");
  });

  it("option 2: banishes chosen character when 2+ cards were put into your discard this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [fireflySwarm, filler1, filler2],
        inkwell: fireflySwarm.cost,
      },
      {
        play: [strongTarget],
      },
    );

    const filler1Id = testEngine.findCardInstanceId(filler1, "hand", PLAYER_ONE);
    const filler2Id = testEngine.findCardInstanceId(filler2, "hand", PLAYER_ONE);

    expect(
      testEngine.asServer().manualMoveCard(filler1Id, `discard:${PLAYER_ONE}` as ZoneId),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asServer().manualMoveCard(filler2Id, `discard:${PLAYER_ONE}` as ZoneId),
    ).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().playCardWithChoice(fireflySwarm, 1, {
        targets: [strongTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(strongTarget)).toBe("discard");
  });

  it("option 2: is rejected when fewer than 2 cards were put into your discard this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [fireflySwarm, filler1],
        inkwell: fireflySwarm.cost,
      },
      {
        play: [strongTarget],
      },
    );

    const filler1Id = testEngine.findCardInstanceId(filler1, "hand", PLAYER_ONE);
    expect(
      testEngine.asServer().manualMoveCard(filler1Id, `discard:${PLAYER_ONE}` as ZoneId),
    ).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().playCardWithChoice(fireflySwarm, 1, {
        targets: [strongTarget],
      }),
    ).not.toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(strongTarget)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(fireflySwarm)).toBe("hand");
  });
});
