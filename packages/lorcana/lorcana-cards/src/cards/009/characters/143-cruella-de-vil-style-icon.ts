import type { CharacterCard } from "@tcg/lorcana-types";

export const cruellaDeVilStyleIcon: CharacterCard = {
  id: "PDx",
  canonicalId: "ci_J5u",
  reprints: ["set9-143"],
  cardType: "character",
  name: "Cruella De Vil",
  version: "Style Icon",
  i18n: {
    en: {
      name: "Cruella De Vil",
      version: "Style Icon",
      text: [
        {
          title: "OUT OF SEASON",
          description:
            "Once during your turn, whenever a character with cost 2 or less is banished, put the top card of your deck into your inkwell facedown and exerted.",
        },
        {
          title: "INSULTING REMARK",
          description: "During your turn, each opposing character with cost 2 or less gets -1 {S}.",
        },
      ],
    },
    de: {
      name: "Cruella De Vil",
      version: "Stilikone",
      text: [
        {
          title: "AUSSERHALB DER SAISON",
          description:
            "Einmal während deines Zuges, wenn ein Charakter mit Kosten von 2 oder weniger verbannt wird, lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
        },
        {
          title: "BELEIDIGENDER KOMMENTAR",
          description:
            "In deinem Zug erhält jeder gegnerische Charakter mit Kosten von 2 oder weniger -1.",
        },
      ],
    },
    fr: {
      name: "Cruella d'Enfer",
      version: "Icône de la mode",
      text: [
        {
          title: "HORS-SAISON",
          description:
            "Une fois durant votre tour, lorsqu'un personnage coûtant 2 ou moins est banni, placez la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
        {
          title: "REMARQUE OFFENSANTE",
          description: "Durant votre tour, chaque personnage adverse coûtant 2 ou moins subit -1.",
        },
      ],
    },
    it: {
      name: "Crudelia De Mon",
      version: "Icona di Stile",
      text: [
        {
          title: "FUORI STAGIONE",
          description:
            "Una volta durante il tuo turno, ogni volta che un personaggio con costo 2 o inferiore viene esiliato, aggiungi la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
        {
          title: "COMMENTO OFFENSIVO",
          description:
            "Durante il tuo turno, ogni personaggio avversario con costo 2 o inferiore riceve -1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "009",
  cardNumber: 143,
  rarity: "legendary",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_f5d62175b09243eda1bf9f34ea01d884",
    tcgPlayer: 651120,
  },
  text: [
    {
      title: "OUT OF SEASON",
      description:
        "Once during your turn, whenever a character with cost 2 or less is banished, put the top card of your deck into your inkwell facedown and exerted.",
    },
    {
      title: "INSULTING REMARK",
      description: "During your turn, each opposing character with cost 2 or less gets -1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "top-of-deck",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "1r1-1",
      name: "OUT OF SEASON Once",
      text: "OUT OF SEASON Once during your turn, whenever a character with cost 2 or less is banished, put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1r1-2",
      text: "INSULTING REMARK During your turn, each opposing character with cost 2 or less gets -1 {S}.",
      type: "action",
    },
  ],
};
