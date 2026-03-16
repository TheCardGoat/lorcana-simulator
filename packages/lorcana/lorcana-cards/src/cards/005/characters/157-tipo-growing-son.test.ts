import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { tipoGrowingSon } from "./157-tipo-growing-son";

const practicedDetective = createMockCharacter({
  id: "tipo-practiced-detective",
  name: "Practiced Detective",
  cost: 1,
});

describe("Tipo - Growing Son", () => {
  it("may put a card from your hand into your inkwell facedown and exerted when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [tipoGrowingSon, practicedDetective],
      inkwell: tipoGrowingSon.cost,
      deck: 1,
    });
    const detectiveId = testEngine.findCardInstanceId(practicedDetective, "hand", "p1");

    expect(testEngine.asPlayerOne().playCard(tipoGrowingSon)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [detectiveId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        hand: 0,
        inkwell: tipoGrowingSon.cost + 1,
      }),
    );
    expect(testEngine.asPlayerOne().getCardZone(detectiveId)).toBe("inkwell");
    expect(testEngine.asServer().getCard(detectiveId)).toEqual(
      expect.objectContaining({ exerted: true, zone: "inkwell" }),
    );
    expect(
      testEngine.getAuthoritativeState().ctx.zones.private.cardMeta[detectiveId]?.publicFaceState,
    ).toBe("faceDown");
  });
});
