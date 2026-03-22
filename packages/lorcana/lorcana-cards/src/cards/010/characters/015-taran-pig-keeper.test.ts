import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { taranPigKeeper } from "./015-taran-pig-keeper";
import { henWenPropheticPig } from "./138-hen-wen-prophetic-pig";

const henWenOtherVersion = createMockCharacter({
  id: "taran-hen-wen-mock",
  name: "Hen Wen",
  cost: 2,
});

const otherCharacterInDiscard = createMockCharacter({
  id: "taran-other-char",
  name: "Some Other Character",
  cost: 2,
});

describe("Taran - Pig Keeper", () => {
  it("has Support keyword", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: taranPigKeeper }],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().hasKeyword(taranPigKeeper, "Support")).toBe(true);
  });

  describe("FOLLOW THE PIG", () => {
    it("returns a Hen Wen character from discard to hand when questing", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: taranPigKeeper }],
        discard: [{ card: henWenPropheticPig }],
        deck: 1,
      });

      expect(testEngine.asPlayerOne().quest(taranPigKeeper)).toBeSuccessfulCommand();

      // Questing with Support creates bag entries: Support trigger + FOLLOW THE PIG trigger
      // Find the FOLLOW THE PIG bag effect (the return-from-discard one)
      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThanOrEqual(1);

      // Resolve all bag effects. The FOLLOW THE PIG effect is the one that
      // requires resolveOptional, while Support may auto-resolve or also need resolution.
      for (const bagEffect of bagEffects) {
        expect(
          testEngine.asPlayerOne().resolveBag(bagEffect.id, { resolveOptional: true }),
        ).toBeSuccessfulCommand();
      }

      // After resolution, Hen Wen should be in hand
      const pendingChoice = testEngine.asPlayerOne().getPendingChoice();
      if (pendingChoice) {
        const henWenId = testEngine.findCardInstanceId(henWenPropheticPig, "discard");
        expect(
          testEngine.asPlayerOne().resolveNextPending({ targets: [henWenId] }),
        ).toBeSuccessfulCommand();
      }

      expect(testEngine.asPlayerOne().getCardZone(henWenPropheticPig)).toBe("hand");
    });

    it("is optional — can decline to return Hen Wen from discard", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: taranPigKeeper }],
        discard: [{ card: henWenPropheticPig }],
        deck: 1,
      });

      expect(testEngine.asPlayerOne().quest(taranPigKeeper)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThanOrEqual(1);

      // Decline all optional bag effects
      for (const bagEffect of bagEffects) {
        testEngine.asPlayerOne().resolveBag(bagEffect.id, { resolveOptional: false });
      }

      expect(testEngine.asPlayerOne().getCardZone(henWenPropheticPig)).toBe("discard");
    });

    it("does not produce a FOLLOW THE PIG trigger when no Hen Wen is in discard", () => {
      const testEngineWith = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: taranPigKeeper }],
        discard: [{ card: otherCharacterInDiscard }],
        deck: 1,
      });

      const testEngineWithout = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: taranPigKeeper }],
        deck: 1,
      });

      expect(testEngineWith.asPlayerOne().quest(taranPigKeeper)).toBeSuccessfulCommand();
      expect(testEngineWithout.asPlayerOne().quest(taranPigKeeper)).toBeSuccessfulCommand();

      // When no Hen Wen is in discard, bag count should be the same as with no discard at all
      const bagCountWith = testEngineWith.asPlayerOne().getBagCount();
      const bagCountWithout = testEngineWithout.asPlayerOne().getBagCount();
      expect(bagCountWith).toBe(bagCountWithout);
    });

    it("also works with a different Hen Wen card version (same name)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: taranPigKeeper }],
        discard: [{ card: henWenOtherVersion }],
        deck: 1,
      });

      expect(testEngine.asPlayerOne().quest(taranPigKeeper)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThanOrEqual(1);

      // Resolve all bag effects, accepting the optional ones
      for (const bagEffect of bagEffects) {
        testEngine.asPlayerOne().resolveBag(bagEffect.id, { resolveOptional: true });
      }

      const pendingChoice = testEngine.asPlayerOne().getPendingChoice();
      if (pendingChoice) {
        const henWenId = testEngine.findCardInstanceId(henWenOtherVersion, "discard");
        expect(
          testEngine.asPlayerOne().resolveNextPending({ targets: [henWenId] }),
        ).toBeSuccessfulCommand();
      }

      expect(testEngine.asPlayerOne().getCardZone(henWenOtherVersion)).toBe("hand");
    });
  });
});
