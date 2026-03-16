import type { CharacterCard } from "@tcg/lorcana-types";

export const theTwinsLostBoys: CharacterCard = {
  id: "Lqt",
  canonicalId: "ci_Lqt",
  reprints: ["set10-186"],
  cardType: "character",
  name: "The Twins",
  version: "Lost Boys",
  i18n: {
    en: {
      name: "The Twins",
      version: "Lost Boys",
      text: [
        {
          title: "TWO FOR ONE",
          description:
            "When you play this character, if you have a location in play, you may deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Die Zwillinge",
      version: "Verwunschene Kinder",
      text: [
        {
          title: "ZWEI FÜR EINEN",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Ort im Spiel hast, darfst du einem Charakter deiner Wahl 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Les jumeaux",
      version: "Enfants perdus",
      text: [
        {
          title: "DEUX POUR LE PRIX D'UN",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un lieu en jeu, vous pouvez choisir un personnage et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "I Gemelli",
      version: "Bimbi Sperduti",
      text: [
        {
          title: "DUE PER UNO",
          description:
            "Quando giochi questo personaggio, se hai in gioco un luogo, puoi infliggere 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 186,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_171e6569a06946a89dcc64afdd1585c7",
    tcgPlayer: 659409,
  },
  text: [
    {
      title: "TWO FOR ONE",
      description:
        "When you play this character, if you have a location in play, you may deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a location in play",
          type: "if",
        },
        then: {
          amount: 2,
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
      id: "hrd-1",
      name: "TWO FOR ONE",
      text: "TWO FOR ONE When you play this character, if you have a location in play, you may deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
