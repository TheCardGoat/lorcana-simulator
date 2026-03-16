import type { CharacterCard } from "@tcg/lorcana-types";

export const dukeWeaseltonSurlyCrook: CharacterCard = {
  id: "aK6",
  canonicalId: "ci_aK6",
  reprints: ["set11-182"],
  cardType: "character",
  name: "Duke Weaselton",
  version: "Surly Crook",
  i18n: {
    en: {
      name: "Duke Weaselton",
      version: "Surly Crook",
      text: [
        {
          title: "APPREHENDED",
          description:
            "When this character is banished, you may play a character with cost 2 or less for free.",
        },
      ],
    },
    de: {
      name: "Herzog von Pitzbühl",
      version: "Mürrischer Gauner",
      text: [
        {
          title: "FESTGENOMMEN",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du einen Charakter, der 2 oder weniger kostet, kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Duke Weaselton",
      version: "Arnaqueur revêche",
      text: [
        {
          title: "APPRÉHENDÉ",
          description:
            "Lorsque ce personnage est banni, vous pouvez jouer gratuitement un personnage coûtant 2 ou moins.",
        },
      ],
    },
    it: {
      name: "Duke Donnolesi",
      version: "Furfante Scontroso",
      text: [
        {
          title: "ARRESTATO",
          description:
            "Quando questo personaggio viene esiliato, puoi giocare un personaggio con costo 2 o inferiore gratis.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "011",
  cardNumber: 182,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d7aa2aa9bd12495096d00d33c6f09821",
    tcgPlayer: 676239,
  },
  text: [
    {
      title: "APPREHENDED",
      description:
        "When this character is banished, you may play a character with cost 2 or less for free.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "13a-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 2,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      name: "APPREHENDED",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "APPREHENDED When this character is banished, you may play a character with cost 2 or less for free.",
    },
  ],
};
