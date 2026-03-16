import type { CharacterCard } from "@tcg/lorcana-types";

export const mrSnoopsBetrayedPartner: CharacterCard = {
  id: "2lr",
  canonicalId: "ci_2lr",
  reprints: ["set8-143"],
  cardType: "character",
  name: "Mr. Snoops",
  version: "Betrayed Partner",
  i18n: {
    en: {
      name: "Mr. Snoops",
      version: "Betrayed Partner",
      text: [
        {
          title: "DOUBLE-CROSSING CROOK!",
          description: "During your turn, when this character is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Mr. Snoops",
      version: "Betrogener Partner",
      text: [
        {
          title: "BETRÜGERISCHER GAUNER!",
          description:
            "Wenn dieser Charakter in deinem Zug verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Mr. Snoops",
      version: "Partenaire trahi",
      text: [
        {
          title: "VOUS NE M'ESCROQUEREZ PAS!",
          description:
            "Durant votre tour, lorsque ce personnage est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Signor Snoops",
      version: "Partner Tradito",
      text: [
        {
          title: "BRUTTA LADRONA TRADITRICE",
          description:
            "Durante il tuo turno, quando questo personaggio viene esiliato, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Rescuers",
  set: "008",
  cardNumber: 143,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8010db6668ab482899edbda27487eaae",
    tcgPlayer: 631768,
  },
  text: [
    {
      title: "DOUBLE-CROSSING CROOK!",
      description: "During your turn, when this character is banished, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1iu-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "DOUBLE-CROSSING CROOK!",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "DOUBLE-CROSSING CROOK! During your turn, when this character is banished, you may draw a card.",
    },
  ],
};
