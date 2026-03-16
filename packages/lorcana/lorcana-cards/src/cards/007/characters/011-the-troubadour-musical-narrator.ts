import type { CharacterCard } from "@tcg/lorcana-types";

export const theTroubadourMusicalNarrator: CharacterCard = {
  id: "k1P",
  canonicalId: "ci_k1P",
  reprints: ["set7-011"],
  cardType: "character",
  name: "The Troubadour",
  version: "Musical Narrator",
  i18n: {
    en: {
      name: "The Troubadour",
      version: "Musical Narrator",
      text: [
        {
          title: "Resist +1",
        },
        {
          title: "Singer 4",
        },
      ],
    },
    de: {
      name: "Der Troubadour",
      version: "Musikalischer Erzähler",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) Singen 4 (Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
    },
    fr: {
      name: "Le Troubadour",
      version: "Narrateur-musicien",
      text: "Résistance +1 Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
    },
    it: {
      name: "Il Trovatore",
      version: "Narratore Musicante",
      text: "Resistere +1 Melodioso 4",
    },
  },
  inkType: ["amber", "steel"],
  set: "007",
  cardNumber: 11,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7f80a94bb56149dea86cbcf92b7eff6f",
    tcgPlayer: 618128,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "Singer 4",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1is-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
    {
      id: "1is-2",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
};
