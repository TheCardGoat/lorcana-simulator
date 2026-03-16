import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckRubyChampion: CharacterCard = {
  id: "Yk1",
  canonicalId: "ci_Yk1",
  reprints: ["set10-121"],
  cardType: "character",
  name: "Donald Duck",
  version: "Ruby Champion",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Ruby Champion",
      text: [
        {
          title: "HIGH ENERGY",
          description: "Your other Ruby characters get +1 {S}.",
        },
        {
          title: "POWERFUL REWARD",
          description: "Your other Ruby characters with 7 {S} or more get +1 {L}.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Rubin-Champion",
      text: [
        {
          title: "VIEL ENERGIE",
          description: "Deine anderen Rubin-Charaktere erhalten +1.",
        },
        {
          title: "MÄCHTIGE BELOHNUNG",
          description: "Deine anderen Rubin-Charaktere mit 7 oder mehr erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Champion Rubis",
      text: [
        {
          title: "PLEIN D'ÉNERGIE",
          description: "Vos autres personnages Rubis gagnent +1.",
        },
        {
          title: "PUISSANTE RÉCOMPENSE",
          description: "Vos autres personnages Rubis ayant 7 ou plus gagnent +1.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Campione di Rubino",
      text: [
        {
          title: "SUPER ENERGIA I",
          description: "tuoi altri personaggi Rubino ricevono +1.",
        },
        {
          title: "RICOMPENSA POTENTE I",
          description: "tuoi altri personaggi Rubino con 7 o superiore ricevono +1.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "010",
  cardNumber: 121,
  rarity: "rare",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a9118586fa7c492bbe23ad34b60dcc57",
    tcgPlayer: 659629,
  },
  text: [
    {
      title: "HIGH ENERGY",
      description: "Your other Ruby characters get +1 {S}.",
    },
    {
      title: "POWERFUL REWARD",
      description: "Your other Ruby characters with 7 {S} or more get +1 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "10w-1",
      name: "HIGH ENERGY Your other Ruby",
      text: "HIGH ENERGY Your other Ruby characters get +1 {S}.",
      type: "static",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "10w-2",
      text: "POWERFUL REWARD Your other Ruby characters with 7 {S} or more get +1 {L}.",
      type: "action",
    },
  ],
};
