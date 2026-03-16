import type { CharacterCard } from "@tcg/lorcana-types";

export const peteBadGuyEnchanted: CharacterCard = {
  id: "sz4",
  canonicalId: "ci_rio",
  reprints: ["set2-088"],
  cardType: "character",
  name: "Pete",
  version: "Bad Guy",
  i18n: {
    en: {
      name: "Pete",
      version: "Bad Guy",
      text: [
        {
          title: "Ward",
        },
        {
          title: "TAKE THAT!",
          description: "Whenever you play an action, this character gets +2 {S} this turn.",
        },
        {
          title: "WHO'S NEXT?",
          description: "While this character has 7 {S} or more, he gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Bösewicht",
      text: "Behütet NIMM DAS! Jedes Mal, wenn du eine Aktion ausspielst, erhält dieser Charakter in diesem Zug +2. WER IST ALS NÄCHSTER DRAN? Solange dieser Charakter 7 oder mehr hat, erhält er +2.",
    },
    fr: {
      name: "Pat",
      version: "Mauvais garçon",
      text: "Hors d'atteinte PRENDS ÇA! Chaque fois que vous jouez une action, ce personnage gagne +2 pour le reste de ce tour. À QUI LE TOUR? Tant que ce personnage a au moins 7, il gagne +2.",
    },
    it: {
      name: "Pete",
      version: "Bad Guy",
      text: [
        {
          title: "Ward",
          description:
            "(Opponents can't choose this character except to challenge.) TAKE THAT! Whenever you play an action, this character gets +2 this turn. WHO'S NEXT? While this character has 7 or more, he gets +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "002",
  cardNumber: 209,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_67714955a33e4508913f44b8ccb08e5c",
    tcgPlayer: 528108,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "TAKE THAT!",
      description: "Whenever you play an action, this character gets +2 {S} this turn.",
    },
    {
      title: "WHO'S NEXT?",
      description: "While this character has 7 {S} or more, he gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      id: "kek-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "kek-2",
      name: "TAKE THAT!",
      text: "TAKE THAT! Whenever you play an action, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "kek-3",
      text: "WHO'S NEXT? While this character has 7 {S} or more, he gets +2 {L}.",
      type: "static",
    },
  ],
};
