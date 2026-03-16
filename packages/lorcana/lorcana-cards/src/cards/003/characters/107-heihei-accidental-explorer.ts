import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiAccidentalExplorer: CharacterCard = {
  id: "93O",
  canonicalId: "ci_93O",
  reprints: ["set3-107"],
  cardType: "character",
  name: "HeiHei",
  version: "Accidental Explorer",
  i18n: {
    en: {
      name: "HeiHei",
      version: "Accidental Explorer",
      text: [
        {
          title: "MINDLESS WANDERING",
          description:
            "Once per turn, when this character moves to a location, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "HeiHei",
      version: "Ungewollter Entdecker",
      text: [
        {
          title: "GEDANKENLOSES UMHERSCHWEIFEN",
          description:
            "Einmal pro Zug, wenn dieser Charakter zu einem Ort bewegt wird, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Heihei",
      version: "Explorateur accidentel",
      text: [
        {
          title: "ERRANCE INSOUCIANTE",
          description:
            "Une fois par tour, lorsque ce personnage est déplacé sur un lieu, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "HeiHei",
      version: "Esploratore per Caso",
      text: [
        {
          title: "VAGARE INSENSATO",
          description:
            "Una volta per turno, quando questo personaggio si sposta in un luogo, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 107,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_27a77344b85748bd9d7d45de2969c918",
    tcgPlayer: 538342,
  },
  text: [
    {
      title: "MINDLESS WANDERING",
      description:
        "Once per turn, when this character moves to a location, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "j8v-1",
      name: "MINDLESS WANDERING",
      text: "MINDLESS WANDERING Once per turn, when this character moves to a location, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
