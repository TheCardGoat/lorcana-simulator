import type { CharacterCard } from "@tcg/lorcana-types";

export const chifuImperialAdvisor: CharacterCard = {
  id: "XGm",
  canonicalId: "ci_XGm",
  reprints: ["set4-177"],
  cardType: "character",
  name: "Chi-Fu",
  version: "Imperial Advisor",
  i18n: {
    en: {
      name: "Chi-Fu",
      version: "Imperial Advisor",
      text: [
        {
          title: "OVERLY CAUTIOUS",
          description: "While this character has no damage, he gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Chi-Fu",
      version: "Berater des Kaisers",
      text: [
        {
          title: "ÜBERVORSICHTIG",
          description: "Solange dieser Charakter unbeschädigt ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Chi Fu",
      version: "Conseiller Impérial",
      text: [
        {
          title: "EXCESSIVEMENT PRUDENT",
          description: "Tant que ce personnage n'a aucun jeton Dommage sur lui, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Chi Fu",
      version: "Consigliere Imperiale",
      text: [
        {
          title: "ESTREMAMENTE CAUTO",
          description: "Mentre questo personaggio non ha danno, riceve +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 177,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6d38ee3cce1e48ae9a8e945734ab950f",
    tcgPlayer: 548193,
  },
  text: [
    {
      title: "OVERLY CAUTIOUS",
      description: "While this character has no damage, he gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "m5z-1",
      text: "OVERLY CAUTIOUS While this character has no damage, he gets +2 {L}.",
      type: "static",
    },
  ],
};
