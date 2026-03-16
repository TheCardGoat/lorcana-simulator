import type { CharacterCard } from "@tcg/lorcana-types";

export const christopherRobinAdventurer: CharacterCard = {
  id: "2fz",
  canonicalId: "ci_2fz",
  reprints: ["set2-002"],
  cardType: "character",
  name: "Christopher Robin",
  version: "Adventurer",
  i18n: {
    en: {
      name: "Christopher Robin",
      version: "Adventurer",
      text: [
        {
          title: "WE'LL ALWAYS BE TOGETHER",
          description:
            "Whenever you ready this character, if you have 2 or more other characters in play, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Christopher Robin",
      version: "Abenteurer",
      text: [
        {
          title: "WIR WERDEN IMMER ZUSAMMEN SEIN",
          description:
            "Jedes Mal, wenn du diesen Charakter bereit machst und mindestens 2 weitere Charaktere im Spiel hast, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Jean-Christophe",
      version: "Aventurier",
      text: [
        {
          title: "NOUS SERONS TOUJOURS ENSEMBLE",
          description:
            "Si vous avez au moins 2 autres personnages en jeu lorsque vous redressez ce personnage, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Christopher Robin",
      version: "Avventuriero",
      text: [
        {
          title: "SAREMO SEMPRE INSIEME",
          description:
            "Ogni volta che prepari questo personaggio, se hai in gioco 2 o più altri personaggi, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "002",
  cardNumber: 2,
  rarity: "rare",
  cost: 6,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4730c91483f24305b42abe86b2bb34ee",
    tcgPlayer: 526351,
  },
  text: [
    {
      title: "WE'LL ALWAYS BE TOGETHER",
      description:
        "Whenever you ready this character, if you have 2 or more other characters in play, gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            excludeSelf: true,
          },
          comparison: {
            operator: "gte",
            value: 2,
          },
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "2pm-1",
      name: "WE'LL ALWAYS BE TOGETHER",
      text: "WE'LL ALWAYS BE TOGETHER Whenever you ready this character, if you have 2 or more other characters in play, gain 2 lore.",
      trigger: {
        event: "ready",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
