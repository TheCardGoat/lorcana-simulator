import type { CharacterCard } from "@tcg/lorcana-types";

export const fixitFelixJrDelightedSightseer: CharacterCard = {
  id: "3wx",
  canonicalId: "ci_3wx",
  reprints: ["set5-017"],
  cardType: "character",
  name: "Fix-It Felix, Jr.",
  version: "Delighted Sightseer",
  i18n: {
    en: {
      name: "Fix-It Felix, Jr.",
      version: "Delighted Sightseer",
      text: [
        {
          title: "OH, MY LAND!",
          description: "When you play this character, if you have a location in play, draw a card.",
        },
      ],
    },
    de: {
      name: "Fix-It Felix, Jr.",
      version: "Entzückter Ausflügler",
      text: [
        {
          title: "ACH DU MEINE GÜTE!",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Ort im Spiel hast, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Félix Fixe Junior",
      version: "Promeneur ravi",
      text: [
        {
          title: "NOM D'UN PETIT BONUS!",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un lieu en jeu, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Felix Aggiustatutto Jr.",
      version: "Turista Deliziato",
      text: [
        {
          title: "PER TUTTE LE LAND!",
          description:
            "Quando giochi questo personaggio, se hai in gioco un luogo, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 17,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3a3a926925af4b4ca1cd8567c7a300ae",
    tcgPlayer: 559778,
  },
  text: [
    {
      title: "OH, MY LAND!",
      description: "When you play this character, if you have a location in play, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "108-1",
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "location",
            filters: [],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      type: "action",
      text: "OH, MY LAND! When you play this character, if you have a location in play, draw a card.",
    },
  ],
};
