import type { CharacterCard } from "@tcg/lorcana-types";

export const trampStreetsmartDog: CharacterCard = {
  id: "52C",
  canonicalId: "ci_52C",
  reprints: ["set7-010"],
  cardType: "character",
  name: "Tramp",
  version: "Street-Smart Dog",
  i18n: {
    en: {
      name: "Tramp",
      version: "Street-Smart Dog",
      text: [
        {
          title: "NOW IT'S A PARTY",
          description:
            "For each character you have in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "HOW'S PICKINGS?",
          description:
            "When you play this character, you may draw a card for each other character you have in play, then choose and discard that many cards.",
        },
      ],
    },
    de: {
      name: "Strolch",
      version: "Schlauer Hund",
      text: [
        {
          title: "JETZT IST ES EINE PARTY",
          description:
            "Für jeden deiner Charaktere im Spiel zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "WIEDER AM TURTELN?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du für jeden deiner anderen Charaktere im Spiel eine Karte ziehen. Wähle danach dieselbe Anzahl Karten aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Clochard",
      version: "Chien débrouillard",
      text: [
        {
          title: "LA FÊTE, C'EST MAINTENANT",
          description:
            "Jouer ce personnage vous coûte 1 de moins pour chaque personnage que vous avez en jeu.",
        },
        {
          title: "ON PICORE?",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez piocher une carte pour chaque autre personnage que vous avez en jeu. Ensuite, défaussez autant de cartes que vous en avez pioché.",
        },
      ],
    },
    it: {
      name: "Biagio",
      version: "Cane Scaltro",
      text: [
        {
          title: "ORA SÌ CHE È UNA FESTA",
          description:
            "Per ogni personaggio che hai in gioco, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "COME VA?",
          description:
            "Quando giochi questo personaggio, puoi pescare una carta per ogni altro personaggio che hai in gioco, poi scegli e scarta altrettante carte.",
        },
      ],
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 10,
  rarity: "rare",
  cost: 7,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8d473335c16245e684e466b7a745ec89",
    tcgPlayer: 619412,
  },
  text: [
    {
      title: "NOW IT'S A PARTY",
      description:
        "For each character you have in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "HOW'S PICKINGS?",
      description:
        "When you play this character, you may draw a card for each other character you have in play, then choose and discard that many cards.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "8g2-1",
      text: "NOW IT'S A PARTY For each character you have in play, you pay 1 {I} less to play this character.",
      name: "NOW IT'S A PARTY",
      effect: {
        amount: {
          controller: "you",
          type: "characters-in-play",
        },
        cardType: "character",
        type: "cost-reduction",
      },
      sourceZones: ["hand"],
      type: "static",
    },
    {
      id: "8g2-2",
      text: "HOW'S PICKINGS? When you play this character, you may draw a card for each other character you have in play, then choose and discard that many cards.",
      name: "HOW'S PICKINGS?",
      effect: {
        effect: {
          steps: [
            {
              amount: {
                cardType: "character",
                excludeSelf: true,
                filters: [],
                owner: "you",
                type: "filtered-count",
                zones: ["play"],
              },
              target: "CONTROLLER",
              type: "draw",
            },
            {
              type: "discard",
              amount: {
                cardType: "character",
                excludeSelf: true,
                filters: [],
                owner: "you",
                type: "filtered-count",
                zones: ["play"],
              },
              from: "hand",
              target: "CONTROLLER",
              chosen: true,
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
