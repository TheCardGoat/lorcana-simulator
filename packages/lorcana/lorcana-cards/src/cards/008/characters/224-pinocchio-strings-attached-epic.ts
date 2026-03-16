import type { CharacterCard } from "@tcg/lorcana-types";

export const pinocchioStringsAttachedEpic: CharacterCard = {
  id: "QOp",
  canonicalId: "ci_828",
  reprints: ["set8-061"],
  cardType: "character",
  name: "Pinocchio",
  version: "Strings Attached",
  i18n: {
    en: {
      name: "Pinocchio",
      version: "Strings Attached",
      text: "Evasive GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
    },
    de: {
      name: "Pinocchio",
      version: "An Fäden geknüpft",
      text: "Wendig ICH MUSS GANZ LEISE SEIN Einmal während deines Zuges, wenn du diesen Charakter bereit machst, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Pinocchio",
      version: "Avec des liens",
      text: "Insaisissable NE FAISONS PAS UN BRUIT Une fois durant votre tour, lorsque vous redressez ce personnage, vous pouvez piocher une carte.",
    },
    it: {
      name: "Pinocchio",
      version: "Strings Attached",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 224,
  rarity: "legendary",
  specialRarity: "epic",
  cost: 4,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a0a931cb7b6248b3a56080e7f39b7e2b",
    tcgPlayer: 631340,
  },
  text: "Evasive GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1m2-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "1m2-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "GOT TO KEEP REAL QUIET Once",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
    },
  ],
};
