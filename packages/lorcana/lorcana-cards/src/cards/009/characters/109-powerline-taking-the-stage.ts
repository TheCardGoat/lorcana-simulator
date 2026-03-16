import type { CharacterCard } from "@tcg/lorcana-types";

export const powerlineTakingTheStage: CharacterCard = {
  id: "aRw",
  canonicalId: "ci_aRw",
  reprints: ["set9-109"],
  cardType: "character",
  name: "Powerline",
  version: "Taking the Stage",
  i18n: {
    en: {
      name: "Powerline",
      version: "Taking the Stage",
      text: "Singer 4",
    },
    de: {
      name: "Powerline",
      version: "Auf der Bühne",
      text: [
        {
          title: "Singen 4",
          description: "(Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Powerline",
      version: "Montant sur scène",
      text: "Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
    },
    it: {
      name: "Powerline",
      version: "Sul Palco",
      text: "Melodioso 4",
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 109,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7d7835f351084d94aa5f108f373a1de2",
    tcgPlayer: 647682,
  },
  text: "Singer 4",
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "1t6-1",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
};
