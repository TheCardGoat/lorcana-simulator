import type { ActionCard } from "@tcg/lorcana-types";

export const educationOrElimination: ActionCard = {
  id: "y2L",
  canonicalId: "ci_y2L",
  reprints: ["set11-097"],
  cardType: "action",
  name: "Education or Elimination",
  i18n: {
    en: {
      name: "Education or Elimination",
      text: [
        {
          title: "Choose one:",
        },
        {
          title:
            "* Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn.",
        },
        {
          title: "* Banish chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Erziehung oder Eliminierung",
      text: "Wähle eine Möglichkeit aus: • Ziehe 1 Karte. Wähle einen deiner Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges +1 und Wendig. • Verbanne einen beschädigten Charakter deiner Wahl.",
    },
    fr: {
      name: "L’éducation ou l’élimination",
      text: "Choisissez entre: • Piochez une carte. Choisissez l'un de vos personnages qui gagne +1 et Insaisissable jusqu'au début de votre prochain tour. • Choisissez un personnage ayant au moins un dommage et bannissez-le.",
    },
    it: {
      name: "Preparazione o Eliminazione",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Scegli uno: • Pesca una carta. Un tuo personaggio a tua scelta riceve +1 e ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.) • Esilia un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 97,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_69c74f5a7fcb431290622e2321e786fe",
    tcgPlayer: 676208,
  },
  text: [
    {
      title: "Choose one:",
    },
    {
      title:
        "* Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn.",
    },
    {
      title: "* Banish chosen damaged character.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Choose one: Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn. Banish chosen damaged character.",
      effect: {
        type: "choice",
        options: [
          {
            type: "sequence",
            steps: [
              {
                type: "draw",
                amount: 1,
                target: "CONTROLLER",
              },
              {
                type: "modify-stat",
                stat: "lore",
                modifier: 1,
                duration: "until-start-of-next-turn",
                target: "CHOSEN_CHARACTER_OF_YOURS",
              },
              {
                type: "gain-keyword",
                keyword: "Evasive",
                duration: "until-start-of-next-turn",
                target: {
                  ref: "previous-target",
                },
              },
            ],
          },
          {
            type: "banish",
            target: "CHOSEN_DAMAGED_CHARACTER",
          },
        ],
      },
    },
  ],
};
