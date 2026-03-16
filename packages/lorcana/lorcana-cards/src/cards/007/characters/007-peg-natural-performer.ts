import type { CharacterCard } from "@tcg/lorcana-types";

export const pegNaturalPerformer: CharacterCard = {
  id: "HEg",
  canonicalId: "ci_HEg",
  reprints: ["set7-007"],
  cardType: "character",
  name: "Peg",
  version: "Natural Performer",
  i18n: {
    en: {
      name: "Peg",
      version: "Natural Performer",
      text: [
        {
          title: "CAPTIVE AUDIENCE",
          description: "{E} — If you have 3 or more other characters in play, draw a card.",
        },
      ],
    },
    de: {
      name: "Peggy",
      version: "Naturtalent im Auftreten",
      text: [
        {
          title: "DAS PUBLIKUM IM BANN",
          description: "— Wenn du mindestens 3 weitere Charaktere im Spiel hast, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Peg",
      version: "Née pour la scène",
      text: [
        {
          title: "AUDITOIRE",
          description:
            "CAPTIVÉ — Si vous avez au moins 3 autres personnages en jeu, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Gilda",
      version: "Intrattenitrice Nata",
      text: [
        {
          title: "PUBBLICO RAPITO",
          description: "— Se hai in gioco 3 o più altri personaggi, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 7,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7085d6eb08764015945d684bc74bceb5",
    tcgPlayer: 619410,
  },
  text: [
    {
      title: "CAPTIVE AUDIENCE",
      description: "{E} — If you have 3 or more other characters in play, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "wsf-1",
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "you have 3 or more other characters in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      type: "activated",
      text: "CAPTIVE AUDIENCE {E} — If you have 3 or more other characters in play, draw a card.",
    },
  ],
};
