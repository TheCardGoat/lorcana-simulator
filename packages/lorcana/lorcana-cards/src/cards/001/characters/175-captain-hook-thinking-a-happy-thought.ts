import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookThinkingAHappyThought: CharacterCard = {
  id: "3Ri",
  canonicalId: "ci_3Ri",
  reprints: ["set1-175"],
  cardType: "character",
  name: "Captain Hook",
  version: "Thinking a Happy Thought",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Thinking a Happy Thought",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Challenger +3",
        },
        {
          title: "STOLEN DUST",
          description: "Characters with cost 3 or less can't challenge this character.",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "Ein feiner Gedanke",
      text: "Gestaltwandel 3 Herausfordern +3 GESTOHLENER GLANZ Charaktere, die 3 oder weniger kosten, können diesen Charakter nicht herausfordern.",
    },
    fr: {
      name: "CAPITAINE CROCHET",
      version: "Rêve d'aventure",
      text: "Alter 3 Offensif +3 POUSSIÈRE VOLÉE Les personnages coûtant 3 ou moins ne peuvent pas défier ce personnage.",
    },
    it: {
      name: "Captain Hook",
      version: "Thinking a Happy Thought",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Captain Hook.) Challenger +3 (While challenging, this character gets +3.) STOLEN DUST Characters with cost 3 or less can't challenge this character.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 175,
  rarity: "rare",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_217eb0feed8b46fea1b5dc6c0b2b9e12",
    tcgPlayer: 507505,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Challenger +3",
    },
    {
      title: "STOLEN DUST",
      description: "Characters with cost 3 or less can't challenge this character.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "4hp-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "4hp-2",
      keyword: "Challenger",
      text: "Challenger +3",
      type: "keyword",
      value: 3,
    },
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "4hp-3",
      name: "STOLEN DUST",
      text: "STOLEN DUST Characters with cost 3 or less can't challenge this character.",
      type: "static",
    },
  ],
};
