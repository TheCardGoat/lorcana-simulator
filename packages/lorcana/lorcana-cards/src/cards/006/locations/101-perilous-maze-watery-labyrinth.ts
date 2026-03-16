import type { LocationCard } from "@tcg/lorcana-types";

export const perilousMazeWateryLabyrinth: LocationCard = {
  id: "e5W",
  canonicalId: "ci_e5W",
  reprints: ["set6-101"],
  cardType: "location",
  name: "Perilous Maze",
  version: "Watery Labyrinth",
  i18n: {
    en: {
      name: "Perilous Maze",
      version: "Watery Labyrinth",
      text: [
        {
          title: "LOST IN THE WAVES",
          description:
            "Whenever a character is challenged while here, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Gefährliches Labyrinth",
      version: "Wasserlabyrinth",
      text: [
        {
          title: "VERLOREN IN DEN WELLEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort herausgefordert wird, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Labyrinthe périlleux",
      version: "Dédale aquatique",
      text: [
        {
          title: "PERDUS DANS LES VAGUES",
          description:
            "Chaque fois qu'un personnage sur ce lieu est défié, chaque adversaire défausse une carte de sa main au choix.",
        },
      ],
    },
    it: {
      name: "Labirinto Insidioso",
      version: "Dedalo Acquatico",
      text: [
        {
          title: "PERSI TRA LE ONDE",
          description:
            "Ogni volta che un personaggio viene sfidato mentre si trova in questo luogo, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "006",
  cardNumber: 101,
  rarity: "common",
  cost: 3,
  willpower: 8,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_766de0c1ae8b4e5da1ecd7740eb5feb8",
    tcgPlayer: 592027,
  },
  text: [
    {
      title: "LOST IN THE WAVES",
      description:
        "Whenever a character is challenged while here, each opponent chooses and discards a card.",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        from: "hand",
        target: "EACH_OPPONENT",
        type: "discard",
      },
      id: "1w9-1",
      name: "LOST IN THE WAVES",
      text: "LOST IN THE WAVES Whenever a character is challenged while here, each opponent chooses and discards a card.",
      trigger: {
        event: "challenged",
        on: "CHARACTERS_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
