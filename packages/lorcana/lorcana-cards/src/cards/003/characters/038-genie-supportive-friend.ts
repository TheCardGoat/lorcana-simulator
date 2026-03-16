import type { CharacterCard } from "@tcg/lorcana-types";

export const genieSupportiveFriend: CharacterCard = {
  id: "0Ac",
  canonicalId: "ci_pLA",
  reprints: ["set3-038", "set9-054"],
  cardType: "character",
  name: "Genie",
  version: "Supportive Friend",
  i18n: {
    en: {
      name: "Genie",
      version: "Supportive Friend",
      text: [
        {
          title: "THREE WISHES",
          description:
            "Whenever this character quests, you may shuffle this card into your deck to draw 3 cards.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Hilfsbereiter Freund",
      text: [
        {
          title: "DREI WÜNSCHE",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du diese Karte in dein Deck mischen, um 3 Karten zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Génie",
      version: "Ami encourageant",
      text: [
        {
          title: "TROIS VŒUX",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez le remélanger dans votre pioche, puis piocher 3 cartes.",
        },
      ],
    },
    it: {
      name: "Genio",
      version: "Amico Solidale",
      text: [
        {
          title: "TRE DESIDERI",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi rimescolare questa carta nel mazzo per pescare 3 carte.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 38,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_777ef1df73214a63a89bce29396afefa",
    tcgPlayer: 649998,
  },
  text: [
    {
      title: "THREE WISHES",
      description:
        "Whenever this character quests, you may shuffle this card into your deck to draw 3 cards.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          intoDeck: "owner",
          target: "SELF",
          type: "shuffle-into-deck",
        },
        type: "optional",
      },
      id: "146-1",
      name: "THREE WISHES",
      text: "THREE WISHES Whenever this character quests, you may shuffle this card into your deck to draw 3 cards.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
