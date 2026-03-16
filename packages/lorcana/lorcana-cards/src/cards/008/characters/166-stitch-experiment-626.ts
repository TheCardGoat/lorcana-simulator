import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchExperiment626: CharacterCard = {
  id: "fkl",
  canonicalId: "ci_jjP",
  reprints: ["set8-166"],
  cardType: "character",
  name: "Stitch",
  version: "Experiment 626",
  i18n: {
    en: {
      name: "Stitch",
      version: "Experiment 626",
      text: [
        {
          title: "SO NAUGHTY",
          description:
            "When you play this character, each opponent puts the top card of their deck into their inkwell facedown and exerted.",
        },
        {
          title: "STEALTH MODE",
          description:
            "At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play this character for free and he enters play exerted.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Experiment 626",
      text: [
        {
          title: "DAS IST JA WIDERLICH",
          description:
            "Wenn du diesen Charakter ausspielst, legen alle gegnerischen Mitspielenden die oberste Karte ihres Decks verdeckt und erschöpft in ihren Tintenvorrat.",
        },
        {
          title: "TARNKAPPENMODUS",
          description:
            "Zu Beginn deines Zuges, wenn diese Karte in deinem Ablagestapel ist, darfst du eine Karte mit von deiner Hand abwerfen, um diese Karte kostenlos und erschöpft auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Expérience 626",
      text: [
        {
          title: "SI MÉCHANT",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire place la carte du dessus de sa pioche dans sa réserve d'encre, face cachée et épuisé.",
        },
        {
          title: "MODE FURTIF",
          description:
            "Au début de votre tour, si cette carte est dans votre défausse, vous pouvez défausser une carte pour jouer cette carte-ci gratuitement et épuisée.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Esperimento 626",
      text: [
        {
          title: "CHE LINGUAGGIO SCONCIO",
          description:
            "Quando giochi questo personaggio, ogni avversario aggiunge la prima carta del suo mazzo al suo calamaio, a faccia in giù e impegnata.",
        },
        {
          title: "MODALITÀ FURTIVA",
          description:
            "All'inizio del tuo turno, se questa carta si trova nei tuoi scarti, puoi scegliere e scartare una carta con per giocare questo personaggio gratis ed entra in gioco impegnato.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 166,
  rarity: "legendary",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1a6358dd0385477eb83213749cb5d38f",
    tcgPlayer: 633104,
  },
  text: [
    {
      title: "SO NAUGHTY",
      description:
        "When you play this character, each opponent puts the top card of their deck into their inkwell facedown and exerted.",
    },
    {
      title: "STEALTH MODE",
      description:
        "At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play this character for free and he enters play exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "hand",
        target: "OPPONENT",
        type: "put-into-inkwell",
      },
      id: "bxo-1",
      name: "SO NAUGHTY",
      text: "SO NAUGHTY When you play this character, each opponent puts the top card of their deck into their inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        condition: {
          expression: "this card is in your discard",
          type: "if",
        },
        then: {
          restriction: "enters-play-exerted",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "bxo-2",
      text: "STEALTH MODE At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play this character for free and he enters play exerted.",
      type: "static",
    },
  ],
};
