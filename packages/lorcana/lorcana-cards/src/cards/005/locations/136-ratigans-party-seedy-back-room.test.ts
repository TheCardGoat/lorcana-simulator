import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { ratigansPartySeedyBackRoom } from "./136-ratigans-party-seedy-back-room";

const damagedResident = createMockCharacter({
  id: "ratigan-damaged-resident",
  name: "Damaged Resident",
  cost: 2,
});

describe("Ratigan's Party - Seedy Back Room", () => {
  it("gets +2 lore while you have a damaged character here", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        ratigansPartySeedyBackRoom,
        { card: damagedResident, atLocation: ratigansPartySeedyBackRoom, damage: 1 },
      ],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().getCard(ratigansPartySeedyBackRoom)?.lore).toBe(
      ratigansPartySeedyBackRoom.lore + 2,
    );
  });
});
