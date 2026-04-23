import { describe, expect, it } from "bun:test";
import { createMockCharacter, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { rcRemotecontrolledCar } from "./077-rc-remote-controlled-car";

const defender = createMockCharacter({
  id: "rc-test-defender",
  name: "Test Defender",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
});

describe("RC - Remote-Controlled Car", () => {
  describe("LOW BATTERIES - This character can't quest or challenge unless you pay 1 {I}. (You pay this cost each time.)", () => {
    it("cannot quest while the static restriction applies", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: rcRemotecontrolledCar }],
      });

      expect(testEngine.asPlayerOne().quest(rcRemotecontrolledCar).success).toBe(false);
    });

    it("cannot challenge while the static restriction applies", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: rcRemotecontrolledCar }],
        },
        {
          play: [{ card: defender, exerted: true }],
        },
      );

      expect(testEngine.asPlayerOne().challenge(rcRemotecontrolledCar, defender).success).toBe(
        false,
      );
    });
  });
});
