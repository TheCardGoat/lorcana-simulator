import type { CharacterCard } from "@tcg/lorcana-types";

export const teKHeartless: CharacterCard = {
  id: "KcY",
  canonicalId: "ci_KcY",
  reprints: ["set1-192"],
  cardType: "character",
  name: "Te Kā",
  version: "Heartless",
  i18n: {
    en: {
      name: "Te Kā",
      version: "Heartless",
      text: [
        {
          title: "SEEK THE HEART",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Te Kā",
      version: "Herzlos",
      text: [
        {
          title: "SUCHE DAS HERZ",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "TE KĀ",
      version: "Sans cœur",
      text: [
        {
          title: "CHERCHE LE CŒUR",
          description:
            "Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Te Kā",
      version: "Heartless",
      text: [
        {
          title: "SEEK THE HEART",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you gain 2 lore.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "001",
  cardNumber: 192,
  rarity: "legendary",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_5fa3eadb1c984d63b845035c1e227af9",
    tcgPlayer: 508954,
  },
  text: [
    {
      title: "SEEK THE HEART",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "bmj-1",
      name: "SEEK THE HEART",
      text: "SEEK THE HEART During your turn, whenever this character banishes another character in a challenge, you gain 2 lore.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
