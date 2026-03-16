import type { CharacterCard } from "@tcg/lorcana-types";

export const brunoMadrigalOutOfTheShadows: CharacterCard = {
  id: "Ran",
  canonicalId: "ci_Ran",
  reprints: ["set4-038"],
  cardType: "character",
  name: "Bruno Madrigal",
  version: "Out of the Shadows",
  i18n: {
    en: {
      name: "Bruno Madrigal",
      version: "Out of the Shadows",
      text: [
        {
          title: "IT WAS YOUR VISION",
          description:
            'When you play this character, chosen character gains "When this character is banished in a challenge, you may return this card to your hand" this turn.',
        },
      ],
    },
    de: {
      name: "Bruno Madrigal",
      version: "Aus den Schatten heraus",
      text: [
        {
          title: "ES WAR DEINE VISION",
          description:
            'Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug: "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand".',
        },
      ],
    },
    fr: {
      name: "Bruno Madrigal",
      version: "Sorti de la pénombre",
      text: [
        {
          title: "C'EST TA VISION",
          description:
            'Lorsque vous jouez ce personnage, choisissez un personnage qui gagne "Lorsque ce personnage est banni via un défi, vous pouvez le renvoyer dans la main de son propriétaire" pour le reste de ce tour.',
        },
      ],
    },
    it: {
      name: "Bruno Madrigal",
      version: "Uscito dalle Ombre",
      text: [
        {
          title: "ERA LA TUA VISIONE",
          description:
            'Quando giochi questo personaggio, un personaggio a tua scelta ottiene "Quando questo personaggio viene esiliato in una sfida, puoi riprendere in mano questa carta" per questo turno.',
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 38,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_140b4894a53d4884a4ec1e15dab9319a",
    tcgPlayer: 543899,
  },
  text: [
    {
      title: "IT WAS YOUR VISION",
      description:
        'When you play this character, chosen character gains "When this character is banished in a challenge, you may return this card to your hand" this turn.',
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "SELF",
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1qi-1",
      name: "IT WAS YOUR VISION",
      text: "IT WAS YOUR VISION When you play this character, chosen character gains “When this character is banished in a challenge, you may return this card to your hand” this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
