import type { LocationCard } from "@tcg/lorcana-types";

export const flotillaCoconutArmada: LocationCard = {
  id: "Xlq",
  canonicalId: "ci_Xlq",
  reprints: ["set6-135"],
  cardType: "location",
  name: "Flotilla",
  version: "Coconut Armada",
  i18n: {
    en: {
      name: "Flotilla",
      version: "Coconut Armada",
      text: [
        {
          title: "TINY THIEVES",
          description:
            "At the start of your turn, if you have a character here, all opponents lose 1 lore and you gain lore equal to the lore lost this way.",
        },
      ],
    },
    de: {
      name: "Flottille",
      version: "Armada der Kokosnüsse",
      text: [
        {
          title: "KLEINE DIEBE",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Charakter an diesem Ort hast, verlieren alle gegnerischen Mitspielenden je 1 Legende und du sammelst für jede so verlorene Legende je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Flotille Kakamora",
      version: "Armada Noix de coco",
      text: [
        {
          title: "PETITS VOLEURS",
          description:
            "Au début de votre tour, si vous avez un personnage sur ce lieu, tous vos adversaires perdent 1 éclat de Lore. Gagnez autant d'éclats de Lore que vos adversaires en ont perdu de cette façon.",
        },
      ],
    },
    it: {
      name: "Flottiglia",
      version: "Flotta di Noci di Cocco",
      text: [
        {
          title: "MINUSCOLI LADRI",
          description:
            "All'inizio del tuo turno, se hai un personaggio in questo luogo, tutti gli avversari perdono 1 leggenda e tu ottieni leggenda pari alla leggenda persa in questo modo.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 135,
  rarity: "rare",
  cost: 2,
  willpower: 6,
  moveCost: 2,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_5b57ee130c204b778df487c9826834c1",
    tcgPlayer: 588367,
  },
  text: [
    {
      title: "TINY THIEVES",
      description:
        "At the start of your turn, if you have a character here, all opponents lose 1 lore and you gain lore equal to the lore lost this way.",
    },
  ],
  abilities: [
    {
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
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          steps: [
            {
              amount: 1,
              target: "EACH_OPPONENT",
              type: "lose-lore",
            },
            {
              amount: {
                type: "lore-lost",
              },
              target: "CONTROLLER",
              type: "gain-lore",
            },
          ],
          type: "sequence",
        },
        type: "conditional",
      },
      id: "1vh-1",
      name: "TINY THIEVES",
      text: "TINY THIEVES At the start of your turn, if you have a character here, all opponents lose 1 lore and you gain lore equal to the lore lost this way.",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
