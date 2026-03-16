import type { CharacterCard } from "@tcg/lorcana-types";

export const kenaiMagicalBear: CharacterCard = {
  id: "7zp",
  canonicalId: "ci_7zp",
  reprints: ["set7-070"],
  cardType: "character",
  name: "Kenai",
  version: "Magical Bear",
  i18n: {
    en: {
      name: "Kenai",
      version: "Magical Bear",
      text: [
        {
          title: "Challenger +2",
        },
        {
          title: "WISDOM OF HIS STORY",
          description:
            "During your turn, when this character is banished in a challenge, return this card to your hand and gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Kenai",
      version: "Magischer Bär",
      text: "Herausfordern +2 DIE WEISHEIT SEINER GESCHICHTE Wenn dieser Charakter in deinem Zug durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand und sammle 1 Legende.",
    },
    fr: {
      name: "Kinaï",
      version: "Ours magique",
      text: "Offensif +2 LA SAGESSE DE CETTE HISTOIRE Durant votre tour, lorsque ce personnage est banni via un défi, renvoyez-le dans votre main et gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Kenai",
      version: "Orso Magico",
      text: "Sfidante +2 LA SAGGEZZA DELLA SUA STORIA Durante il tuo turno, quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta e ottieni 1 leggenda.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Brother Bear",
  set: "007",
  cardNumber: 70,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b9ef052585ff4d9db2b101a61b3b9486",
    tcgPlayer: 618326,
  },
  text: [
    {
      title: "Challenger +2",
    },
    {
      title: "WISDOM OF HIS STORY",
      description:
        "During your turn, when this character is banished in a challenge, return this card to your hand and gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "wwk-1",
      keyword: "Challenger",
      text: "Challenger +2",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        steps: [
          {
            target: "SELF",
            type: "return-to-hand",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "wwk-2",
      name: "WISDOM OF HIS STORY",
      text: "WISDOM OF HIS STORY During your turn, when this character is banished in a challenge, return this card to your hand and gain 1 lore.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
