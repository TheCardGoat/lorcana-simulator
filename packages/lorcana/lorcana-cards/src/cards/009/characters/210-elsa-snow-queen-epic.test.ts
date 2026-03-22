import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { elsaSnowQueenEpic } from "./210-elsa-snow-queen-epic";

const opposingCharacter = createMockCharacter({
  id: "elsa-snow-queen-epic-target",
  name: "Opposing Character",
  cost: 3,
});

describe("Elsa - Snow Queen (Epic)", () => {
  it("FREEZE {E} — exerts chosen opposing character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: elsaSnowQueenEpic, isDrying: false }],
        deck: 1,
      },
      {
        play: [opposingCharacter],
        deck: 1,
      },
    );

    expect(testEngine.asPlayerTwo().getCard(opposingCharacter).exerted).toBe(false);

    expect(
      testEngine.asPlayerOne().activateAbility(elsaSnowQueenEpic, {
        targets: [opposingCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(elsaSnowQueenEpic)).toBe(true);
    expect(testEngine.asPlayerTwo().getCard(opposingCharacter).exerted).toBe(true);
  });

  it("FREEZE cannot target own characters", () => {
    const ownCharacter = createMockCharacter({
      id: "elsa-snow-queen-epic-own-target",
      name: "Own Character",
      cost: 2,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: elsaSnowQueenEpic, isDrying: false }, ownCharacter],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().activateAbility(elsaSnowQueenEpic, {
        targets: [ownCharacter],
      }),
    ).not.toBeSuccessfulCommand();
  });
});
