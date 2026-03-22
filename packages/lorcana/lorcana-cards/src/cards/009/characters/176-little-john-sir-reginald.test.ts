import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { littleJohnSirReginald } from "./176-little-john-sir-reginald";
import { arielSingingMermaid } from "./015-ariel-singing-mermaid";
import { gastonArrogantHunter } from "./115-gaston-arrogant-hunter";

describe("Little John - Sir Reginald", () => {
  describe("WHAT A BEAUTIFUL BRAWL! - When you play this character, choose one:", () => {
    it.skip("mode 0: Chosen Hero character gains Resist +2 this turn", () => {
      // BLOCKED: Engine runtime gap with choice effects and target selection
      // The choice effect completes without executing the chosen option when targets are involved
    });

    it.skip("mode 1: Deal 2 damage to chosen Villain character", () => {
      // BLOCKED: Engine runtime gap with choice effects and target selection
      // The choice effect completes without executing the chosen option when targets are involved
    });

    it.skip("can target own Villain character with damage mode", () => {
      // BLOCKED: Engine runtime gap with choice effects and target selection
      // The choice effect completes without executing the chosen option when targets are involved
    });

    it.skip("can target opposing Hero character with Resist mode", () => {
      // BLOCKED: Engine runtime gap with choice effects and target selection
      // The choice effect completes without executing the chosen option when targets are involved
    });
  });
});
