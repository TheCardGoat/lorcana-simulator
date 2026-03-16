import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomIlluminaryKeeper: CharacterCard = {
  id: "9H2",
  canonicalId: "ci_9H2",
  reprints: ["set4-048"],
  cardType: "character",
  name: "Magic Broom",
  version: "Illuminary Keeper",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Illuminary Keeper",
      text: [
        {
          title: "NICE AND TIDY",
          description:
            "Whenever you play another character, you may banish this character to draw a card.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Hüter des Illuminarium",
      text: [
        {
          title: "SCHÖN UND ORDENTLICH",
          description:
            "Jedes Mal, wenn du einen anderen Charakter ausspielst, darfst du diesen Charakter verbannen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Balais Magiques",
      version: "Gardien de l'Illuminarium",
      text: [
        {
          title: "PROPRE ET RANGÉ",
          description:
            "Chaque fois que vous jouez un autre personnage, vous pouvez bannir ce personnage-ci pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Custode dell'Illuminarium",
      text: [
        {
          title: "BELLO ORDINATO",
          description:
            "Ogni volta che giochi un altro personaggio, puoi esiliare questo personaggio per pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "004",
  cardNumber: 48,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_65f55cf2eedd49668ac8946ebd4d2105",
    tcgPlayer: 549715,
  },
  text: [
    {
      title: "NICE AND TIDY",
      description:
        "Whenever you play another character, you may banish this character to draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "1ct-1",
      name: "NICE AND TIDY",
      text: "NICE AND TIDY Whenever you play another character, you may banish this character to draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
