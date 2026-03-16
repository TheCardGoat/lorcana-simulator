import type { CharacterCard } from "@tcg/lorcana-types";

export const plutoFriendlyPooch: CharacterCard = {
  id: "Dl1",
  canonicalId: "ci_jIB",
  reprints: ["set3-018", "set9-021"],
  cardType: "character",
  name: "Pluto",
  version: "Friendly Pooch",
  i18n: {
    en: {
      name: "Pluto",
      version: "Friendly Pooch",
      text: [
        {
          title: "GOOD DOG",
          description: "{E} — You pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Pluto",
      version: "Freundliches Hündchen",
      text: [
        {
          title: "BRAVER JUNGE",
          description:
            "— Du zahlst 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Pluto",
      version: "Gentil cabot",
      text: [
        {
          title: "BON CHIEN",
          description:
            "— Le prochain personnage que vous jouez durant ce tour vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Pluto",
      version: "Cane Amichevole",
      text: [
        {
          title: "BRAVO CAGNOLINO",
          description: "— Paga 1 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "003",
  cardNumber: 18,
  rarity: "uncommon",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_c042279e4692458c906cc27ec66448ab",
    tcgPlayer: 649969,
  },
  text: [
    {
      title: "GOOD DOG",
      description: "{E} — You pay 1 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "16c-1",
      text: "GOOD DOG {E} — You pay 1 {I} less for the next character you play this turn.",
      type: "activated",
    },
  ],
};
