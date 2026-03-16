import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { dragonFire, heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { jasmineSteadyStrategist } from "../../008";
import { colorsOfTheWind } from "./064-colors-of-the-wind";

describe("Colors of the Wind", () => {
  it("draws for each distinct single ink type revealed", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [colorsOfTheWind],
        inkwell: colorsOfTheWind.cost,
        deck: [heiheiBoatSnack, mickeyMouseTrueFriend, dragonFire],
      },
      {
        deck: [simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().playCard(colorsOfTheWind)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(2);
  });

  it("counts both ink types on a dual-ink revealed card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [colorsOfTheWind],
        inkwell: colorsOfTheWind.cost,
        deck: [heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub, jasmineSteadyStrategist],
      },
      {
        deck: [dragonFire],
      },
    );

    expect(testEngine.asPlayerOne().playCard(colorsOfTheWind)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(3);
  });
});
