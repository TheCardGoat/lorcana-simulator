import type { CharacterCard } from "@tcg/lorcana-types";

export const mirabelMadrigalCuriousChild: CharacterCard = {
  id: "hyF",
  canonicalId: "ci_hyF",
  reprints: ["set8-010"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Curious Child",
  i18n: {
    en: {
      name: "Mirabel Madrigal",
      version: "Curious Child",
      text: [
        {
          title: "YOU ARE A WONDER",
          description:
            "When you play this character, you may reveal a song card in your hand to gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Mirabel Madrigal",
      version: "Neugieriges Kind",
      text: [
        {
          title: "DU BIST EIN WUNDER",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Liedkarte aus deiner Hand vorzeigen, um 1 Legende zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Mirabel Madrigal",
      version: "Enfant curieuse",
      text: [
        {
          title: "TU ES UNE PETITE MERVEILLE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez révéler une carte Chanson de votre main pour gagner 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Mirabel Madrigal",
      version: "Bambina Curiosa",
      text: [
        {
          title: "TU SEI UN GIOIELLINO",
          description:
            "Quando giochi questo personaggio, puoi rivelare una carta canzone nella tua mano per ottenere 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 10,
  rarity: "common",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c58b2d33655f4541baec11fcf639b1c5",
    tcgPlayer: 631354,
  },
  text: [
    {
      title: "YOU ARE A WONDER",
      description:
        "When you play this character, you may reveal a song card in your hand to gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "191-1",
      name: "YOU ARE A WONDER",
      text: "YOU ARE A WONDER When you play this character, you may reveal a song card in your hand to gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
