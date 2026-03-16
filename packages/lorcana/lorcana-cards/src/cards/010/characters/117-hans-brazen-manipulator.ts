import type { CharacterCard } from "@tcg/lorcana-types";

export const hansBrazenManipulator: CharacterCard = {
  id: "8Rp",
  canonicalId: "ci_8Rp",
  reprints: ["set10-117"],
  cardType: "character",
  name: "Hans",
  version: "Brazen Manipulator",
  i18n: {
    en: {
      name: "Hans",
      version: "Brazen Manipulator",
      text: [
        {
          title: "JOSTLING FOR POWER",
          description: "King and Queen characters can't quest.",
        },
        {
          title: "GROWING INFLUENCE",
          description:
            "At the start of your turn, if an opponent has 2 or more ready characters in play, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Hans",
      version: "Unverschämter Manipulator",
      text: [
        {
          title: "DAS RINGEN UM MACHT",
          description: "Könige und Königinnen können nicht erkunden.",
        },
        {
          title: "WACHSENDER EINFLUSS",
          description:
            "Zu Beginn deines Zuges, wenn mindestens eine gegnerische Person 2 oder mehr bereite Charaktere im Spiel hat, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Hans",
      version: "Manipulateur éhonté",
      text: [
        {
          title: "LUTTE POUR LE POUVOIR",
          description: "Les personnages Roi et Reine ne peuvent pas être envoyé à l'aventure.",
        },
        {
          title: "INFLUENCE GRANDISSANTE",
          description:
            "Au début de votre tour, si un adversaire a 2 personnages redressés ou plus en jeu, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Hans",
      version: "Manipolatore Sfacciato",
      text: [
        {
          title: "SGOMITARE PER IL POTERE I",
          description: "personaggi Re e Regina non possono andare all'avventura.",
        },
        {
          title: "INFLUENZA CRESCENTE",
          description:
            "All'inizio del tuo turno, se un avversario ha in gioco 2 o più personaggi preparati, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 117,
  rarity: "common",
  cost: 6,
  strength: 6,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c8a9d4fc3bd241468dc26f8415bea95a",
    tcgPlayer: 659620,
  },
  text: [
    {
      title: "JOSTLING FOR POWER",
      description: "King and Queen characters can't quest.",
    },
    {
      title: "GROWING INFLUENCE",
      description:
        "At the start of your turn, if an opponent has 2 or more ready characters in play, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  abilities: [
    {
      effect: {
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "bkr-1",
      text: "JOSTLING FOR POWER King and Queen characters can't quest.",
      type: "action",
    },
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "opponent",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "ready",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 2,
          },
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "bkr-2",
      text: "GROWING INFLUENCE At the start of your turn, if an opponent has 2 or more ready characters in play, gain 2 lore.",
      type: "action",
    },
  ],
};
