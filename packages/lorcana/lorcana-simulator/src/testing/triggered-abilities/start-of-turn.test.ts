import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { theQueenConceitedRuler } from "@tcg/lorcana-cards/cards/009";

describe("FAIREST IN THE LAND - The Queen, Conceited Ruler - At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.", () => {
  // Test cases to cover:
  // 1. Triggers at the start of your turn (when opponent passes turn to you)
  // 2. Does NOT trigger at the start of opponent's turn (on: YOU)
  // 3. Trigger fires once per turn start, not repeatedly
  // 4. Does NOT trigger mid-turn from other effects
  // 5. Trigger is optional ("you may") — player can skip the cost/effect entirely
  // 6. Cost requirement (discard a Princess or Queen) is enforced
  // 7. If no Princess/Queen in hand, player cannot pay the cost (effect is skipped)
  // 8. Trigger fires even if this character is currently exerted

  it.todo("It should trigger at the start of your turn", () => {});
});
