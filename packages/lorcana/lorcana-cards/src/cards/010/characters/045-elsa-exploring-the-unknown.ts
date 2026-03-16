import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaExploringTheUnknown: CharacterCard = {
  id: "g4t",
  canonicalId: "ci_yaH",
  reprints: ["set10-045"],
  cardType: "character",
  name: "Elsa",
  version: "Exploring the Unknown",
  i18n: {
    en: {
      name: "Elsa",
      version: "Exploring the Unknown",
      text: [
        {
          title: "CLOSER LOOK",
          description: "When you play this character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Erforscht das Unbekannte",
      text: [
        {
          title: "GENAUERER BLICK",
          description: "Wenn du diesen Charakter ausspielst, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Elsa",
      version: "Explorant un autre monde",
      text: [
        {
          title: "REGARDE DE PLUS PRÈS",
          description: "Lorsque vous jouez ce personnage, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Che Esplora l'Ignoto",
      text: [
        {
          title: "ESAMINARE PIÙ DA VICINO",
          description: "Quando giochi questo personaggio, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 45,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_04d59c2ff0e648eb9dad622fa82ce49b",
    tcgPlayer: 660188,
  },
  text: [
    {
      title: "CLOSER LOOK",
      description: "When you play this character, you may draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "744-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "CLOSER LOOK",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CLOSER LOOK When you play this character, you may draw a card.",
    },
  ],
};
