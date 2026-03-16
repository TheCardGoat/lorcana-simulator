import type { CharacterCard } from "@tcg/lorcana-types";

export const jiminyCricketGhostOfChristmasPastEpic: CharacterCard = {
  id: "tje",
  canonicalId: "ci_dGY",
  reprints: ["set11-146"],
  cardType: "character",
  name: "Jiminy Cricket",
  version: "Ghost of Christmas Past",
  i18n: {
    en: {
      name: "Jiminy Cricket",
      version: "Ghost of Christmas Past",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "LOOK INTO YOUR PAST",
          description:
            "Whenever you put a card under this character, you may put a card from your discard into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Jiminy Grille",
      version: "Geist der vergangenen Weihnacht",
      text: "Stärken 2 BLICK IN DEINE VERGANGENHEIT Jedes Mal, wenn du eine Karte unter diesen Charakter legst, darfst du 1 Karte aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat legen.",
    },
    fr: {
      name: "Jiminy Cricket",
      version: "Fantôme des Noëls passés",
      text: "Boost 2 CONTEMPLE TON PASSÉ Chaque fois que vous placez une carte sous ce personnage, vous pouvez placer une carte de votre défausse dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Grillo Parlante",
      version: "Fantasma dei Natali Passati",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) GUARDA NEL TUO PASSATO Ogni volta che metti una carta sotto a questo personaggio, puoi aggiungere una carta dai tuoi scarti al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 218,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea1ae83b3c414a2a838398390473ebc6",
    tcgPlayer: 677153,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "LOOK INTO YOUR PAST",
      description:
        "Whenever you put a card under this character, you may put a card from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Ghost"],
  abilities: [
    {
      id: "5um-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "5um-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
          exerted: true,
          facedown: true,
        },
        type: "optional",
      },
      name: "LOOK INTO YOUR PAST",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LOOK INTO YOUR PAST Whenever you put a card under this character, you may put a card from your discard into your inkwell facedown and exerted.",
    },
  ],
};
