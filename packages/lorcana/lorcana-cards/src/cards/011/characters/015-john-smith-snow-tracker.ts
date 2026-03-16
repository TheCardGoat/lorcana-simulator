import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSmithSnowTracker: CharacterCard = {
  id: "HJJ",
  canonicalId: "ci_HJJ",
  reprints: ["set11-015"],
  cardType: "character",
  name: "John Smith",
  version: "Snow Tracker",
  i18n: {
    en: {
      name: "John Smith",
      version: "Snow Tracker",
      text: [
        {
          title: "FOLLOW THE TRACKS",
          description:
            "At the end of your turn, if this character is exerted and none of your characters challenged this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "John Smith",
      version: "Fährtenleser im Schnee",
      text: [
        {
          title: "FOLGE DEN SPUREN",
          description:
            "Am Ende deines Zuges, falls dieser Charakter erschöpft ist und in diesem Zug keiner deiner Charaktere herausgefordert hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "John Smith",
      version: "Pisteur des neiges",
      text: [
        {
          title: "SUIT LES TRACES À",
          description:
            "la fin de votre tour, si ce personnage est épuisé et qu'aucun de vos personnages n'a défié ce tour-ci, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "John Smith",
      version: "Inseguitore sulla Neve",
      text: [
        {
          title: "SEGUIRE LE TRACCE",
          description:
            "Alla fine del tuo turno, se questo personaggio è impegnato e nessuno dei tuoi personaggi ha sfidato in questo turno, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 15,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b1c578429eb547b3b5908a637c491c3e",
    tcgPlayer: 674828,
  },
  text: [
    {
      title: "FOLLOW THE TRACKS",
      description:
        "At the end of your turn, if this character is exerted and none of your characters challenged this turn, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "11a-1",
      effect: {
        condition: {
          type: "and",
          conditions: [
            {
              type: "target-query",
              query: {
                selector: "all",
                reference: "source",
                filters: [
                  {
                    type: "exerted",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            {
              type: "turn-metric",
              metric: "challenges-by-player",
              comparison: {
                operator: "eq",
                value: 0,
              },
              playerScope: "you",
            },
          ],
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      type: "action",
      text: "FOLLOW THE TRACKS At the end of your turn, if this character is exerted and none of your characters challenged this turn, gain 1 lore.",
    },
  ],
};
