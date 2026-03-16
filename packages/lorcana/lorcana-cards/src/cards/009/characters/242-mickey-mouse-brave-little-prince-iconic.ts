import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseBraveLittlePrinceIconic: CharacterCard = {
  id: "FeJ",
  canonicalId: "ci_Ka8",
  reprints: ["set9-111"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Brave Little Prince",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Brave Little Prince",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "Evasive",
        },
        {
          title: "CROWNING ACHIEVEMENT",
          description:
            "While this character has a card under him, he gets +3 {S}, +3 {W}, and +3 {L}.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Tapferer Kleiner Prinz",
      text: "Gestaltwandel 5 Wendig KRÖNENDER ABSCHLUSS Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +3, +3 und +3.",
    },
    fr: {
      name: "Mickey Mouse",
      version: "Brave petit prince",
      text: "Alter 5 Insaisissable COURONNÉ DE GLOIRE Tant que ce personnage a une carte sous lui, il gagne +3, +3 et +3.",
    },
    it: {
      name: "Topolino",
      version: "Eroico Principe",
      text: "Trasformazione 5 Sfuggente IMPRESA CORONATA Mentre questo personaggio ha una carta sotto di sé, riceve +3, +3 e +3.",
    },
  },
  inkType: ["ruby"],
  set: "009",
  cardNumber: 242,
  rarity: "common",
  specialRarity: "iconic",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4d10d4cd91454ff389318fd9a19a879f",
    tcgPlayer: 647663,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "Evasive",
    },
    {
      title: "CROWNING ACHIEVEMENT",
      description: "While this character has a card under him, he gets +3 {S}, +3 {W}, and +3 {L}.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "cbw-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      id: "cbw-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "cbw-3",
      text: "CROWNING ACHIEVEMENT While this character has a card under him, he gets +3 {S}, +3 {W}, and +3 {L}.",
      type: "static",
    },
  ],
};
