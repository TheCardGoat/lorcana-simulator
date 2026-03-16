import type { CharacterCard } from "@tcg/lorcana-types";

export const rafikiEtherealGuideEnchanted: CharacterCard = {
  id: "mMK",
  canonicalId: "ci_ts7",
  reprints: ["set6-052"],
  cardType: "character",
  name: "Rafiki",
  version: "Ethereal Guide",
  i18n: {
    en: {
      name: "Rafiki",
      version: "Ethereal Guide",
      text: [
        {
          title: "Shift 7",
        },
        {
          title: "ASTRAL ATTUNEMENT",
          description:
            "During your turn, whenever a card is put into your inkwell, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Rafiki",
      version: "Geistiger Ratgeber",
      text: "Gestaltwandel 7 ASTRALE EINSTIMMUNG Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Rafiki",
      version: "Guide éthéré",
      text: "Alter 7 HARMONISATION ASTRALE Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez piocher une carte.",
    },
    it: {
      name: "Rafiki",
      version: "Guida Eterea",
      text: "Trasformazione 7 SINTONIZZAZIONE ASTRALE Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi pescare una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "006",
  cardNumber: 208,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 9,
  strength: 6,
  willpower: 6,
  lore: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_d5432572fd3d4dfc95b01b682c71943c",
    tcgPlayer: 592032,
  },
  text: [
    {
      title: "Shift 7",
    },
    {
      title: "ASTRAL ATTUNEMENT",
      description:
        "During your turn, whenever a card is put into your inkwell, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "yg2-1",
      cost: {
        ink: 7,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 7",
    },
    {
      id: "yg2-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "ASTRAL ATTUNEMENT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "ASTRAL ATTUNEMENT During your turn, whenever a card is put into your inkwell, you may draw a card.",
    },
  ],
};
