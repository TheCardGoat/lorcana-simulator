import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, mickeyMouseSteamboatPilot, simbaProtectiveCub } from "../../001";
import { akoodEtEmuti } from "./029-akood-et-emuti";

describe("Akood et Emuti", () => {
  it("reduces the next character you play this turn and draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [akoodEtEmuti, heiheiBoatSnack],
      inkwell: 0,
      play: [mickeyMouseSteamboatPilot],
      deck: [simbaProtectiveCub],
    });

    expect(testEngine.asPlayerOne().singSong(akoodEtEmuti, mickeyMouseSteamboatPilot).success).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("hand");

    expect(testEngine.asPlayerOne().playCard(heiheiBoatSnack)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("play");
  });
});
