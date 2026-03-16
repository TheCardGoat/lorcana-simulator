import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaBallroomSensationEnchanted: CharacterCard = {
  id: "hzv",
  canonicalId: "ci_Djx",
  reprints: ["set2-003"],
  cardType: "character",
  name: "Cinderella",
  version: "Ballroom Sensation",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Ballroom Sensation",
      text: "Singer 3",
    },
    de: {
      name: "Cinderella",
      version: "Sensation im Ballsaal",
      text: [
        {
          title: "Singen 3",
          description: "(Die Kosten dieses Charakters gelten als 3 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Cendrillon",
      version: "Fait sensation au bal",
      text: "Mélomane 3 (Ce personnage est considéré comme ayant un coût de 3 pour chanter des chansons.)",
    },
    it: {
      name: "Cinderella",
      version: "Ballroom Sensation",
      text: [
        {
          title: "Singer 3",
          description: "(This character counts as cost 3 to sing songs.)",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 205,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4cf391db31ba468f948bad5a20b0bc16",
    tcgPlayer: 527802,
  },
  text: "Singer 3",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "4j3-1",
      keyword: "Singer",
      type: "keyword",
      value: 3,
      text: "Singer 3",
    },
  ],
};
