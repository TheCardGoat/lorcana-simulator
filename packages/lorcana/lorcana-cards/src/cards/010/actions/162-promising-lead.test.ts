import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { basilTenaciousMouse } from "../characters";
import { promisingLead } from "./162-promising-lead";

describe("Promising Lead", () => {
  it("gives the chosen Detective +2 lore and Support this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [promisingLead],
      inkwell: promisingLead.cost,
      play: [basilTenaciousMouse],
    });

    const playResult = testEngine.asPlayerOne().playCard(promisingLead, {
      targets: [basilTenaciousMouse],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).toHaveLore({ card: basilTenaciousMouse, value: 4 });
    expect(testEngine.asPlayerOne()).toHaveKeyword({
      card: basilTenaciousMouse,
      keyword: "Support",
    });
  });

  it("does not grant Support to a non-Detective", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [promisingLead],
      inkwell: promisingLead.cost,
      play: [simbaProtectiveCub],
    });

    const playResult = testEngine.asPlayerOne().playCard(promisingLead, {
      targets: [simbaProtectiveCub],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).toHaveLore({ card: simbaProtectiveCub, value: 3 });
    expect(testEngine.asPlayerOne()).not.toHaveKeyword({
      card: simbaProtectiveCub,
      keyword: "Support",
    });
  });
});
