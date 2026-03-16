import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraMenacingSailor: CharacterCard = {
  id: "rbY",
  canonicalId: "ci_rbY",
  reprints: ["set3-111"],
  cardType: "character",
  name: "Kakamora",
  version: "Menacing Sailor",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Menacing Sailor",
      text: [
        {
          title: "PLUNDER",
          description: "When you play this character, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Kokomora",
      version: "Bedrohlicher Seefahrer",
      text: [
        {
          title: "PLÜNDERN",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Kakamora",
      version: "Marin menaçant",
      text: [
        {
          title: "PILLAGE",
          description: "Lorsque vous jouez ce personnage, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Kakamora",
      version: "Marinaio Minaccioso",
      text: [
        {
          title: "RAZZIA",
          description: "Quando giochi questo personaggio, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 111,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_d119988be09743af8639f30e658caa8c",
    tcgPlayer: 538365,
  },
  text: [
    {
      title: "PLUNDER",
      description: "When you play this character, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Pirate"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "1xv-1",
      name: "PLUNDER",
      text: "PLUNDER When you play this character, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
