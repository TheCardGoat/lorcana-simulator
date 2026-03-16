import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimTinyAdversary: CharacterCard = {
  id: "SKE",
  canonicalId: "ci_SKE",
  reprints: ["set6-037"],
  cardType: "character",
  name: "Madam Mim",
  version: "Tiny Adversary",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Tiny Adversary",
      text: [
        {
          title: "Challenger +1",
        },
        {
          title: "ZIM ZABBERIM ZIM",
          description: "Your other characters gain Challenger +1.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Winzige Widersacherin",
      text: "Herausfordern +1 SIMSALARIMBIM Deine anderen Charaktere erhalten Herausfordern +1.",
    },
    fr: {
      name: "Madame Mime",
      version: "Minuscule adversaire",
      text: "Offensif +1 ZIM ZABBERIM BIM Vos autres personnages gagnent Offensif +1.",
    },
    it: {
      name: "Maga Magò",
      version: "Minuscola Avversaria",
      text: "Sfidante +1 ZUM PARAPIM PIM I tuoi altri personaggi ottengono Sfidante +1.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "006",
  cardNumber: 37,
  rarity: "rare",
  cost: 2,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cb73a29ef0e94fdb80188902527c5d86",
    tcgPlayer: 593023,
  },
  text: [
    {
      title: "Challenger +1",
    },
    {
      title: "ZIM ZABBERIM ZIM",
      description: "Your other characters gain Challenger +1.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "jgv-1",
      keyword: "Challenger",
      text: "Challenger +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        keyword: "Challenger",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "jgv-2",
      name: "ZIM ZABBERIM ZIM Your other",
      text: "ZIM ZABBERIM ZIM Your other characters gain Challenger +1.",
      type: "static",
    },
  ],
};
