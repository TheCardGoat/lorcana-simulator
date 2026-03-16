import type { CharacterCard } from "@tcg/lorcana-types";

export const treasureGuardianForebodingSentry: CharacterCard = {
  id: "1bI",
  canonicalId: "ci_1bI",
  reprints: ["set7-047"],
  cardType: "character",
  name: "Treasure Guardian",
  version: "Foreboding Sentry",
  i18n: {
    en: {
      name: "Treasure Guardian",
      version: "Foreboding Sentry",
      text: [
        {
          title: "UNTOLD TREASURE",
          description:
            "When you play this character, if you have an Illusion character in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Hüter des Schatzes",
      version: "Bedrohlicher Wächter",
      text: [
        {
          title: "UNGEHEURER SCHATZ",
          description:
            "Wenn du diesen Charakter ausspielst, falls du eine Illusion im Spiel hast, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Le gardien du Trésor",
      version: "Sentinelle inquiétante",
      text: [
        {
          title: "TRÉSOR INESTIMABLE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Illusion en jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Guardiano del Tesoro",
      version: "Sentinella Profetica",
      text: [
        {
          title: "TESORO INDICIBILE",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio Illusione, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 47,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dde4814ef611454ca907668ed03b2027",
    tcgPlayer: 619431,
  },
  text: [
    {
      title: "UNTOLD TREASURE",
      description:
        "When you play this character, if you have an Illusion character in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "9vb-1",
      effect: {
        condition: {
          expression: "you have an Illusion character in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "UNTOLD TREASURE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "UNTOLD TREASURE When you play this character, if you have an Illusion character in play, you may draw a card.",
    },
  ],
};
