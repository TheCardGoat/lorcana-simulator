import type { CharacterCard } from "@tcg/lorcana-types";

export const dopeyKnightApprentice: CharacterCard = {
  id: "kCO",
  canonicalId: "ci_kCO",
  reprints: ["set5-181"],
  cardType: "character",
  name: "Dopey",
  version: "Knight Apprentice",
  i18n: {
    en: {
      name: "Dopey",
      version: "Knight Apprentice",
      text: [
        {
          title: "STRONGER TOGETHER",
          description:
            "When you play this character, if you have another Knight character in play, you may deal 1 damage to chosen character or location.",
        },
      ],
    },
    de: {
      name: "Seppl",
      version: "Ritterlehrling",
      text: [
        {
          title: "ZUSAMMEN STÄRKER",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen weiteren Ritter im Spiel hast, darfst du einem Charakter oder einem Ort deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Simplet",
      version: "Chevalier en herbe",
      text: [
        {
          title: "L'UNION FAIT LA FORCE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un autre personnage Chevalier en jeu, vous pouvez choisir un personnage ou un lieu et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Cucciolo",
      version: "Apprendista Cavaliere",
      text: [
        {
          title: "PIÙ FORTI INSIEME",
          description:
            "Quando giochi questo personaggio, se hai in gioco un altro personaggio Cavaliere, puoi infliggere 1 danno a un personaggio o a un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 181,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8711108b2bca45a18bcabd2f982d0457",
    tcgPlayer: 559667,
  },
  text: [
    {
      title: "STRONGER TOGETHER",
      description:
        "When you play this character, if you have another Knight character in play, you may deal 1 damage to chosen character or location.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have another Knight character in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "conditional",
      },
      id: "1w8-1",
      name: "STRONGER TOGETHER",
      text: "STRONGER TOGETHER When you play this character, if you have another Knight character in play, you may deal 1 damage to chosen character or location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
