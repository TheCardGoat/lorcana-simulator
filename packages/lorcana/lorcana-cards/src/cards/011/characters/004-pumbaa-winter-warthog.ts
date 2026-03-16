import type { CharacterCard } from "@tcg/lorcana-types";

export const pumbaaWinterWarthog: CharacterCard = {
  id: "GCL",
  canonicalId: "ci_GCL",
  reprints: ["set11-004"],
  cardType: "character",
  name: "Pumbaa",
  version: "Winter Warthog",
  i18n: {
    en: {
      name: "Pumbaa",
      version: "Winter Warthog",
      text: [
        {
          title: "SHAKE THINGS UP",
          description: "When you play this character, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Pumbaa",
      version: "Winter-Warzenschwein",
      text: [
        {
          title: "DIE DINGE AUFRÜTTELN",
          description:
            "Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Pumbaa",
      version: "Phacochère hivernal",
      text: [
        {
          title: "SECOUEZ LES CHOSES",
          description: "Lorsque vous jouez ce personnage, chaque adversaire défausse une carte.",
        },
      ],
    },
    it: {
      name: "Pumbaa",
      version: "Facocero Invernale",
      text: [
        {
          title: "DARE UNA SCOSSA",
          description:
            "Quando giochi questo personaggio, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "011",
  cardNumber: 4,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3538927a26154cb78ef3e9cfd6899035",
    tcgPlayer: 674820,
  },
  text: [
    {
      title: "SHAKE THINGS UP",
      description: "When you play this character, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "3an-1",
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      name: "SHAKE THINGS UP",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SHAKE THINGS UP When you play this character, each opponent chooses and discards a card.",
    },
  ],
};
