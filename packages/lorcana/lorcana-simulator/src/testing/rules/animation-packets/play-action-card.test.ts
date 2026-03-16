import { describe, it, expect } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  developYourBrain,
  mickeyMouseTrueFriend,
  minnieMouseAlwaysClassy,
} from "@tcg/lorcana-cards/cards/001";

describe("Play Action Card Animation", () => {
  it("emits the current packet payload through the real client transport path", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [developYourBrain],
      inkwell: developYourBrain.cost,
      deck: [minnieMouseAlwaysClassy, mickeyMouseTrueFriend],
    });

    const card = testEngine.asServer().getCard(developYourBrain);
    testEngine.asLorcanaPlayerOne().playCard(developYourBrain);
    const packet = testEngine.asLorcanaPlayerOne().getLastPacketUpdate();
    const animation = packet?.animations?.at(0);
    console.log(animation);
    expect(animation?.kind).toEqual("play.action");
    expect(animation?.payload).toEqual(
      expect.objectContaining({
        cardId: card.definitionId,
        player: card.ownerId,
      }),
    );
  });
});
