import { describe, expect, it } from "bun:test";
import type { CommandFailure } from "@tcg/lorcana-engine";
import type { CharacterCard } from "@tcg/lorcana-types";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  PLAYER_TWO,
} from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend } from "../../001";
import { plasmaBlaster } from "../../001/items/204-plasma-blaster";
import { dragonFire } from "../../010/actions/133-dragon-fire";
import { ragingStorm } from "../actions/028-raging-storm";
import { strengthOfARagingFire } from "../../002/actions/201-strength-of-a-raging-fire";
import { goliathClanLeader } from "../../010/characters/173-goliath-clan-leader";
import { johnSmithUndauntedProtector } from "./193-john-smith-undaunted-protector";

const johnSmithWithWard: CharacterCard = {
  ...johnSmithUndauntedProtector,
  id: "h1O-ward",
  canonicalId: "ci_h1O_ward",
  abilities: [
    ...(johnSmithUndauntedProtector.abilities ?? []),
    {
      id: "h1O-ward-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
  ],
};

describe("John Smith - Undaunted Protector", () => {
  it("has Bodyguard", () => {
    const testEngine = new LorcanaTestEngine({
      play: [johnSmithUndauntedProtector],
    });

    expect(testEngine.getCardModel(johnSmithUndauntedProtector).hasBodyguard()).toBe(true);
  });

  it("forces opponents to target him with action cards if able", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [dragonFire],
        inkwell: dragonFire.cost,
      },
      {
        play: [johnSmithUndauntedProtector, mickeyMouseTrueFriend],
      },
    );

    const rejectedResult = testEngine.asPlayerOne().playCard(dragonFire, {
      targets: [mickeyMouseTrueFriend],
    }) as CommandFailure;

    expect(rejectedResult.success).toBe(false);
    expect(rejectedResult.errorCode).toBe("TARGET_DO_YOUR_WORST_RESTRICTION");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("play");

    expect(
      testEngine.asPlayerOne().playCard(dragonFire, {
        targets: [johnSmithUndauntedProtector],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(johnSmithUndauntedProtector)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("play");
  });

  it("forces opponents to target him with activated abilities if able", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [plasmaBlaster],
        inkwell: 2,
      },
      {
        play: [johnSmithUndauntedProtector, mickeyMouseTrueFriend],
      },
    );

    const rejectedResult = testEngine.asPlayerOne().activateAbility(plasmaBlaster, {
      targets: [mickeyMouseTrueFriend],
    }) as CommandFailure;

    expect(rejectedResult.success).toBe(false);
    expect(rejectedResult.errorCode).toBe("TARGET_DO_YOUR_WORST_RESTRICTION");
    expect(testEngine.asPlayerTwo().getDamage(mickeyMouseTrueFriend)).toBe(0);

    expect(
      testEngine.asPlayerOne().activateAbility(plasmaBlaster, {
        targets: [johnSmithUndauntedProtector],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getDamage(johnSmithUndauntedProtector)).toBe(1);
  });

  it("allows choosing either John Smith when multiple are in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [dragonFire],
        inkwell: dragonFire.cost,
      },
      {
        play: [johnSmithUndauntedProtector, johnSmithUndauntedProtector, mickeyMouseTrueFriend],
      },
    );

    const johnSmithIds = testEngine
      .getCardInstanceIdsInZone("play", PLAYER_TWO)
      .filter(
        (cardId) => testEngine.getCardDefinitionId(cardId) === johnSmithUndauntedProtector.id,
      );

    expect(
      testEngine.asPlayerOne().playCard(dragonFire, {
        targets: [johnSmithIds[0]!],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("play");
  });

  it("does not affect the card owner's own targeting choices", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [dragonFire],
      inkwell: dragonFire.cost,
      play: [johnSmithUndauntedProtector, mickeyMouseTrueFriend],
    });

    expect(
      testEngine.asPlayerOne().playCard(dragonFire, {
        targets: [mickeyMouseTrueFriend],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(mickeyMouseTrueFriend)).toBe("discard");
    expect(testEngine.asPlayerOne().getCardZone(johnSmithUndauntedProtector)).toBe("play");
  });

  it("does not affect non-chosen effects", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [ragingStorm],
        inkwell: ragingStorm.cost,
      },
      {
        play: [johnSmithUndauntedProtector, mickeyMouseTrueFriend],
      },
    );

    expect(testEngine.asPlayerOne().playCard(ragingStorm)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(johnSmithUndauntedProtector)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("discard");
  });

  // Regression: John Smith's DO YOUR WORST was not preventing Strength of a Raging Fire
  // from targeting Goliath - Clan Leader when John Smith was in play (fixed Feb 23)
  it("regression: prevents Strength of a Raging Fire from targeting Goliath when John Smith is in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [strengthOfARagingFire],
        inkwell: strengthOfARagingFire.cost,
        play: [mickeyMouseTrueFriend, goliathClanLeader],
      },
      {
        play: [johnSmithUndauntedProtector, goliathClanLeader],
      },
    );

    // Attempting to target opponent's Goliath should fail because John Smith must be chosen
    const rejectedResult = testEngine.asPlayerOne().playCard(strengthOfARagingFire, {
      targets: [testEngine.findCardInstanceId(goliathClanLeader, "play", PLAYER_TWO)],
    }) as CommandFailure;

    expect(rejectedResult.success).toBe(false);
    expect(rejectedResult.errorCode).toBe("TARGET_DO_YOUR_WORST_RESTRICTION");

    // Targeting John Smith should succeed
    expect(
      testEngine.asPlayerOne().playCard(strengthOfARagingFire, {
        targets: [johnSmithUndauntedProtector],
      }),
    ).toBeSuccessfulCommand();
  });

  it("allows other targets when John Smith has Ward and is not legal", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [plasmaBlaster],
        inkwell: 2,
      },
      {
        play: [johnSmithWithWard, mickeyMouseTrueFriend],
      },
    );

    expect(
      testEngine.asPlayerOne().activateAbility(plasmaBlaster, {
        targets: [mickeyMouseTrueFriend],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getDamage(mickeyMouseTrueFriend)).toBe(1);
    expect(testEngine.asPlayerTwo().getDamage(johnSmithWithWard)).toBe(0);
  });
});
