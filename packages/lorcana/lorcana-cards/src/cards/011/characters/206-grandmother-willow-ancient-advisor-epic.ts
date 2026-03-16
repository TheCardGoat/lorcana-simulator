import type { CharacterCard } from "@tcg/lorcana-types";

export const grandmotherWillowAncientAdvisorEpic: CharacterCard = {
  id: "05w",
  canonicalId: "ci_Qej",
  reprints: ["set11-013"],
  cardType: "character",
  name: "Grandmother Willow",
  version: "Ancient Advisor",
  i18n: {
    en: {
      name: "Grandmother Willow",
      version: "Ancient Advisor",
      text: [
        {
          title: "SMOOTH THE WAY",
          description:
            "Once during your turn, you pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Großmutter Weide",
      version: "Uralte Ratgeberin",
      text: [
        {
          title: "DEN WEG EBNEN",
          description:
            "Einmal während deines Zuges zahlst du 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Grand-Mère Feuillage",
      version: "Conseillère ancestrale",
      text: [
        {
          title: "FACILITE LES CHOSES",
          description:
            "Une fois durant votre tour, le prochain personnage que vous jouez ce tour-ci vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Nonna Salice",
      version: "Antica Consigliera",
      text: [
        {
          title: "SPIANARE LA STRADA",
          description:
            "Una volta durante il tuo turno, paga 1 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 206,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_d8dddac12b0749ba9c6510af447895bd",
    tcgPlayer: 677143,
  },
  text: [
    {
      title: "SMOOTH THE WAY",
      description:
        "Once during your turn, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "r79-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "action",
      text: "SMOOTH THE WAY Once during your turn, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
};
