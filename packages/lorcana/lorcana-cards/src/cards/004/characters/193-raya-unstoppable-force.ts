import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaUnstoppableForce: CharacterCard = {
  id: "u57",
  canonicalId: "ci_u57",
  reprints: ["set4-193"],
  cardType: "character",
  name: "Raya",
  version: "Unstoppable Force",
  i18n: {
    en: {
      name: "Raya",
      version: "Unstoppable Force",
      text: [
        {
          title: "Challenger +2",
        },
        {
          title: "Resist +2",
        },
        {
          title: "YOU GAVE IT YOUR BEST",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Unaufhaltsame Kraft",
      text: "Herausfordern +2 Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.) DU HAST DEIN BESTES GETAN Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Raya",
      version: "Force inarrêtable",
      text: "Offensif +2 Résistance +2 L'IMPORTANT, C'EST D'ESSAYER Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, vous pouvez piocher une carte.",
    },
    it: {
      name: "Raya",
      version: "Forza Inarrestabile",
      text: "Sfidante +2 Resistere +2 HAI FATTO DEL TUO MEGLIO Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi pescare una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 193,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_498044d6e5da4eb3868df6a6d0c058d4",
    tcgPlayer: 550621,
  },
  text: [
    {
      title: "Challenger +2",
    },
    {
      title: "Resist +2",
    },
    {
      title: "YOU GAVE IT YOUR BEST",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "jk9-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
    {
      id: "jk9-2",
      keyword: "Resist",
      type: "keyword",
      value: 2,
      text: "Resist +2",
    },
    {
      id: "jk9-3",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "YOU GAVE IT YOUR BEST",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
      text: "YOU GAVE IT YOUR BEST During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
};
