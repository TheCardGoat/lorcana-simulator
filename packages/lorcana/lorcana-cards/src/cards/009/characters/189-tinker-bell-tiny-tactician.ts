import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellTinyTactician: CharacterCard = {
  id: "LAR",
  canonicalId: "ci_Itn",
  reprints: ["set1-194", "set9-189"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Tiny Tactician",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Tiny Tactician",
      text: [
        {
          title: "BATTLE PLANS",
          description: "{E} — Draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Winzige Taktikerin",
      text: [
        {
          title: "SCHLACHTPLÄNE",
          description: "— Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "LA FÉE CLOCHETTE",
      version: "Mini tacticienne",
      text: [
        {
          title: "PLANS DE BATAILLE",
          description: "— Piochez une carte puis défaussez-en une.",
        },
      ],
    },
    it: {
      name: "Tinker Bell",
      version: "Tiny Tactician",
      text: [
        {
          title: "BATTLE PLANS",
          description: "— Draw a card, then choose and discard a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 189,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_24d837a8adab46e8ac2ffa7859489926",
    tcgPlayer: 650122,
  },
  text: [
    {
      title: "BATTLE PLANS",
      description: "{E} — Draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Fairy"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
      id: "n9y-1",
      text: "BATTLE PLANS {E} — Draw a card, then choose and discard a card.",
      type: "activated",
    },
  ],
};
