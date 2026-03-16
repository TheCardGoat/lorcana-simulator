import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mulanFreeSpirit } from "./015-mulan-free-spirit";

describe("Mulan - Free Spirit", () => {
  it("Has Support", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: mulanFreeSpirit }],
    });

    const mulanId = testEngine.findCardInstanceId(mulanFreeSpirit, "play");
    const mulan = testEngine.asServer().getCard(mulanId);

    expect(mulan.keywords).toContain("Support");
  });
});
