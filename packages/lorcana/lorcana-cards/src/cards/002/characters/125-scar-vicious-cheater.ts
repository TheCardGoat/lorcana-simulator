import type { CharacterCard } from "@tcg/lorcana-types";

export const scarViciousCheater: CharacterCard = {
  id: "U8O",
  canonicalId: "ci_U8O",
  reprints: ["set2-125"],
  cardType: "character",
  name: "Scar",
  version: "Vicious Cheater",
  i18n: {
    en: {
      name: "Scar",
      version: "Vicious Cheater",
      text: [
        {
          title: "Rush",
        },
        {
          title: "DADDY ISN'T HERE TO SAVE YOU",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Übler Betrüger",
      text: "Rasant PAPI KANN DICH DIESMAL NICHT RETTEN Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du ihn bereit machen. Er kann in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Scar",
      version: "Tricheur vicieux",
      text: "Charge PAPA N'EST PAS LÀ POUR TE SAUVER Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous pouvez le redresser. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Scar",
      version: "Vicious Cheater",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) DADDY ISN'T HERE TO SAVE YOU During your turn, whenever this character banishes another character in a challenge, you may ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "002",
  cardNumber: 125,
  rarity: "legendary",
  cost: 7,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_02f5f28e11b84721906692f042d0baee",
    tcgPlayer: 523760,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "DADDY ISN'T HERE TO SAVE YOU",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1re-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "optional",
            chooser: "CONTROLLER",
            effect: {
              target: "SELF",
              type: "ready",
            },
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
      },
      id: "1re-2",
      name: "DADDY ISN'T HERE TO SAVE YOU",
      text: "DADDY ISN'T HERE TO SAVE YOU During your turn, whenever this character banishes another character in a challenge, you may ready this character. He can't quest for the rest of this turn.",
      trigger: {
        event: "banish-in-challenge",
        on: "SELF",
        timing: "whenever",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
      },
      type: "triggered",
    },
  ],
};
