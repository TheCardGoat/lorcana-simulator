import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyDaredevil: CharacterCard = {
  id: "nb3",
  canonicalId: "ci_nb3",
  reprints: ["set1-111"],
  cardType: "character",
  name: "Goofy",
  version: "Daredevil",
  i18n: {
    en: {
      name: "Goofy",
      version: "Daredevil",
      text: "Evasive",
    },
    de: {
      name: "Goofy",
      version: "Draufgänger",
      text: "Wendig",
    },
    fr: {
      name: "DINGO",
      version: "Tête brulée",
      text: "Insaisissable",
    },
    it: {
      name: "Goofy",
      version: "Daredevil",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "001",
  cardNumber: 111,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_6571a57fd39542b6945b43880bccc254",
    tcgPlayer: 490389,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "cgx-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
