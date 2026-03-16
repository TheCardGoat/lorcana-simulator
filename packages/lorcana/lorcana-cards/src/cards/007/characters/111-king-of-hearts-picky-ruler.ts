import type { CharacterCard } from "@tcg/lorcana-types";

export const kingOfHeartsPickyRuler: CharacterCard = {
  id: "LEE",
  canonicalId: "ci_LEE",
  reprints: ["set7-111"],
  cardType: "character",
  name: "King of Hearts",
  version: "Picky Ruler",
  i18n: {
    en: {
      name: "King of Hearts",
      version: "Picky Ruler",
      text: [
        {
          title: "OBJECTIONABLE STATE",
          description: "Damaged characters can't challenge your characters.",
        },
      ],
    },
    de: {
      name: "Herzkönig",
      version: "Wählerischer Herrscher",
      text: [
        {
          title: "UNZULÄSSIGER ZUSTAND",
          description: "Beschädigte Charaktere können deine Charaktere nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Le Roi de Cœur",
      version: "Monarque pointilleux",
      text: [
        {
          title: "DANS UN ÉTAT INACCEPTABLE",
          description:
            "Les personnages avec au moins un dommage ne peuvent pas défier vos personnages.",
        },
      ],
    },
    it: {
      name: "Re di Cuori",
      version: "Monarca Schizzinoso",
      text: [
        {
          title: "IN UNO STATO DEPLOREVOLE I",
          description: "personaggi danneggiati non possono sfidare i tuoi personaggi.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 111,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f20054bb326b460c8ac1dc08f2723ce3",
    tcgPlayer: 618705,
  },
  text: [
    {
      title: "OBJECTIONABLE STATE",
      description: "Damaged characters can't challenge your characters.",
    },
  ],
  classifications: ["Storyborn", "Ally", "King"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "om1-1",
      text: "OBJECTIONABLE STATE Damaged characters can't challenge your characters.",
      type: "action",
    },
  ],
};
