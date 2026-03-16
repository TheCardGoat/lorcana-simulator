import type { ActionCard } from "@tcg/lorcana-types";

export const motherKnowsBest: ActionCard = {
  id: "2E9",
  canonicalId: "ci_12N",
  reprints: ["set1-095", "set9-099"],
  cardType: "action",
  name: "Mother Knows Best",
  i18n: {
    en: {
      name: "Mother Knows Best",
      text: "Return chosen character to their player's hand.",
    },
    de: {
      name: "Mutter weiß mehr",
      text: "Schicke einen Charakter deiner Wahl auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "N'ÉCOUTE QUE MOI",
      text: "(Vous pouvez une carte personnage coûtant 3 ou plus pour chanter cette chanson gratuitement.) Choisissez et renvoyez un personnage en jeu dans la main de son propriétaire.",
    },
    it: {
      name: "Mother Knows Best",
      text: "Return chosen character to their player's hand.",
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "009",
  cardNumber: 99,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_39a0e5d019794fcd9a96be1309addb7c",
    tcgPlayer: 650037,
  },
  text: "Return chosen character to their player's hand.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "return-to-hand",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
