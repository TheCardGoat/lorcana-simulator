import { describe, expect, it } from "bun:test";
import type { LorcanaCardTarget } from "@tcg/lorcana-engine";

import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import { evaluateCardTargetMatches } from "./discard-target-dsl.js";

const baseCharacter = (overrides: Partial<LorcanaCardSnapshot>): LorcanaCardSnapshot => ({
  cardId: "c1",
  definitionId: "def-1",
  isMasked: false,
  label: "Test Character",
  ownerId: "player_two",
  ownerSide: "playerTwo",
  zoneId: "play",
  cardType: "character",
  facePresentation: "faceUp",
  ...overrides,
});

describe("evaluateCardTargetMatches — has-keyword (THE-969)", () => {
  const horsemanBanishTarget: LorcanaCardTarget = {
    selector: "chosen",
    count: 1,
    owner: "any",
    zones: ["play"],
    cardTypes: ["character"],
    filter: [{ type: "has-keyword", keyword: "Evasive" }],
  };

  it("matches Evasive when the keyword is only present via grantSources", () => {
    const card = baseCharacter({
      keywords: [],
      grantSources: [
        {
          sourceCardId: "src",
          sourceLabel: "Jetsam",
          grants: ["Evasive"],
        },
      ],
    });

    const { matchedCards } = evaluateCardTargetMatches([card], horsemanBanishTarget, {});
    expect(matchedCards.map((c) => c.cardId)).toEqual(["c1"]);
  });

  it("matches Evasive when keywords includes Evasive (printed or merged snapshot)", () => {
    const card = baseCharacter({ keywords: ["Evasive"] });
    const { matchedCards } = evaluateCardTargetMatches([card], horsemanBanishTarget, {});
    expect(matchedCards.map((c) => c.cardId)).toEqual(["c1"]);
  });
});
