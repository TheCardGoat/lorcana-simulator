import type { CharacterCard } from "@tcg/lorcana-types";

export const drFacilierAgentProvocateur: CharacterCard = {
  id: "Af3",
  canonicalId: "ci_Af3",
  reprints: ["set1-037"],
  cardType: "character",
  name: "Dr. Facilier",
  version: "Agent Provocateur",
  i18n: {
    en: {
      name: "Dr. Facilier",
      version: "Agent Provocateur",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 {I} to play this on top of one of your characters named Dr. Facilier.)",
        },
        {
          title: "INTO THE SHADOWS",
          description:
            "Whenever one of your other characters is banished in a challenge, you may return that card to your hand.",
        },
      ],
    },
    de: {
      name: "Dr. Facilier",
      version: "Agent Provocateur",
      text: [
        {
          title: "Gestaltwandel 5",
          description:
            "(Du kannst 5 zahlen, um diesen Charakter auf einen deiner Dr.-Facilier-Charaktere auszuspielen.)IM SCHATTENREICH Jedes Mal, wenn einer deiner anderen Charaktere durch eine Herausforderung verbannt wird, darfst du jene Karte zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "DR. FACILIER",
      version: "Agent provocateur",
      text: [
        {
          title: "Alter 5",
          description:
            '(Vous pouvez payer 5 pour jouer ce personnage sur l\'un de vos personnages Dr. Facilier.) VERS LES OMBRES Vos autres personnages gagnent: "Lorsque ce personnage est banni via un défi, vous pouvez le reprendre en main."',
        },
      ],
    },
    it: {
      name: "Dr. Facilier",
      version: "Agent Provocateur",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Dr. Facilier.) INTO THE SHADOWS Whenever one of your other characters is banished in a challenge, you may return that card to your hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "001",
  cardNumber: 37,
  rarity: "rare",
  cost: 7,
  strength: 4,
  willpower: 5,
  lore: 3,
  inkable: false,
  missingImplementation: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a23c8618b0aa41f9b41b9f0603495380",
    tcgPlayer: 508723,
  },
  text: [
    {
      title: "Shift 5",
      description:
        "(You may pay 5 {I} to play this on top of one of your characters named Dr. Facilier.)",
    },
    {
      title: "INTO THE SHADOWS",
      description:
        "Whenever one of your other characters is banished in a challenge, you may return that card to your hand.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
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
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "c3l-1",
      text: "**SLEIGHT OF HAND** When you play this character, you may return target character to their player's hand.",
      type: "action",
    },
  ],
};
