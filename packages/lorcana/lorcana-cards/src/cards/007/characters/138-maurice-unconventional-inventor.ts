import type { CharacterCard } from "@tcg/lorcana-types";

export const mauriceUnconventionalInventor: CharacterCard = {
  id: "1FE",
  canonicalId: "ci_1FE",
  reprints: ["set7-138"],
  cardType: "character",
  name: "Maurice",
  version: "Unconventional Inventor",
  i18n: {
    en: {
      name: "Maurice",
      version: "Unconventional Inventor",
      text: [
        {
          title: "HOW ON EARTH DID THAT HAPPEN?",
          description:
            "When you play this character, you may banish chosen item of yours to draw a card. If the banished item is named Maurice's Machine, you may also banish chosen character with 2 {S} or less.",
        },
      ],
    },
    de: {
      name: "Maurice",
      version: "Unkonventioneller Erfinder",
      text: [
        {
          title: "WIE IST DENN DAS PASSIERT?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner Gegenstände wählen und verbannen, um 1 Karte zu ziehen. Wenn du so Maurice' Maschine verbannst, darfst du außerdem einen Charakter deiner Wahl mit 2 oder weniger verbannen.",
        },
      ],
    },
    fr: {
      name: "Maurice",
      version: "Inventeur peu conventionnel",
      text: [
        {
          title: "QU'EST-CE QUE C'EST QUE CE...",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir l'un de vos objets et le bannir pour piocher une carte. Si l'objet banni est nommé Machine de Maurice, vous pouvez aussi choisir un personnage avec une de 2 ou moins et le bannir.",
        },
      ],
    },
    it: {
      name: "Maurice",
      version: "Inventore Non Convenzionale",
      text: [
        {
          title: "COME PUÒ ESSERE SUCCESSO?",
          description:
            "Quando giochi questo personaggio, puoi esiliare un tuo oggetto a tua scelta per pescare una carta. Se l'oggetto esiliato si chiama Marchingegno di Maurice, puoi anche esiliare un personaggio a tua scelta con 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 138,
  rarity: "rare",
  cost: 4,
  strength: 5,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a02f616f960243249461ac40a8beb36c",
    tcgPlayer: 619483,
  },
  text: [
    {
      title: "HOW ON EARTH DID THAT HAPPEN?",
      description:
        "When you play this character, you may banish chosen item of yours to draw a card. If the banished item is named Maurice's Machine, you may also banish chosen character with 2 {S} or less.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "sgs-1",
      name: "HOW ON EARTH DID THAT HAPPEN?",
      text: "HOW ON EARTH DID THAT HAPPEN? When you play this character, you may banish chosen item of yours to draw a card. If the banished item is named Maurice's Machine, you may also banish chosen character with 2 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
