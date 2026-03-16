import type { LocationCard } from "@tcg/lorcana-types";

export const owlIslandSecludedEntrance: LocationCard = {
  id: "nw9",
  canonicalId: "ci_nw9",
  reprints: ["set6-102"],
  cardType: "location",
  name: "Owl Island",
  version: "Secluded Entrance",
  i18n: {
    en: {
      name: "Owl Island",
      version: "Secluded Entrance",
      text: [
        {
          title: "TEAMWORK",
          description:
            "For each character you have here, you pay 1 {I} less for the first action you play each turn.",
        },
        {
          title: "LOTS TO LEARN",
          description: "Whenever you play a second action in a turn, gain 3 lore.",
        },
      ],
    },
    de: {
      name: "Insel der Eule",
      version: "Abgelegener Eingang",
      text: [
        {
          title: "TEAMARBEIT",
          description:
            "Für jeden deiner Charaktere an diesem Ort zahlst du 1 weniger für die erste Aktion, die du in jedem Zug ausspielst.",
        },
        {
          title: "VIEL ZU LERNEN",
          description:
            "Jedes Mal, wenn du in einem Zug die zweite Aktion ausspielst, sammelst du 3 Legenden.",
        },
      ],
    },
    fr: {
      name: "Île de la Chouette",
      version: "Entrée isolée",
      text: [
        {
          title: "TRAVAIL D'ÉQUIPE",
          description:
            "Pour chaque personnage sur ce lieu, la première action que vous jouez chaque tour vous coûte 1 de moins.",
        },
        {
          title: "BEAUCOUP À APPRENDRE",
          description:
            "Chaque fois que vous jouez la deuxième action de votre tour, gagnez 3 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Isola del Gufo",
      version: "Ingresso Nascosto",
      text: [
        {
          title: "LAVORO DI SQUADRA",
          description:
            "Per ogni personaggio che hai in questo luogo, paga 1 in meno per giocare la tua prima azione ogni turno.",
        },
        {
          title: "MOLTO DA IMPARARE",
          description: "Ogni volta che giochi una seconda azione in un turno, ottieni 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "006",
  cardNumber: 102,
  rarity: "rare",
  cost: 3,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_2f052175c77d4035b1e261bf1675aee8",
    tcgPlayer: 593034,
  },
  text: [
    {
      title: "TEAMWORK",
      description:
        "For each character you have here, you pay 1 {I} less for the first action you play each turn.",
    },
    {
      title: "LOTS TO LEARN",
      description: "Whenever you play a second action in a turn, gain 3 lore.",
    },
  ],
  abilities: [
    {
      condition: {
        type: "and",
        conditions: [
          {
            type: "turn-metric",
            metric: "played-actions",
            comparison: {
              operator: "eq",
              value: 0,
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
              ],
            },
            comparison: {
              operator: "gte",
              value: 1,
            },
          },
        ],
      },
      effect: {
        amount: {
          type: "filtered-count",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        cardType: "action",
        type: "cost-reduction",
      },
      id: "y11-1",
      name: "TEAMWORK",
      text: "TEAMWORK For each character you have here, you pay 1 {I} less for the first action you play each turn.",
      type: "static",
    },
    {
      condition: {
        type: "turn-metric",
        metric: "played-actions",
        comparison: {
          operator: "eq",
          value: 2,
        },
      },
      effect: {
        amount: 3,
        type: "gain-lore",
      },
      id: "y11-2",
      name: "LOTS TO LEARN",
      text: "LOTS TO LEARN Whenever you play a second action in a turn, gain 3 lore.",
      trigger: {
        event: "play",
        on: {
          controller: "you",
          cardType: "action",
        },
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
