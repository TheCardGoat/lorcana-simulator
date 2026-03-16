import type { ActionCard } from "@tcg/lorcana-types";

export const partOfYourWorld: ActionCard = {
  id: "Vba",
  canonicalId: "ci_Vba",
  reprints: ["set1-030"],
  cardType: "action",
  name: "Part of Your World",
  i18n: {
    en: {
      name: "Part of Your World",
      text: "Return a character card from your discard to your hand.",
    },
    de: {
      name: "In Deiner Welt",
      text: "Nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "PARTIR LÀ-BAS",
      text: "Reprenez en main une carte personnage de votre défausse.",
    },
    it: {
      name: "Vivere Là",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Riprendi in mano una carta personaggio dai tuoi scarti.",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 30,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_df53bbf046f542d19202f4e11bbe9d5b",
    tcgPlayer: 493481,
  },
  text: "Return a character card from your discard to your hand.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        cardType: "character",
        target: "CONTROLLER",
        type: "return-from-discard",
        destination: "hand",
      },
    },
  ],
};
