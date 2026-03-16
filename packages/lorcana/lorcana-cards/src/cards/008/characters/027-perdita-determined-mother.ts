import type { CharacterCard } from "@tcg/lorcana-types";

export const perditaDeterminedMother: CharacterCard = {
  id: "5tQ",
  canonicalId: "ci_Q1m",
  reprints: ["set8-027"],
  cardType: "character",
  name: "Perdita",
  version: "Determined Mother",
  i18n: {
    en: {
      name: "Perdita",
      version: "Determined Mother",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "QUICK, EVERYONE HIDE",
          description:
            "When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Perdi",
      version: "Entschlossene Mutter",
      text: "Gestaltwandel 4 SCHNELL, VERSTECKT EUCH Wenn du diesen Charakter ausspielst, darfst du alle Welpen-Charakterkarten aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat legen.",
    },
    fr: {
      name: "Perdita",
      version: "Mère déterminée",
      text: "Alter 4 VITE, CACHEZ-VOUS TOUS! Lorsque vous jouez ce personnage, vous pouvez placer toutes les cartes Personnage Chiot de votre défausse dans votre réserve d'encre, face cachée et épuisées.",
    },
    it: {
      name: "Peggy",
      version: "Madre Determinata",
      text: "Trasformazione 4 PRESTO, NASCONDETEVI TUTTI Quando giochi questo personaggio, puoi aggiungere al tuo calamaio tutte le carte personaggio Cucciolo dai tuoi scarti, a faccia in giù e impegnate.",
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 27,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_db4137ebc57046a3ba7736adbdb01d44",
    tcgPlayer: 632686,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "QUICK, EVERYONE HIDE",
      description:
        "When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "169-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "169-2",
      text: "QUICK, EVERYONE HIDE When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.",
      type: "action",
    },
  ],
};
