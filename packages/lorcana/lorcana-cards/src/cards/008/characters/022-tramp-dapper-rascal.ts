import type { CharacterCard } from "@tcg/lorcana-types";

export const trampDapperRascal: CharacterCard = {
  id: "M9y",
  canonicalId: "ci_M9y",
  reprints: ["set8-022"],
  cardType: "character",
  name: "Tramp",
  version: "Dapper Rascal",
  i18n: {
    en: {
      name: "Tramp",
      version: "Dapper Rascal",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "PLAY IT COOL",
          description:
            "During an opponent's turn, whenever one of your characters is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Strolch",
      version: "Eleganter Rabauke",
      text: "Gestaltwandel 4 BLEIB COOL Jedes Mal, wenn einer deiner Charaktere im Zug einer gegnerischen Person verbannt wird, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Clochard",
      version: "Voyou élégant",
      text: "Alter 4 GARDER SON SANG-FROID Durant le tour d'un adversaire, chaque fois que l'un de vos personnages est banni, vous pouvez piocher une carte.",
    },
    it: {
      name: "Biagio",
      version: "Elegante Mascalzone",
      text: "Trasformazione 4 RESTARE CALMO Durante il turno di un avversario, ogni volta che uno dei tuoi personaggi viene esiliato, puoi pescare una carta.",
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 22,
  rarity: "common",
  cost: 6,
  strength: 2,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_85f71d1d81a54038b066e3efe226a8f9",
    tcgPlayer: 631366,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "PLAY IT COOL",
      description:
        "During an opponent's turn, whenever one of your characters is banished, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "1x4-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4",
    },
    {
      id: "1x4-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      type: "action",
      text: "PLAY IT COOL During an opponent’s turn, whenever one of your characters is banished, you may draw a card.",
    },
  ],
};
