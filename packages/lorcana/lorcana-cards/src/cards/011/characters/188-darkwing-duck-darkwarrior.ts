import type { CharacterCard } from "@tcg/lorcana-types";

export const darkwingDuckDarkwarrior: CharacterCard = {
  id: "8XU",
  canonicalId: "ci_8XU",
  reprints: ["set11-188"],
  cardType: "character",
  name: "Darkwing Duck",
  version: "Darkwarrior",
  i18n: {
    en: {
      name: "Darkwing Duck",
      version: "Darkwarrior",
      text: [
        {
          title: "Challenger +2",
        },
        {
          title: "INSTA-ARMOR",
          description:
            "During your turn, whenever an item is banished, this character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Darkwing Duck",
      version: "Darkwarrior",
      text: "Herausfordern +2 SOFORT-RÜSTUNG Jedes Mal während deines Zuges, wenn ein Gegenstand verbannt wird, erhält dieser Charakter bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Myster Mask",
      version: "Canard Vador",
      text: "Offensif +2 INSTA-ARMURE Durant votre tour, chaque fois qu'un objet est banni, ce personnage gagne Résistance +1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Darkwing Duck",
      version: "Darkwarrior",
      text: "Sfidante +2 ARMATURA ISTANTANEA Durante il tuo turno, ogni volta che un oggetto viene esiliato, questo personaggio ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 188,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a74daac05bd643ce8913eec4fcbf2bdc",
    tcgPlayer: 676242,
  },
  text: [
    {
      title: "Challenger +2",
    },
    {
      title: "INSTA-ARMOR",
      description:
        "During your turn, whenever an item is banished, this character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Super", "Detective"],
  abilities: [
    {
      id: "l0p-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
    {
      id: "l0p-2",
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      name: "INSTA-ARMOR",
      trigger: {
        event: "banish",
        on: "YOUR_ITEMS",
        timing: "whenever",
      },
      type: "triggered",
      text: "INSTA-ARMOR During your turn, whenever an item is banished, this character gains Resist +1 until the start of your next turn.",
    },
  ],
};
