import type { CharacterCard } from "@tcg/lorcana-types";

export const docBoldKnight: CharacterCard = {
  id: "qUy",
  canonicalId: "ci_qUy",
  reprints: ["set5-193"],
  cardType: "character",
  name: "Doc",
  version: "Bold Knight",
  i18n: {
    en: {
      name: "Doc",
      version: "Bold Knight",
      text: [
        {
          title: "DRASTIC MEASURES",
          description: "When you play this character, you may discard your hand to draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Chef",
      version: "Ritter der Kühnheit",
      text: [
        {
          title: "DRASTISCHE MASSNAHMEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du alle Karten von deiner Hand abwerfen, um 2 Karten zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Prof",
      version: "Chevalier hardi",
      text: [
        {
          title: "MESURES DRASTIQUES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez défausser votre main pour piocher 2 cartes.",
        },
      ],
    },
    it: {
      name: "Dotto",
      version: "Cavaliere Audace",
      text: [
        {
          title: "MISURE DRASTICHE",
          description:
            "Quando giochi questo personaggio, puoi scartare la tua mano per pescare 2 carte.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 193,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_663b3bcaa1df4b48ad139248ef5a5208",
    tcgPlayer: 559668,
  },
  text: [
    {
      title: "DRASTIC MEASURES",
      description: "When you play this character, you may discard your hand to draw 2 cards.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "sequence",
          steps: [
            {
              amount: "all",
              target: "CONTROLLER",
              type: "discard",
            },
            {
              amount: 2,
              target: "CONTROLLER",
              type: "draw",
            },
          ],
        },
        type: "optional",
      },
      id: "1if-1",
      name: "DRASTIC MEASURES",
      text: "DRASTIC MEASURES When you play this character, you may discard your hand to draw 2 cards.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
