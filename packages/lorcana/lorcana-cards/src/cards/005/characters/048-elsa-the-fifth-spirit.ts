import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaTheFifthSpirit: CharacterCard = {
  id: "PX4",
  canonicalId: "ci_PX4",
  reprints: ["set5-048"],
  cardType: "character",
  name: "Elsa",
  version: "The Fifth Spirit",
  i18n: {
    en: {
      name: "Elsa",
      version: "The Fifth Spirit",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Evasive",
        },
        {
          title: "CRYSTALLIZE",
          description: "When you play this character, exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Der fünfte Geist",
      text: "Rasant Wendig KRISTALLISIEREN Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen Charakter deiner Wahl.",
    },
    fr: {
      name: "Elsa",
      version: "Le cinquième esprit",
      text: "Charge Insaisissable CRISTALLISATION Lorsque vous jouez ce personnage, choisissez un personnage adverse et épuisez-le.",
    },
    it: {
      name: "Elsa",
      version: "Il Quinto Spirito",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) Sfuggente CRISTALLIZZARE Quando giochi questo personaggio, impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 48,
  rarity: "common",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_db64e740e8ef4c22b87c89fa48093cee",
    tcgPlayer: 555245,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Evasive",
    },
    {
      title: "CRYSTALLIZE",
      description: "When you play this character, exert chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "dwf-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      id: "dwf-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "dwf-3",
      name: "CRYSTALLIZE",
      text: "CRYSTALLIZE When you play this character, exert chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
