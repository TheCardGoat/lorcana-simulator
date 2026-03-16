import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanLostBoyLeader: CharacterCard = {
  id: "ous",
  canonicalId: "ci_ous",
  reprints: ["set3-082"],
  cardType: "character",
  name: "Peter Pan",
  version: "Lost Boy Leader",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "Lost Boy Leader",
      text: [
        {
          title: "I CAME TO LISTEN TO THE STORIES",
          description:
            "Once per turn, when this character moves to a location, gain lore equal to that location's {L}.",
        },
      ],
    },
    de: {
      name: "Peter Pan",
      version: "Anführer der verwunschenen Kinder",
      text: [
        {
          title: "ICH WOLLTE DIR SO GERNE ZUHÖREN",
          description:
            "Einmal pro Zug, wenn dieser Charakter zu einem Ort bewegt wird, sammelst du so viele Legenden, wie der -Wert dieses Ortes beträgt.",
        },
      ],
    },
    fr: {
      name: "Peter Pan",
      version: "Chef des enfants perdus",
      text: [
        {
          title: "J'ÉTAIS VENU ÉCOUTER LES HISTOIRES",
          description:
            "Une fois par tour, lorsque ce personnage est déplacé sur un lieu, gagnez un nombre d'éclats de Lore égal à la de ce lieu.",
        },
      ],
    },
    it: {
      name: "Peter Pan",
      version: "Leader dei Bimbi Sperduti",
      text: [
        {
          title: "ASCOLTAVO LE TUE FIABE",
          description:
            "Una volta per turno, quando questo personaggio si sposta in un luogo, ottieni leggenda pari al di quel luogo.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 82,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d4d29339b89f4a0aaeeb42f533e6fbbc",
    tcgPlayer: 531823,
  },
  text: [
    {
      title: "I CAME TO LISTEN TO THE STORIES",
      description:
        "Once per turn, when this character moves to a location, gain lore equal to that location's {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
