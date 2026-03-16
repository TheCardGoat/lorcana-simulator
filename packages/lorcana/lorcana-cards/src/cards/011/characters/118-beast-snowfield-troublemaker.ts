import type { CharacterCard } from "@tcg/lorcana-types";

export const beastSnowfieldTroublemaker: CharacterCard = {
  id: "dg5",
  canonicalId: "ci_dg5",
  reprints: ["set11-118"],
  cardType: "character",
  name: "Beast",
  version: "Snowfield Troublemaker",
  i18n: {
    en: {
      name: "Beast",
      version: "Snowfield Troublemaker",
      text: [
        {
          title: "Rush",
        },
        {
          title: "DYNAMIC MANEUVER",
          description:
            "Whenever this character challenges, if he's at a location, he takes no damage from the challenge.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Schneefeld-Unruhestifter",
      text: "Rasant DYNAMISCHES MANÖVER Jedes Mal, wenn dieser Charakter herausfordert, falls er an einem Ort ist, erhält er keinen Schaden durch die Herausforderung.",
    },
    fr: {
      name: "La Bête",
      version: "Trublion du champ de neige",
      text: "Charge MANŒUVRE DYNAMIQUE Chaque fois que ce personnage défie, s'il est sur un lieu, il ne subit aucun dommage lors de ce défi.",
    },
    it: {
      name: "La Bestia",
      version: "Combinaguai del Campo Innevato",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) MANOVRA DINAMICA Ogni volta che questo personaggio sfida, se si trova in un luogo, non subisce danno dalla sfida.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 118,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cde01953c3aa414290991fddcffe4651",
    tcgPlayer: 673337,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "DYNAMIC MANEUVER",
      description:
        "Whenever this character challenges, if he's at a location, he takes no damage from the challenge.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [],
};
