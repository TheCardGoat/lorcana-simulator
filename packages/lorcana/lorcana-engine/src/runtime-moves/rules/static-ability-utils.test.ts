import { describe, expect, it } from "bun:test";
import type { CardInstanceId, PlayerId } from "#core";
import { LorcanaMultiplayerTestEngine } from "../../testing";
import { createMockCharacter } from "../../testing";
import { matchesStaticAbilityTarget } from "./static-ability-utils";

describe("static ability utils", () => {
  it("keeps SELF-targeted static effects on the source character", () => {
    const selfBuffSource = createMockCharacter({
      id: "self-buff-source",
      name: "Self Buff Source",
      cost: 3,
      abilities: [
        {
          id: "self-buff-source-1",
          type: "static",
          text: "This character gets +1 strength.",
          effect: {
            type: "modify-stat",
            stat: "strength",
            modifier: 1,
            target: "SELF",
          },
        },
      ],
    });
    const otherCharacter = createMockCharacter({
      id: "other-character",
      name: "Other Character",
      cost: 2,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [otherCharacter],
      },
      {
        play: [selfBuffSource],
      },
    );

    const state = testEngine.getAuthoritativeState();
    const otherCharacterId = testEngine.asServer().getCard(otherCharacter).id as CardInstanceId;
    const selfBuffSourceId = testEngine.asServer().getCard(selfBuffSource).id as CardInstanceId;
    const definitions = new Map<CardInstanceId, typeof selfBuffSource | typeof otherCharacter>([
      [otherCharacterId, otherCharacter],
      [selfBuffSourceId, selfBuffSource],
    ]);
    const playerTwo = "player_two" as PlayerId;

    expect(
      matchesStaticAbilityTarget({
        state,
        target: "SELF",
        sourceId: selfBuffSourceId,
        targetCardId: selfBuffSourceId,
        controllerId: playerTwo,
        getDefinitionByInstanceId: (cardId) => definitions.get(cardId),
      }),
    ).toBe(true);

    expect(
      matchesStaticAbilityTarget({
        state,
        target: "SELF",
        sourceId: selfBuffSourceId,
        targetCardId: otherCharacterId,
        controllerId: playerTwo,
        getDefinitionByInstanceId: (cardId) => definitions.get(cardId),
      }),
    ).toBe(false);
  });

  it("resolves hand-active self cost reductions that count characters in play", () => {
    const partyGuestOne = createMockCharacter({
      id: "static-utils-party-guest-one",
      name: "Party Guest One",
      cost: 1,
    });
    const partyGuestTwo = createMockCharacter({
      id: "static-utils-party-guest-two",
      name: "Party Guest Two",
      cost: 1,
    });
    const selfReducer = createMockCharacter({
      id: "static-utils-self-reducer",
      name: "Self Reducer",
      cost: 7,
      abilities: [
        {
          id: "static-utils-self-reducer-1",
          type: "static",
          text: "For each character you have in play, you pay 1 ink less to play this character.",
          sourceZones: ["hand"],
          effect: {
            type: "cost-reduction",
            amount: {
              type: "characters-in-play",
              controller: "you",
            },
            cardType: "character",
          },
        },
      ],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [selfReducer],
      play: [partyGuestOne, partyGuestTwo],
      inkwell: 5,
    });

    expect(testEngine.asPlayerOne().getCard(selfReducer).playCost).toBe(5);
    expect(testEngine.asPlayerOne().playCard(selfReducer)).toBeSuccessfulCommand();
  });
});
