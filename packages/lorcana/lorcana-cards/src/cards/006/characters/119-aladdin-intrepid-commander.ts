import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinIntrepidCommander: CharacterCard = {
  id: "brg",
  canonicalId: "ci_brg",
  reprints: ["set6-119"],
  cardType: "character",
  name: "Aladdin",
  version: "Intrepid Commander",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Intrepid Commander",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "REMEMBER YOUR TRAINING",
          description: "When you play this character, your characters get +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Unerschrockener Kommandant",
      text: "Gestaltwandel 2 ERINNERE DICH AN DEIN TRAINING Wenn du diesen Charakter ausspielst, erhalten deine Charaktere in diesem Zug +2.",
    },
    fr: {
      name: "Aladdin",
      version: "Commandant intrépide",
      text: "Alter 2 RAPPELLE-TOI TON ENTRAÎNEMENT Lorsque vous jouez ce personnage, vos personnages gagnent +2 pour le reste de ce tour.",
    },
    it: {
      name: "Aladdin",
      version: "Comandante Intrepido",
      text: "Trasformazione 2 RICORDA IL TUO ADDESTRAMENTO Quando giochi questo personaggio, i tuoi personaggi ricevono +2 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 119,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a5acdc20f6a54938be2874ab080a9053",
    tcgPlayer: 588075,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "REMEMBER YOUR TRAINING",
      description: "When you play this character, your characters get +2 {S} this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "z1l-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "z1l-2",
      name: "REMEMBER YOUR TRAINING",
      text: "REMEMBER YOUR TRAINING When you play this character, your characters get +2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
