import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend } from "../characters";
import { fishboneQuill } from "./168-fishbone-quill";

describe("Fishbone Quill", () => {
  it("puts a chosen card from your hand into your inkwell facedown", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [mickeyMouseTrueFriend],
      play: [fishboneQuill],
    });

    const result = testEngine.asPlayerOne().activateAbility(fishboneQuill);

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(fishboneQuill)).toBe(true);
    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({ hand: 0, inkwell: 1 }),
    );
    expect(testEngine.asPlayerOne().getCardZone(mickeyMouseTrueFriend)).toBe("inkwell");
    expect(testEngine.getCardPublicFaceState(mickeyMouseTrueFriend, "inkwell")).toBe("faceDown");

    const inkwellCard = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "inkwell", "p1");
    expect(testEngine.asServer().getCard(inkwellCard)).toEqual(
      expect.objectContaining({ zone: "inkwell", exerted: false }),
    );
  });
});
