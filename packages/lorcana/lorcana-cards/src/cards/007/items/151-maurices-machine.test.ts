import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { healingDecanter } from "../../005/items/030-healing-decanter";
import { sapphireChromicon } from "../../005/items/168-sapphire-chromicon";
import { mauricesMachine } from "./151-maurices-machine";

describe("Maurice's Machine", () => {
  it("may return an item with cost 2 or less from your discard when it is banished", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      discard: [healingDecanter],
      inkwell: 2,
      play: [mauricesMachine, sapphireChromicon],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(sapphireChromicon, {
        costs: {
          banishItems: [mauricesMachine],
        },
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(mauricesMachine)).toBe("discard");
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
        targets: [healingDecanter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(healingDecanter)).toBe("hand");
  });
});
