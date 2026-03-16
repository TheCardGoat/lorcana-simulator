import type { CharacterCard } from "@tcg/lorcana-types";

export const snowWhiteWellWisher: CharacterCard = {
  id: "iql",
  canonicalId: "ci_IGd",
  reprints: ["set2-025"],
  cardType: "character",
  name: "Snow White",
  version: "Well Wisher",
  i18n: {
    en: {
      name: "Snow White",
      version: "Well Wisher",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "WISHES COME TRUE",
          description:
            "Whenever this character quests, you may return a character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Schneewittchen",
      version: "Am Wunschbrunnen",
      text: "Gestaltwandel 4 EUER WUNSCH WIRD GEWÄHRT Jedes Mal, wenn dieser Charakter erkundet, darfst du eine Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Blanche-Neige",
      version: "Fait un vœu",
      text: "Alter 4 MES VŒUX SE RÉALISENT Lorsque ce personnage est envoyé à l'aventure, vous pouvez reprendre en main une carte personnage de votre défausse.",
    },
    it: {
      name: "Snow White",
      version: "Well Wisher",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Snow White.) WISHES COME TRUE Whenever this character quests, you may return a character card from your discard to your hand.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 25,
  rarity: "legendary",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_e97e4b9894fe4c9798b0d925092d3eea",
    tcgPlayer: 527799,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "WISHES COME TRUE",
      description:
        "Whenever this character quests, you may return a character card from your discard to your hand.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1fh-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "1fh-2",
      name: "WISHES COME TRUE",
      text: "WISHES COME TRUE Whenever this character quests, you may return a character card from your discard to your hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
