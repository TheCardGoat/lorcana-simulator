import type { LocationCard } from "@tcg/lorcana-types";

export const mysticalTreeMamaOdiesHome: LocationCard = {
  id: "6Fu",
  canonicalId: "ci_6Fu",
  reprints: ["set6-069"],
  cardType: "location",
  name: "Mystical Tree",
  version: "Mama Odie's Home",
  i18n: {
    en: {
      name: "Mystical Tree",
      version: "Mama Odie's Home",
      text: [
        {
          title: "NOT BAD",
          description:
            "At the start of your turn, you may move 1 damage counter from chosen character here to chosen opposing character.",
        },
        {
          title: "HARD-EARNED WISDOM",
          description:
            "At the start of your turn, if you have a character named Mama Odie here, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Mystischer Baum",
      version: "Mama Odies Zuhause",
      text: [
        {
          title: "NICHT SCHLECHT",
          description:
            "Zu Beginn deines Zuges darfst du 1 Schadensmarker von einem Charakter deiner Wahl an diesem Ort zu einem gegnerischen Charakter deiner Wahl verschieben.",
        },
        {
          title: "HART ERARBEITETES WISSEN",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Mama-Odie-Charakter an diesem Ort hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Arbre mystique",
      version: "Maison de Mama Odie",
      text: [
        {
          title: "PAS MAL",
          description:
            "Au début de votre tour, vous pouvez choisir un personnage sur ce lieu et déplacer 1 de ses dommages sur un personnage adverse de votre choix.",
        },
        {
          title: "SAGESSE DUREMENT ACQUISE",
          description:
            "Au début de votre tour, si vous avez un personnage Mama Odie sur ce lieu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Albero Mistico",
      version: "Casa di Mamma Odie",
      text: [
        {
          title: "NON MALE",
          description:
            "All'inizio del tuo turno, puoi spostare 1 segnalino danno da un personaggio a tua scelta in questo luogo a un personaggio avversario a tua scelta.",
        },
        {
          title: "SAGGEZZA OTTENUTA CON FATICA",
          description:
            "All'inizio del tuo turno, se hai un personaggio chiamato Mamma Odie in questo luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "006",
  cardNumber: 69,
  rarity: "rare",
  cost: 2,
  willpower: 7,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_9119b44cfe67444288a32f23009541e8",
    tcgPlayer: 586978,
  },
  text: [
    {
      title: "NOT BAD",
      description:
        "At the start of your turn, you may move 1 damage counter from chosen character here to chosen opposing character.",
    },
    {
      title: "HARD-EARNED WISDOM",
      description:
        "At the start of your turn, if you have a character named Mama Odie here, gain 1 lore.",
    },
  ],
  abilities: [
    {
      id: "4wd-1",
      name: "NOT BAD",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          from: {
            selector: "chosen",
            count: 1,
            owner: "you",
            zones: ["play"],
            cardTypes: ["character"],
            filter: [
              {
                type: "same-location-as-source",
              },
            ],
          },
          to: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "move-damage",
        },
        type: "optional",
      },
      text: "NOT BAD At the start of your turn, you may move 1 damage counter from chosen character here to chosen opposing character.",
      type: "triggered",
    },
    {
      id: "4wd-2",
      name: "HARD-EARNED WISDOM",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "same-location-as-source",
              },
              {
                type: "has-name",
                name: "Mama Odie",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      text: "HARD-EARNED WISDOM At the start of your turn, if you have a character named Mama Odie here, gain 1 lore.",
      type: "triggered",
    },
  ],
};
