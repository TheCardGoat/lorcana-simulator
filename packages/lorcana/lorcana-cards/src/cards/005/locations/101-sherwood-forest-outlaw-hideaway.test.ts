import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { sherwoodForestOutlawHideaway } from "./101-sherwood-forest-outlaw-hideaway";

const robinHood = createMockCharacter({
  id: "sherwood-robin-hood",
  name: "Robin Hood",
  cost: 3,
  strength: 3,
  willpower: 4,
});

const outlaw = createMockCharacter({
  id: "sherwood-outlaw",
  name: "Sherwood Outlaw",
  cost: 2,
  strength: 2,
  willpower: 4,
});

const damagedTarget = createMockCharacter({
  id: "sherwood-target",
  name: "Damaged Target",
  cost: 2,
  strength: 2,
  willpower: 4,
});

describe("Sherwood Forest - Outlaw Hideaway", () => {
  it("lets Robin Hood move here for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [sherwoodForestOutlawHideaway, robinHood],
    });

    expect(
      testEngine.asPlayerOne().moveCharacterToLocation(robinHood, sherwoodForestOutlawHideaway)
        .success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getCardLocationId(robinHood)).toBe(
      testEngine.findCardInstanceId(sherwoodForestOutlawHideaway, "play", "p1"),
    );
  });

  it("gives characters here Ward and the granted damage ability", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [
          sherwoodForestOutlawHideaway,
          { card: outlaw, atLocation: sherwoodForestOutlawHideaway },
        ],
        inkwell: 1,
        deck: 1,
      },
      {
        play: [{ card: damagedTarget, damage: 1 }],
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().hasKeyword(outlaw, "Ward")).toBe(true);
    expect(
      testEngine
        .asPlayerOne()
        .activateAbility(outlaw, { ability: "FAMILIAR TERRAIN", targets: [damagedTarget] }).success,
    ).toBe(true);
    expect(testEngine.asPlayerTwo().getCard(damagedTarget)?.damage).toBe(3);
  });
});
