import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarHighSultanOfLorcana: CharacterCard = {
  id: "i56",
  canonicalId: "ci_i56",
  reprints: ["set8-074"],
  cardType: "character",
  name: "Jafar",
  version: "High Sultan of Lorcana",
  i18n: {
    en: {
      name: "Jafar",
      version: "High Sultan of Lorcana",
      text: [
        {
          title: "DARK POWER",
          description:
            "Whenever this character quests, you may draw a card, then choose and discard a card. If an Illusion character card is discarded this way, you may play that character for free.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Hoher Sultan von Lorcana",
      text: [
        {
          title: "DUNKLE MACHT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab. Wenn du so eine Illusions-Charakterkarte abgeworfen hast, darfst du sie kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Jafar",
      version: "Grand Sultan de Lorcana",
      text: [
        {
          title: "POUVOIR DES TÉNÈBRES",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez piocher une carte, puis défausser une carte. Si vous défaussez une carte Personnage Illusion de cette manière, vous pouvez la jouer gratuitement.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Sommo Sultano di Lorcana",
      text: [
        {
          title: "POTERE OSCURO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi pescare una carta, poi scegli e scarta una carta. Se hai scartato una carta personaggio Illusione in questo modo, puoi giocare quel personaggio gratis.",
        },
      ],
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 74,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_30ee33dee0c64851bcdcc676e724a787",
    tcgPlayer: 631400,
  },
  text: [
    {
      title: "DARK POWER",
      description:
        "Whenever this character quests, you may draw a card, then choose and discard a card. If an Illusion character card is discarded this way, you may play that character for free.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "King", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an Illusion character card is discarded this way",
          type: "if",
        },
        then: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "mfw-1",
      name: "DARK POWER",
      text: "DARK POWER Whenever this character quests, you may draw a card, then choose and discard a card. If an Illusion character card is discarded this way, you may play that character for free.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
