import type { CharacterCard } from "@tcg/lorcana-types";

export const bernardOverprepared: CharacterCard = {
  id: "xHO",
  canonicalId: "ci_xHO",
  reprints: ["set8-169"],
  cardType: "character",
  name: "Bernard",
  version: "Over-Prepared",
  i18n: {
    en: {
      name: "Bernard",
      version: "Over-Prepared",
      text: [
        {
          title: "GO DOWN THERE AND INVESTIGATE",
          description:
            "When you play this character, if you have an Ally character in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Bernard",
      version: "Übervorbereitet",
      text: [
        {
          title: "WIR MÜSSEN DORTHIN UND NACHFORSCHEN",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Verbündeten im Spiel hast, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Bernard",
      version: "Paré à toute éventualité",
      text: [
        {
          title: "IL FAUT NOUS Y RENDRE SANS PLUS TARDER",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Allié en jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Bernie",
      version: "Fin Troppo Preparato",
      text: [
        {
          title: "ANDARE LÌ AD INDAGARE",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio Alleato, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Rescuers",
  set: "008",
  cardNumber: 169,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_66c4a3962c704f18ac6b7131fa2662f1",
    tcgPlayer: 631465,
  },
  text: [
    {
      title: "GO DOWN THERE AND INVESTIGATE",
      description:
        "When you play this character, if you have an Ally character in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "wn2-1",
      effect: {
        condition: {
          expression: "you have an Ally character in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "GO DOWN THERE AND INVESTIGATE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GO DOWN THERE AND INVESTIGATE When you play this character, if you have an Ally character in play, you may draw a card.",
    },
  ],
};
