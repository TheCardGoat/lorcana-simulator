import type { CharacterCard } from "@tcg/lorcana-types";
import { theQueenDivinerEnchantedI18n } from "./218-the-queen-diviner-enchanted.i18n";

export const theQueenDivinerEnchanted: CharacterCard = {
  id: "M6r",
  canonicalId: "ci_eXi",
  reprints: ["set4-156"],
  cardType: "character",
  name: "The Queen",
  version: "Diviner",
  inkType: ["sapphire"],
  franchise: "Snow White",
  set: "004",
  cardNumber: 218,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_20f6a0577b714cf393648a074b1f0bb2",
    tcgPlayer: 550540,
  },
  text: [
    {
      title: "CONSULT THE SPELLBOOK",
      description:
        "{E} — Look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. If that item costs 3 or less, you may play it for free instead and it enters play exerted. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "that item costs 3 or less",
          type: "if",
        },
        then: {
          restriction: "enters-play-exerted",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "aeu-1",
      text: "CONSULT THE SPELLBOOK {E} — Look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. If that item costs 3 or less, you may play it for free instead and it enters play exerted. Put the rest on the bottom of your deck in any order.",
      type: "activated",
    },
  ],
  i18n: theQueenDivinerEnchantedI18n,
};
