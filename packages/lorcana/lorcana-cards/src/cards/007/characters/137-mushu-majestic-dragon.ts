import type { CharacterCard } from "@tcg/lorcana-types";

export const mushuMajesticDragon: CharacterCard = {
  id: "8nj",
  canonicalId: "ci_8nj",
  reprints: ["set7-137"],
  cardType: "character",
  name: "Mushu",
  version: "Majestic Dragon",
  i18n: {
    en: {
      name: "Mushu",
      version: "Majestic Dragon",
      text: [
        {
          title: "INTIMIDATING AND AWE-INSPIRING",
          description:
            "Whenever one of your characters challenges, they gain Resist +2 during that challenge.",
        },
        {
          title: "GUARDIAN OF LOST SOULS",
          description:
            "During your turn, whenever one of your characters banishes another character in a challenge, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Mushu",
      version: "Majestätischer Drache",
      text: [
        {
          title: "FURCHTEINFLÖSSEND UND ANBETUNGSWÜRDIG",
          description:
            "Jedes Mal, wenn einer deiner Charaktere herausfordert, erhält er während der Herausforderung Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
        },
        {
          title: "BESCHÜTZER DER VERLORENEN SEELEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Mushu",
      version: "Dragon majestueux",
      text: [
        {
          title: "INTIMIDANT ET EFFRAYANT",
          description:
            "Chaque fois que l'un de vos personnages défie, il gagne Résistance +2 durant ce défi.",
        },
        {
          title: "GARDIEN DES ÂMES PERDUES",
          description:
            "Durant votre tour, chaque fois que l'un de vos personnages en bannit un autre via un défi, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Mushu",
      version: "Maestoso Drago",
      text: [
        {
          title: "INTIMIDATORIO E IMPONENTE",
          description:
            "Ogni volta che uno dei tuoi personaggi sfida, ottiene Resistere +2 durante quella sfida.",
        },
        {
          title: "GUARDIANO DELLE ANIME PERDUTE",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi personaggi esilia un altro personaggio in una sfida, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Mulan",
  set: "007",
  cardNumber: 137,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5c58452a39084f28b379fdd1133ffdea",
    tcgPlayer: 619482,
  },
  text: [
    {
      title: "INTIMIDATING AND AWE-INSPIRING",
      description:
        "Whenever one of your characters challenges, they gain Resist +2 during that challenge.",
    },
    {
      title: "GUARDIAN OF LOST SOULS",
      description:
        "During your turn, whenever one of your characters banishes another character in a challenge, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Dragon"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 2,
      },
      id: "bra-1",
      name: "INTIMIDATING AND AWE-INSPIRING",
      text: "INTIMIDATING AND AWE-INSPIRING Whenever one of your characters challenges, they gain Resist +2 during that challenge.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "bra-2",
      name: "GUARDIAN OF LOST SOULS",
      text: "GUARDIAN OF LOST SOULS During your turn, whenever one of your characters banishes another character in a challenge, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
