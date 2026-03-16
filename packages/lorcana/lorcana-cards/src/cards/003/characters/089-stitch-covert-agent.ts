import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchCovertAgent: CharacterCard = {
  id: "uqB",
  canonicalId: "ci_uqB",
  reprints: ["set3-089"],
  cardType: "character",
  name: "Stitch",
  version: "Covert Agent",
  i18n: {
    en: {
      name: "Stitch",
      version: "Covert Agent",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "HIDE",
          description: "While this character is at a location, he gains Ward.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Verdeckter Ermittler",
      text: "Wendig VERSTECKEN Solange dieser Charakter an einem Ort ist, erhält er Behütet.",
    },
    fr: {
      name: "Stitch",
      version: "Agent sous couverture",
      text: "Insaisissable CACHÉ Tant que ce personnage se trouve sur un lieu, il gagne Hors d'atteinte",
    },
    it: {
      name: "Stitch",
      version: "Agente in Incognito",
      text: "Sfuggente NASCONDERSI Mentre questo personaggio si trova in un luogo, ottiene Protetto. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "003",
  cardNumber: 89,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a9fd85371b4f4a45bb279981167941d1",
    tcgPlayer: 539083,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "HIDE",
      description: "While this character is at a location, he gains Ward.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Alien"],
  missingTests: true,
  abilities: [
    {
      id: "1c3-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1c3-2",
      text: "HIDE While this character is at a location, he gains Ward.",
      type: "static",
    },
  ],
};
