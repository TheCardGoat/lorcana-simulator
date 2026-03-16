import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsLosingHerTemper: CharacterCard = {
  id: "Fnw",
  canonicalId: "ci_Fnw",
  reprints: ["set7-122"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Losing Her Temper",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Losing Her Temper",
      text: [
        {
          title: "ROYAL PAIN",
          description: "While this character has damage, she gets +3 {S}.",
        },
      ],
    },
    de: {
      name: "Die Herzkönigin",
      version: "Fassungslos",
      text: [
        {
          title: "KÖNIGLICHER SCHMERZ",
          description: "Solange dieser Charakter beschädigt ist, erhält er +3.",
        },
      ],
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Perd son sang-froid",
      text: [
        {
          title: "DOULEUR ROYALE",
          description: "Tant que ce personnage a au moins un dommage, il gagne +3.",
        },
      ],
    },
    it: {
      name: "La Regina di Cuori",
      version: "Che Perde le Staffe",
      text: [
        {
          title: "REGALE SPINA NEL FIANCO",
          description: "Mentre questo personaggio ha danno, riceve +3.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 122,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8e76340248ad450587db93be8aeeb437",
    tcgPlayer: 619473,
  },
  text: [
    {
      title: "ROYAL PAIN",
      description: "While this character has damage, she gets +3 {S}.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen"],
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "123-1",
      text: "ROYAL PAIN While this character has damage, she gets +3 {S}.",
      type: "static",
    },
  ],
};
