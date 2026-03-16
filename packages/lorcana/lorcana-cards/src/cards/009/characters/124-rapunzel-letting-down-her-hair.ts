import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelLettingDownHerHair: CharacterCard = {
  id: "1J0",
  canonicalId: "ci_Su6",
  reprints: ["set1-121", "set9-124"],
  cardType: "character",
  name: "Rapunzel",
  version: "Letting Down Her Hair",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Letting Down Her Hair",
      text: [
        {
          title: "TANGLE",
          description: "When you play this character, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Lässt ihr Haar herunter",
      text: [
        {
          title: "EINWICKELN",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "RAIPONCE",
      version: "Lançant sa chevelure",
      text: [
        {
          title: "ENCHEVÊTRÉ",
          description: "Lorsque vous jouez ce personnage, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Rapunzel",
      version: "Letting Down Her Hair",
      text: [
        {
          title: "TANGLE",
          description: "When you play this character, each opponent loses 1 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "009",
  cardNumber: 124,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_cdba0ed02d3a4361afb0aaa7689ee1de",
    tcgPlayer: 650059,
  },
  text: [
    {
      title: "TANGLE",
      description: "When you play this character, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "w6r-1",
      name: "TANGLE",
      text: "TANGLE When you play this character, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
