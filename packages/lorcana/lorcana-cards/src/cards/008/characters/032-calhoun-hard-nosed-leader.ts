import type { CharacterCard } from "@tcg/lorcana-types";

export const calhounHardnosedLeader: CharacterCard = {
  id: "g8l",
  canonicalId: "ci_g8l",
  reprints: ["set8-032"],
  cardType: "character",
  name: "Calhoun",
  version: "Hard-Nosed Leader",
  i18n: {
    en: {
      name: "Calhoun",
      version: "Hard-Nosed Leader",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "LOOT DROP",
          description: "When this character is banished, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Sergeant Calhoun",
      version: "Knallharte Anführerin",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) BEUTEABWURF Wenn dieser Charakter verbannt wird, sammelst du 1 Legende.",
    },
    fr: {
      name: "Calhoun",
      version: "Meneuse intraitable",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) APPARITION DE BUTIN Lorsque ce personnage est banni, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Calhoun",
      version: "Leader Inflessibile",
      text: "Guardiano BOTTINO DI GIOCO Quando questo personaggio viene esiliato, ottieni 1 leggenda.",
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 32,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6fe60149cee34a1e8c979d598251e279",
    tcgPlayer: 631372,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "LOOT DROP",
      description: "When this character is banished, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "eco-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "eco-2",
      name: "LOOT DROP",
      text: "LOOT DROP When this character is banished, gain 1 lore.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
