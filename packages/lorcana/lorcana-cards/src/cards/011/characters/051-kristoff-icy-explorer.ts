import type { CharacterCard } from "@tcg/lorcana-types";

export const kristoffIcyExplorer: CharacterCard = {
  id: "rkl",
  canonicalId: "ci_rkl",
  reprints: ["set11-051"],
  cardType: "character",
  name: "Kristoff",
  version: "Icy Explorer",
  i18n: {
    en: {
      name: "Kristoff",
      version: "Icy Explorer",
      text: [
        {
          title: "HIDDEN DEPTHS",
          description:
            "When you play this character, if you have a character named Anna in play, you may put a card from chosen player's discard on the bottom of their deck.",
        },
        {
          title: "STROKE OF LUCK",
          description: "Once during your turn, whenever a card leaves your discard, draw a card.",
        },
      ],
    },
    de: {
      name: "Kristoff",
      version: "Eisiger Entdecker",
      text: [
        {
          title: "VERBORGENE TIEFEN",
          description:
            "Wenn du diesen Charakter ausspielst und einen Anna-Charakter im Spiel hast, darfst du 1 Karte aus einem Ablagestapel deiner Wahl unter das zugehörige Deck legen.",
        },
        {
          title: "GLÜCKSTREFFER",
          description:
            "Einmal während deines Zuges, wenn eine Karte deinen Ablagestapel verlässt, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Kristoff",
      version: "Explorateur des glaces",
      text: [
        {
          title: "PROFONDEURS CACHÉES",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Anna en jeu, vous pouvez choisir un joueur et placer une carte de sa défausse sous sa pioche.",
        },
        {
          title: "COUP DE CHANCE",
          description:
            "Une fois durant votre tour, lorsqu'une carte quitte votre défausse, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Kristoff",
      version: "Esploratore dei Ghiacci",
      text: [
        {
          title: "PROFONDITÀ NASCOSTE",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Anna, puoi mettere una carta dagli scarti di un giocatore a tua scelta in fondo al suo mazzo.",
        },
        {
          title: "COLPO DI FORTUNA",
          description:
            "Una volta durante il tuo turno, ogni volta che una carta lascia i tuoi scarti, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 51,
  rarity: "rare",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_094f62fcb6094af1922921881eddf3f6",
    tcgPlayer: 675381,
  },
  text: [
    {
      title: "HIDDEN DEPTHS",
      description:
        "When you play this character, if you have a character named Anna in play, you may put a card from chosen player's discard on the bottom of their deck.",
    },
    {
      title: "STROKE OF LUCK",
      description: "Once during your turn, whenever a card leaves your discard, draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "ryn-1",
      effect: {
        condition: {
          expression: "you have a character named Anna in play",
          type: "if",
        },
        then: {
          target: {
            cardTypes: ["card"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      name: "HIDDEN DEPTHS",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "HIDDEN DEPTHS When you play this character, if you have a character named Anna in play, you may put a card from chosen player’s discard on the bottom of their deck.",
    },
    {
      id: "ryn-2",
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "STROKE OF LUCK Once",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "STROKE OF LUCK Once during your turn, whenever a card leaves your discard, draw a card.",
    },
  ],
};
