import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuEmboldenedWarrior: CharacterCard = {
  id: "TMv",
  canonicalId: "ci_rQr",
  reprints: ["set4-124", "set9-118"],
  cardType: "character",
  name: "Sisu",
  version: "Emboldened Warrior",
  i18n: {
    en: {
      name: "Sisu",
      version: "Emboldened Warrior",
      text: [
        {
          title: "SURGE OF POWER",
          description: "This character gets +1 {S} for each card in opponents' hands.",
        },
      ],
    },
    de: {
      name: "Sisu",
      version: "Mutige Kriegerin",
      text: [
        {
          title: "ENERGIEWELLE",
          description:
            "Dieser Charakter erhält +1 für jede Karte auf der Hand aller gegnerischen Mitspielenden.",
        },
      ],
    },
    fr: {
      name: "Sisu",
      version: "Combattante enhardie",
      text: [
        {
          title: "VAGUE DE PUISSANCE",
          description: "Ce personnage gagne +1 par carte dans les mains des adversaires.",
        },
      ],
    },
    it: {
      name: "Sisu",
      version: "Guerriera Rincuorata",
      text: [
        {
          title: "ONDATA DI POTERE",
          description: "Questo personaggio riceve +1 per ogni carta in mano ai tuoi avversari.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 124,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_03cbb7961ddc4db7b724f1a934e1114b",
    tcgPlayer: 650054,
  },
  text: [
    {
      title: "SURGE OF POWER",
      description: "This character gets +1 {S} for each card in opponents' hands.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1df-1",
      text: "SURGE OF POWER This character gets +1 {S} for each card in opponents' hands.",
      type: "static",
    },
  ],
};
