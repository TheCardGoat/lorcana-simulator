import type { CharacterCard } from "@tcg/lorcana-types";

export const mamaOdieMysticalMaven: CharacterCard = {
  id: "gTd",
  canonicalId: "ci_Ul4",
  reprints: ["set3-151", "set9-152"],
  cardType: "character",
  name: "Mama Odie",
  version: "Mystical Maven",
  i18n: {
    en: {
      name: "Mama Odie",
      version: "Mystical Maven",
      text: [
        {
          title: "THIS GOING TO BE GOOD",
          description:
            "Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Mama Odie",
      version: "Mystische Macht",
      text: [
        {
          title: "DAS WIRD GUT WERDEN",
          description:
            "Jedes Mal, wenn du ein Lied ausspielst, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Mama Odie",
      version: "Experte mystique",
      text: [
        {
          title: "ÇA VA ÊTRE FABULEUX",
          description:
            "Chaque fois que vous jouez une chanson, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Mamma Odie",
      version: "Esperta Mistica",
      text: [
        {
          title: "SARÀ BELLISSIMO",
          description:
            "Ogni volta che giochi una canzone, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Princess and the Frog",
  set: "009",
  cardNumber: 152,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_901fa7746b2745bc84aa4c7c6fddbbc7",
    tcgPlayer: 650087,
  },
  text: [
    {
      title: "THIS GOING TO BE GOOD",
      description:
        "Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "1gz-1",
      name: "THIS GOING TO BE GOOD",
      text: "THIS GOING TO BE GOOD Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.",
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
