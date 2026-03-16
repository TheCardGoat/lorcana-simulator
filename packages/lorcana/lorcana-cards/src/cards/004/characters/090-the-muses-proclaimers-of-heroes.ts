import type { CharacterCard } from "@tcg/lorcana-types";

export const theMusesProclaimersOfHeroes: CharacterCard = {
  id: "BQW",
  canonicalId: "ci_BQW",
  reprints: ["set4-090"],
  cardType: "character",
  name: "The Muses",
  version: "Proclaimers of Heroes",
  i18n: {
    en: {
      name: "The Muses",
      version: "Proclaimers of Heroes",
      text: [
        {
          title: "Ward",
        },
        {
          title: "THE GOSPEL TRUTH",
          description:
            "Whenever you play a song, you may return chosen character with 2 {S} or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Die Musen",
      version: "Besingerinnen von Helden",
      text: "Behütet JEDES WORT IST WAHR! Jedes Mal, wenn du ein Lied ausspielst, darfst du einen Charakter deiner Wahl, mit 2 oder weniger, zurück auf die zugehörige Hand schicken.",
    },
    fr: {
      name: "Les Muses",
      version: "Proclamatrices de héros",
      text: "Hors d'atteinte DU GOSPEL PUR Chaque fois que vous jouez une chanson, vous pouvez choisir un personnage avec 2 ou moins et le renvoyer dans la main de son propriétaire.",
    },
    it: {
      name: "Le Muse",
      version: "Proclamatrici di Eroi",
      text: "Protetto QUESTA È LA REALTÀ Ogni volta che giochi una canzone, puoi far riprendere in mano al suo giocatore un personaggio a tua scelta con 2 o inferiore.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 90,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_12e044565cad4dea9a798105ec0df2f2",
    tcgPlayer: 547727,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "THE GOSPEL TRUTH",
      description:
        "Whenever you play a song, you may return chosen character with 2 {S} or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1x8-1",
      keyword: "Ward",
      text: "Ward",
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
      id: "1x8-2",
      name: "THE GOSPEL TRUTH",
      text: "THE GOSPEL TRUTH Whenever you play a song, you may return chosen character with 2 {S} or less to their player's hand.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
