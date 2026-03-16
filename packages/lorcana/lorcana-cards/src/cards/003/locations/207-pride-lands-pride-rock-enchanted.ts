import type { LocationCard } from "@tcg/lorcana-types";

export const prideLandsPrideRockEnchanted: LocationCard = {
  id: "W96",
  canonicalId: "ci_udL",
  reprints: ["set3-033"],
  cardType: "location",
  name: "Pride Lands",
  version: "Pride Rock",
  i18n: {
    en: {
      name: "Pride Lands",
      version: "Pride Rock",
      text: [
        {
          title: "WE ARE ALL CONNECTED",
          description: "Characters get +2 {W} while here.",
        },
        {
          title: "LION HOME",
          description:
            "If you have a Prince or King character here, you pay 1 {I} less to play characters.",
        },
      ],
    },
    de: {
      name: "Das Geweihte Land",
      version: "Königsfelsen",
      text: [
        {
          title: "WIR SIND ALLE EINS",
          description: "Charaktere an diesem Ort erhalten +2.",
        },
        {
          title: "ZUHAUSE DER LÖWEN",
          description:
            "Wenn du mindestens einen Prinz oder einen König an diesem Ort hast, zahlst du 1 weniger, um Charaktere auszuspielen.",
        },
      ],
    },
    fr: {
      name: "La Terre des Lions",
      version: "Le rocher des lions",
      text: [
        {
          title: "C'EST COMME LES MAILLONS D'UNE CHAÎNE",
          description: "Les personnages sur ce lieu gagnent +2.",
        },
        {
          title: "DEMEURE DES LIONS",
          description:
            "Si un personnage Prince ou Roi se trouve sur ce lieu, jouer des personnages vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Terre del Branco",
      version: "La Rupe dei Re",
      text: [
        {
          title: "SIAMO TUTTI COLLEGATI I",
          description: "personaggi ricevono +2 mentre si trovano in questo luogo.",
        },
        {
          title: "CASA DEL LEONE",
          description:
            "Se un personaggio Principe o Re si trova in questo luogo, paga 1 in meno per giocare i personaggi.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "003",
  cardNumber: 207,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  willpower: 7,
  moveCost: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_bbb647e1cbe3487baa2ad65b27a999ba",
    tcgPlayer: 539157,
  },
  text: [
    {
      title: "WE ARE ALL CONNECTED",
      description: "Characters get +2 {W} while here.",
    },
    {
      title: "LION HOME",
      description:
        "If you have a Prince or King character here, you pay 1 {I} less to play characters.",
    },
  ],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "willpower",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
      id: "1ph-1",
      name: "WE ARE ALL CONNECTED",
      text: "WE ARE ALL CONNECTED Characters get +2 {W} while here.",
      type: "static",
    },
    {
      effect: {
        amount: 1,
        cardType: "character",
        type: "cost-reduction",
      },
      id: "1ph-2",
      name: "LION HOME",
      text: "LION HOME If you have a Prince or King character here, you pay 1 {I} less to play characters.",
      type: "static",
      condition: {
        type: "or",
        conditions: [
          {
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
                  type: "has-classification",
                  classification: "Prince",
                },
              ],
            },
            comparison: {
              operator: "gte",
              value: 1,
            },
          },
          {
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
                  type: "has-classification",
                  classification: "King",
                },
              ],
            },
            comparison: {
              operator: "gte",
              value: 1,
            },
          },
        ],
      },
    },
  ],
};
