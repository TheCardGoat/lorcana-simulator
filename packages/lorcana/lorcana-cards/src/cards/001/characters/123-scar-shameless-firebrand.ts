import type { CharacterCard } from "@tcg/lorcana-types";
import { scarShamelessFirebrandI18n } from "./123-scar-shameless-firebrand.i18n";

export const scarShamelessFirebrand: CharacterCard = {
  id: "pVG",
  canonicalId: "ci_pVG",
  reprints: ["set1-123"],
  cardType: "character",
  name: "Scar",
  version: "Shameless Firebrand",
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 123,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5ad957ef62844bcaba344b0af0a5ff24",
    tcgPlayer: 507467,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "ROUSING SPEECH",
      description:
        "When you play this character, ready your characters with cost 3 or less. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Floodborn", "Villain", "King"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "mm7-1",
      text: "**Shift** 6 _(You may pay 6 {I} to play this on top of one of your characters named Scar.)_\n**ROUSING SPEECH** When you play this character, ready your characters with cost 3 or less. They can",
      type: "action",
    },
  ],
  i18n: scarShamelessFirebrandI18n,
};
