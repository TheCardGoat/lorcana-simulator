import type { ItemCard } from "@tcg/lorcana-types";

export const transportPod: ItemCard = {
  id: "prE",
  canonicalId: "ci_prE",
  reprints: ["set6-100"],
  cardType: "item",
  name: "Transport Pod",
  i18n: {
    en: {
      name: "Transport Pod",
      text: [
        {
          title: "GIVE 'EM A SHOW",
          description:
            "At the start of your turn, you may move a character of yours to a location for free.",
        },
      ],
    },
    de: {
      name: "Transportkapsel",
      text: [
        {
          title: "JETZT BEKOMMEN SIE IHRE SHOW",
          description:
            "Zu Beginn deines Zuges, darfst du einen deiner Charaktere wählen und ihn kostenlos zu einem Ort bewegen.",
        },
      ],
    },
    fr: {
      name: "Module de transport",
      text: [
        {
          title: "ILS MÉRITENT UNE DÉMONSTRATION",
          description:
            "Au début de votre tour, vous pouvez déplacer gratuitement l'un de vos personnages sur un lieu.",
        },
      ],
    },
    it: {
      name: "Capsula di Trasporto",
      text: [
        {
          title: "UN BELLO SPETTACOLO",
          description:
            "All'inizio del tuo turno, puoi spostare un tuo personaggio in un luogo, gratis.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 100,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d508f285a934e1fbdd5182fc46734b9",
    tcgPlayer: 593046,
  },
  text: [
    {
      title: "GIVE 'EM A SHOW",
      description:
        "At the start of your turn, you may move a character of yours to a location for free.",
    },
  ],
  abilities: [
    {
      id: "5nq-1",
      name: "GIVE 'EM A SHOW",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "move-to-location",
          character: "CHOSEN_CHARACTER_OF_YOURS",
          location: {
            selector: "chosen",
            count: 1,
            owner: "you",
            zones: ["play"],
            cardTypes: ["location"],
          },
          cost: "free",
        },
      },
      text: "GIVE 'EM A SHOW At the start of your turn, you may move a character of yours to a location for free.",
    },
  ],
};
