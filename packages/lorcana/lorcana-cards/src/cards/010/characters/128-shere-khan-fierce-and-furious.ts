import type { CharacterCard } from "@tcg/lorcana-types";

export const shereKhanFierceAndFurious: CharacterCard = {
  id: "vOh",
  canonicalId: "ci_vOh",
  reprints: ["set10-128"],
  cardType: "character",
  name: "Shere Khan",
  version: "Fierce and Furious",
  i18n: {
    en: {
      name: "Shere Khan",
      version: "Fierce and Furious",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "WILD RAGE 1",
          description:
            "{I}, Deal 1 damage to this character — Ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Shir Khan",
      version: "Wild und Wütend",
      text: "Gestaltwandel 5 WILDER ZORN 1, Füge diesem Charakter 1 Schaden zu — Mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Shere Khan",
      version: "Furieusement féroce",
      text: "Alter 5 RAGE SAUVAGE 1, Infligez 1 dommage à ce personnage — Redressez ce personnage. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Shere Khan",
      version: "Feroce e Furioso",
      text: "Trasformazione 5 COLLERA SELVAGGIA 1, infliggi 1 danno a questo personaggio — Prepara questo personaggio. Non può andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 128,
  rarity: "rare",
  cost: 8,
  strength: 8,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_024a30a70f624c58bc3219532ffdd37c",
    tcgPlayer: 659419,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "WILD RAGE 1",
      description:
        "{I}, Deal 1 damage to this character — Ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1uf-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        steps: [
          {
            amount: 1,
            target: {
              selector: "self",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1uf-2",
      text: "WILD RAGE 1 {I}, Deal 1 damage to this character — Ready this character. He can't quest for the rest of this turn.",
      type: "activated",
    },
  ],
};
