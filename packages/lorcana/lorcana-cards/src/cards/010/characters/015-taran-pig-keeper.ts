import type { CharacterCard } from "@tcg/lorcana-types";

export const taranPigKeeper: CharacterCard = {
  id: "JL3",
  canonicalId: "ci_JL3",
  reprints: ["set10-015"],
  cardType: "character",
  name: "Taran",
  version: "Pig Keeper",
  i18n: {
    en: {
      name: "Taran",
      version: "Pig Keeper",
      text: [
        {
          title: "Support",
        },
        {
          title: "FOLLOW THE PIG",
          description:
            "Whenever this character quests, you may return a character card named Hen Wen from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Taran",
      version: "Schweinehirt",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) FOLGE DEM SCHWEIN Jedes Mal, wenn dieser Charakter erkundet, darfst du eine Hen-Wen-Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Taram",
      version: "Gardien de cochon",
      text: "Soutien SUIVRE LE COCHON Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez renvoyer dans votre main une carte Personnage nommée Tirelire de votre défausse.",
    },
    it: {
      name: "Taron",
      version: "Guardiano di Porci",
      text: "Aiutante SEGUI IL MAIALE Ogni volta che questo personaggio va all'avventura, puoi riprendere in mano una carta personaggio chiamata Ewy dai tuoi scarti.",
    },
  },
  inkType: ["amber"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 15,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8f86e553eb5c40dc8833c69b23a732ff",
    tcgPlayer: 658291,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "FOLLOW THE PIG",
      description:
        "Whenever this character quests, you may return a character card named Hen Wen from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "5f5-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
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
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "5f5-2",
      name: "FOLLOW THE PIG",
      text: "FOLLOW THE PIG Whenever this character quests, you may return a character card named Hen Wen from your discard to your hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
