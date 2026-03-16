import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineRebelliousPrincess: CharacterCard = {
  id: "5EC",
  canonicalId: "ci_5EC",
  reprints: ["set6-106"],
  cardType: "character",
  name: "Jasmine",
  version: "Rebellious Princess",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Rebellious Princess",
      text: [
        {
          title: "YOU'LL NEVER MISS IT",
          description: "Whenever this character quests, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Rebellische Prinzessin",
      text: [
        {
          title: "DU WIRST ES NIEMALS VERMISSEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Jasmine",
      version: "Princesse rebelle",
      text: [
        {
          title: "IMMANQUABLE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Jasmine",
      version: "Principessa Ribelle",
      text: [
        {
          title: "NON TE NE ACCORGERAI NEMMENO",
          description:
            "Ogni volta che questo personaggio va all'avventura, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 106,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e093d909d79f4dd5baaccae93139c95b",
    tcgPlayer: 588101,
  },
  text: [
    {
      title: "YOU'LL NEVER MISS IT",
      description: "Whenever this character quests, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "zj2-1",
      name: "YOU'LL NEVER MISS IT",
      text: "YOU'LL NEVER MISS IT Whenever this character quests, each opponent loses 1 lore.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
