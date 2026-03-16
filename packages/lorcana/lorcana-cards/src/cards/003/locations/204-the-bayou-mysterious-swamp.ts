import type { LocationCard } from "@tcg/lorcana-types";

export const theBayouMysteriousSwamp: LocationCard = {
  id: "RGw",
  canonicalId: "ci_RGw",
  reprints: ["set3-204"],
  cardType: "location",
  name: "The Bayou",
  version: "Mysterious Swamp",
  i18n: {
    en: {
      name: "The Bayou",
      version: "Mysterious Swamp",
      text: [
        {
          title: "SHOW ME THE WAY",
          description:
            "Whenever a character quests while here, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Der Bayou",
      version: "Geheimnisvoller Sumpf",
      text: [
        {
          title: "WIR NEHMEN EUCH JETZT MIT",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort erkundet, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Le bayou",
      version: "Marais mystérieux",
      text: [
        {
          title: "MONTRE-MOI LE CHEMIN",
          description:
            "Chaque fois qu'un personnage sur ce lieu est envoyé à l'aventure, vous pouvez piocher une carte, puis choisissez et défaussez une carte.",
        },
      ],
    },
    it: {
      name: "Il Bayou",
      version: "Palude Misteriosa",
      text: [
        {
          title: "MOSTRAMI LA VIA",
          description:
            "Ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, puoi pescare una carta, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Princess and the Frog",
  set: "003",
  cardNumber: 204,
  rarity: "uncommon",
  cost: 1,
  willpower: 3,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_65119a74cb394cec89eab4175ad228bf",
    tcgPlayer: 538683,
  },
  text: [
    {
      title: "SHOW ME THE WAY",
      description:
        "Whenever a character quests while here, you may draw a card, then choose and discard a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            {
              amount: 1,
              chosen: true,
              from: "hand",
              target: "CONTROLLER",
              type: "discard",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      id: "2bw-1",
      name: "SHOW ME THE WAY",
      text: "SHOW ME THE WAY Whenever a character quests while here, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "quest",
        on: "CHARACTERS_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
