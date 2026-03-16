import type { LocationCard } from "@tcg/lorcana-types";

export const darkwingTowerIcyHeadquarters: LocationCard = {
  id: "Rs3",
  canonicalId: "ci_Rs3",
  reprints: ["set11-204"],
  cardType: "location",
  name: "Darkwing Tower",
  version: "Icy Headquarters",
  i18n: {
    en: {
      name: "Darkwing Tower",
      version: "Icy Headquarters",
      text: [
        {
          title: "EVIL VANQUISHED",
          description:
            "During your turn, whenever an opposing Villain character is banished, you may ready a character here. If you do, they can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Darkwings Turm",
      version: "Vereistes Hauptquartier",
      text: [
        {
          title: "DAS BÖSE BEZWUNGEN",
          description:
            "Jedes Mal während deines Zuges, wenn ein gegnerischer Schurke verbannt wird, darfst du einen Charakter an diesem Ort bereit machen. Wenn du dies tust, kann jener in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Tour de Myster Mask",
      version: "Quartier général glacé",
      text: [
        {
          title: "LE MAL EST VAINCU",
          description:
            "Durant votre tour, chaque fois qu'un personnage adverse Méchant est banni, vous pouvez redresser un personnage sur ce lieu. Si vous le faites, ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Torre Darkwing",
      version: "Quartier Generale Ghiacciato",
      text: [
        {
          title: "IL MALE SCONFITTO",
          description:
            "Durante il tuo turno, ogni volta che un personaggio Cattivo avversario viene esiliato, puoi preparare un personaggio in questo luogo. Se lo fai, non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 204,
  rarity: "uncommon",
  cost: 4,
  willpower: 8,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_22e1f1dc8f434e0a87d5335d7a6b2984",
    tcgPlayer: 676252,
  },
  text: [
    {
      title: "EVIL VANQUISHED",
      description:
        "During your turn, whenever an opposing Villain character is banished, you may ready a character here. If you do, they can't quest for the rest of this turn.",
    },
  ],
  abilities: [
    {
      id: "1bz-1",
      effect: {
        chooser: "CONTROLLER",
        type: "optional",
        effect: {
          type: "sequence",
          steps: [
            {
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "you",
                selector: "chosen",
                zones: ["play"],
                filter: [
                  {
                    type: "same-location-as-source",
                  },
                ],
              },
              type: "ready",
            },
            {
              restriction: "cant-quest",
              target: {
                ref: "previous-target",
              },
              type: "restriction",
              duration: "this-turn",
            },
          ],
        },
      },
      name: "EVIL VANQUISHED",
      trigger: {
        event: "banish",
        on: {
          cardType: "character",
          controller: "opponent",
          classification: "Villain",
        },
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
      text: "EVIL VANQUISHED During your turn, whenever an opposing Villain character is banished, you may ready a character here. If you do, they can't quest for the rest of this turn.",
    },
  ],
};
