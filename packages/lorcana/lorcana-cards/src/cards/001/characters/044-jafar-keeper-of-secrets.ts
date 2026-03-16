import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarKeeperOfSecrets: CharacterCard = {
  id: "vm4",
  canonicalId: "ci_2bv",
  reprints: ["set1-044", "set9-038"],
  cardType: "character",
  name: "Jafar",
  version: "Keeper of Secrets",
  i18n: {
    en: {
      name: "Jafar",
      version: "Keeper of Secrets",
      text: [
        {
          title: "HIDDEN WONDERS",
          description: "This character gets +1 {S} for each card in your hand.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Hüter der Geheimnisse",
      text: [
        {
          title: "VERSTECKTE WUNDER",
          description: "Dieser Charakter erhält +1 für jede Karte auf deiner Hand.",
        },
      ],
    },
    fr: {
      name: "JAFAR",
      version: "Gardien des Secrets",
      text: [
        {
          title: "MERVEILLES CACHÉES",
          description: "La de ce personnage augmente de 1 par carte dans votre main.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Custode dei Segreti",
      text: [
        {
          title: "MERAVIGLIE NASCOSTE",
          description: "Questo personaggio riceve +1 per ogni carta nella tua mano.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 44,
  rarity: "rare",
  cost: 4,
  strength: 0,
  willpower: 5,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_2f69538767394390bc91d25fd5948a5b",
    tcgPlayer: 649985,
  },
  text: [
    {
      title: "HIDDEN WONDERS",
      description: "This character gets +1 {S} for each card in your hand.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1u7-1",
      text: "HIDDEN WONDERS This character gets +1 {S} for each card in your hand.",
      type: "static",
    },
  ],
};
