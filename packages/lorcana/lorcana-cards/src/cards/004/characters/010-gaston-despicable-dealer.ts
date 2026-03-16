import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonDespicableDealer: CharacterCard = {
  id: "a3C",
  canonicalId: "ci_a3C",
  reprints: ["set4-010"],
  cardType: "character",
  name: "Gaston",
  version: "Despicable Dealer",
  i18n: {
    en: {
      name: "Gaston",
      version: "Despicable Dealer",
      text: [
        {
          title: "DUBIOUS RECRUITMENT",
          description: "{E} — You pay 2 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Gaston",
      version: "Verruchter Händler",
      text: [
        {
          title: "ZWEIFELHAFTE REKRUTIERUNG",
          description:
            "— Du zahlst 2 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Gaston",
      version: "Odieux comploteur",
      text: [
        {
          title: "RECRUTEMENT DOUTEUX",
          description: "— Le prochain personnage que vous jouez durant ce tour coûte 2 de moins.",
        },
      ],
    },
    it: {
      name: "Gaston",
      version: "Spregevole Trafficante",
      text: [
        {
          title: "RECLUTAMENTO SOSPETTO",
          description: "— Paga 2 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 10,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_17b54146ce0942e29c41fd91356c1940",
    tcgPlayer: 550557,
  },
  text: [
    {
      title: "DUBIOUS RECRUITMENT",
      description: "{E} — You pay 2 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "9k7-1",
      text: "DUBIOUS RECRUITMENT {E} — You pay 2 {I} less for the next character you play this turn.",
      type: "activated",
    },
  ],
};
