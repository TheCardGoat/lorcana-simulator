import type { CharacterCard } from "@tcg/lorcana-types";

export const chernabogsFollowersCreaturesOfEvil: CharacterCard = {
  id: "gNW",
  canonicalId: "ci_gNW",
  reprints: ["set3-036"],
  cardType: "character",
  name: "Chernabog's Followers",
  version: "Creatures of Evil",
  i18n: {
    en: {
      name: "Chernabog's Followers",
      version: "Creatures of Evil",
      text: [
        {
          title: "RESTLESS SOULS",
          description: "Whenever this character quests, you may banish them to draw a card.",
        },
      ],
    },
    de: {
      name: "Chernabogs Anhänger",
      version: "Geschöpfe des Bösen",
      text: [
        {
          title: "RASTLOSE SEELEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du ihn verbannen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Adeptes de Chernabog",
      version: "Créatures du mal",
      text: [
        {
          title: "ÂMES SANS REPOS",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez le bannir pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Seguaci di Chernabog",
      version: "Creature del Male",
      text: [
        {
          title: "ANIME INQUIETE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi esiliarlo per pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 36,
  rarity: "uncommon",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bda38dbbd3974a5bb53bc91853faa172",
    tcgPlayer: 539067,
  },
  text: [
    {
      title: "RESTLESS SOULS",
      description: "Whenever this character quests, you may banish them to draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
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
            cardTypes: ["card"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "nd2-1",
      name: "RESTLESS SOULS",
      text: "RESTLESS SOULS Whenever this character quests, you may banish them to draw a card.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
