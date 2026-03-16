import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiExpandedConsciousness: CharacterCard = {
  id: "MiH",
  canonicalId: "ci_MiH",
  reprints: ["set7-163"],
  cardType: "character",
  name: "Heihei",
  version: "Expanded Consciousness",
  i18n: {
    en: {
      name: "Heihei",
      version: "Expanded Consciousness",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Resist +1",
        },
        {
          title: "CLEAR YOUR MIND",
          description:
            "When you play this character, put all cards from your hand into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "HeiHei",
      version: "Erweitertes Bewusstsein",
      text: "Gestaltwandel 3 Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) DEN GEIST BEFREIEN Wenn du diesen Charakter ausspielst, lege alle Karten aus deiner Hand verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "Heihei",
      version: "Conscience élargie",
      text: "Alter 3 Résistance +1 FAITES LE VIDE DANS VOTRE ESPRIT Lorsque vous jouez ce personnage, placez toutes les cartes de votre main dans votre réserve d'encre, face cachée et épuisées.",
    },
    it: {
      name: "Heihei",
      version: "Dalla Coscienza Ampliata",
      text: "Trasformazione 3 Resistere +1 LIBERA LA TUA MENTE Quando giochi questo personaggio, aggiungi tutte le carte dalla tua mano al tuo calamaio, a faccia in giù e impegnate.",
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Moana",
  set: "007",
  cardNumber: 163,
  rarity: "uncommon",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f424db642c4340f7a412e29c1bcde568",
    tcgPlayer: 619500,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Resist +1",
    },
    {
      title: "CLEAR YOUR MIND",
      description:
        "When you play this character, put all cards from your hand into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "quw-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "quw-2",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "hand",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "quw-3",
      name: "CLEAR YOUR MIND",
      text: "CLEAR YOUR MIND When you play this character, put all cards from your hand into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
