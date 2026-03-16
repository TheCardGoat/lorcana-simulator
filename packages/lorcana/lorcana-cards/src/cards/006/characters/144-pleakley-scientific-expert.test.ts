import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { pleakleyScientificExpert } from "./144-pleakley-scientific-expert";

const friendlyResearcher = createMockCharacter({
  id: "pleakley-friendly-researcher",
  name: "Friendly Researcher",
  cost: 2,
});

describe("Pleakley - Scientific Expert", () => {
  it("puts a chosen character of yours into your inkwell facedown and exerted when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [pleakleyScientificExpert],
      inkwell: pleakleyScientificExpert.cost,
      play: [friendlyResearcher],
      deck: 1,
    });
    const researcherId = testEngine.findCardInstanceId(friendlyResearcher, "play", "p1");

    expect(testEngine.asPlayerOne().playCard(pleakleyScientificExpert)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        targets: [researcherId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(researcherId)).toBe("inkwell");
    expect(testEngine.asServer().getCard(researcherId)).toEqual(
      expect.objectContaining({ exerted: true, zone: "inkwell" }),
    );
    expect(
      testEngine.getAuthoritativeState().ctx.zones.private.cardMeta[researcherId]?.publicFaceState,
    ).toBe("faceDown");
  });
});
