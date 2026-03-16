import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonBaritoneBully: CharacterCard = {
  id: "Rc3",
  canonicalId: "ci_Rc3",
  reprints: ["set2-008"],
  cardType: "character",
  name: "Gaston",
  version: "Baritone Bully",
  i18n: {
    en: {
      name: "Gaston",
      version: "Baritone Bully",
      text: "Singer 5",
    },
    de: {
      name: "Gaston",
      version: "Bariton-Bully",
      text: [
        {
          title: "Singen 5",
          description: "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Gaston",
      version: "Brute et baryton",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.)",
    },
    it: {
      name: "Gaston",
      version: "Baritone Bully",
      text: [
        {
          title: "Singer 5",
          description: "(This character counts as cost 5 to sing songs.)",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 8,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_88ec6886b1a0481c9ab402049d1649e8",
    tcgPlayer: 527713,
  },
  text: "Singer 5",
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      id: "6hk-1",
      keyword: "Singer",
      type: "keyword",
      value: 5,
      text: "Singer 5",
    },
  ],
};
