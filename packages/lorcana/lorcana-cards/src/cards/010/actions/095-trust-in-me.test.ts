import { describe, expect, it } from "bun:test";
import { PLAYER_ONE, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, moanaOfMotunui, simbaProtectiveCub } from "../../001/characters";
import { princeNaveenUkulelePlayer } from "../../005/characters";
import { balooFriendAndGuardian, duckworthGhostButler } from "../characters";
import { trustInMe } from "./095-trust-in-me";

describe("Trust In Me", () => {
  it("gives each opposing character -1 lore until the start of your next turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [trustInMe],
        inkwell: trustInMe.cost,
        play: [balooFriendAndGuardian],
      },
      {
        play: [duckworthGhostButler],
      },
    );

    const playerOne = testEngine.asPlayerOne();
    const playerTwo = testEngine.asPlayerTwo();

    expect(playerOne.playCardWithChoice(trustInMe, 0)).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 1 });

    expect(playerOne.passTurn()).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 1 });

    expect(playerTwo.passTurn()).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 2 });
  });

  it("removes only one effective lore from characters whose lore is already increased", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [trustInMe],
        inkwell: trustInMe.cost,
        play: [balooFriendAndGuardian],
      },
      {
        play: [{ card: duckworthGhostButler, lore: 3 }],
      },
    );

    const playerOne = testEngine.asPlayerOne();
    const playerTwo = testEngine.asPlayerTwo();

    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 3 });
    expect(playerOne.playCardWithChoice(trustInMe, 0)).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 2 });

    expect(playerOne.passTurn()).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 2 });

    expect(playerTwo.passTurn()).toBeSuccessfulCommand();
    expect(playerTwo).toHaveLore({ card: duckworthGhostButler, value: 3 });
  });

  it("lets each opponent choose and discard 2 cards in the second mode", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [trustInMe],
        inkwell: trustInMe.cost,
        play: [balooFriendAndGuardian],
      },
      {
        hand: [duckworthGhostButler, mickeyMouseTrueFriend, simbaProtectiveCub],
      },
    );

    const playerOne = testEngine.asPlayerOne();
    const playerTwo = testEngine.asPlayerTwo();
    const duckworthId = testEngine.findCardInstanceId(duckworthGhostButler, "hand", "p2");
    const mickeyId = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "hand", "p2");

    expect(playerOne.playCardWithChoice(trustInMe, 1)).toBeSuccessfulCommand();
    expect(playerTwo.respondWith(duckworthId, mickeyId)).toBeSuccessfulCommand();

    expect(playerTwo).toHaveZoneCounts({ hand: 1, discard: 2 });
  });

  it("can be sung for free and still choose a mode", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [trustInMe],
        play: [princeNaveenUkulelePlayer],
      },
      {
        play: [duckworthGhostButler, moanaOfMotunui],
      },
    );
    const singerId = testEngine.findCardInstanceId(princeNaveenUkulelePlayer, "play", "p1");

    const result = testEngine.asPlayerOne().playCard(trustInMe, {
      cost: { cost: "sing", singer: singerId },
      choiceIndex: 0,
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo()).toHaveLore({ card: duckworthGhostButler, value: 1 });
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
  });
});
