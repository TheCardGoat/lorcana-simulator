import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { rapunzelEtherealProtector } from "./171-rapunzel-ethereal-protector";

describe("Rapunzel - Ethereal Protector", () => {
  it("should quest for base lore", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: rapunzelEtherealProtector, isDrying: false }],
    });

    expect(testEngine.asPlayerOne().quest(rapunzelEtherealProtector)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(rapunzelEtherealProtector.lore);
  });
});
