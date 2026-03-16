import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaLostPrince: CharacterCard = {
  id: "RA4",
  canonicalId: "ci_RA4",
  reprints: ["set5-173"],
  cardType: "character",
  name: "Simba",
  version: "Lost Prince",
  i18n: {
    en: {
      name: "Simba",
      version: "Lost Prince",
      text: [
        {
          title: "FACE THE PAST",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Verschollener Prinz",
      text: [
        {
          title: "DER VERGANGENHEIT STELLEN",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Simba",
      version: "Prince perdu",
      text: [
        {
          title: "FAIRE FACE À MON PASSÉ",
          description:
            "Durant votre tour, chaque fois que ce personnage en bannit un autre via un défi, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Principe Smarrito",
      text: [
        {
          title: "AFFRONTARE IL PASSATO",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 173,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1b36e531978a4a9eae7c7acd0d4436b8",
    tcgPlayer: 560243,
  },
  text: [
    {
      title: "FACE THE PAST",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1e1-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "FACE THE PAST",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
      text: "FACE THE PAST During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
};
