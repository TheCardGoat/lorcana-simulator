import type { CharacterCard } from "@tcg/lorcana-types";

export const archimedesExceptionalOwl: CharacterCard = {
  id: "8Al",
  canonicalId: "ci_8Al",
  reprints: ["set7-076"],
  cardType: "character",
  name: "Archimedes",
  version: "Exceptional Owl",
  i18n: {
    en: {
      name: "Archimedes",
      version: "Exceptional Owl",
      text: [
        {
          title: "MORE TO LEARN",
          description:
            "Whenever an opponent chooses this character for an action or ability, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Archimedes",
      version: "Außergewöhnliche Eule",
      text: [
        {
          title: "MEHR ZU LERNEN",
          description:
            "Jedes Mal, wenn dieser Charakter von einer Aktion oder Fähigkeit einer gegnerischen Person ausgewählt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Archimède",
      version: "Hibou exceptionnel",
      text: [
        {
          title: "TANT À APPRENDRE",
          description:
            "Chaque fois qu'un adversaire choisit ce personnage avec une action ou une capacité, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Anacleto",
      version: "Gufo Eccezionale",
      text: [
        {
          title: "TANTO DA IMPARARE",
          description:
            "Ogni volta che un avversario sceglie questo personaggio per un'azione o un'abilità, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "007",
  cardNumber: 76,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_35cac934c7154962803cd87c1d34e32a",
    tcgPlayer: 618700,
  },
  text: [
    {
      title: "MORE TO LEARN",
      description:
        "Whenever an opponent chooses this character for an action or ability, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "crp-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "MORE TO LEARN",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "MORE TO LEARN Whenever an opponent chooses this character for an action or ability, you may draw a card.",
    },
  ],
};
