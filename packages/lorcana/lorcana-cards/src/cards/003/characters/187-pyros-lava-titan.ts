import type { CharacterCard } from "@tcg/lorcana-types";

export const pyrosLavaTitan: CharacterCard = {
  id: "jKP",
  canonicalId: "ci_jKP",
  reprints: ["set3-187"],
  cardType: "character",
  name: "Pyros",
  version: "Lava Titan",
  i18n: {
    en: {
      name: "Pyros",
      version: "Lava Titan",
      text: [
        {
          title: "ERUPTION",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may ready chosen character.",
        },
      ],
    },
    de: {
      name: "Vulkanos",
      version: "Lava Titan",
      text: [
        {
          title: "ERUPTION",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einen Charakter deiner Wahl bereit machen.",
        },
      ],
    },
    fr: {
      name: "Pyros",
      version: "Titan de lave",
      text: [
        {
          title: "ÉRUPTION",
          description:
            "Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, vous pouvez choisir et redresser un personnage.",
        },
      ],
    },
    it: {
      name: "Pyros",
      version: "Titano di Lava",
      text: [
        {
          title: "ERUZIONE",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi preparare un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 187,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f68e5422b47243a1b385c562531498f4",
    tcgPlayer: 539113,
  },
  text: [
    {
      title: "ERUPTION",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may ready chosen character.",
    },
  ],
  classifications: ["Storyborn", "Titan"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "13y-1",
      name: "ERUPTION",
      text: "ERUPTION During your turn, whenever this character banishes another character in a challenge, you may ready chosen character.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
