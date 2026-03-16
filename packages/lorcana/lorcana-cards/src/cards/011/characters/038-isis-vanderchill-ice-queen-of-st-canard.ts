import type { CharacterCard } from "@tcg/lorcana-types";

export const isisVanderchillIceQueenOfStCanard: CharacterCard = {
  id: "StU",
  canonicalId: "ci_StU",
  reprints: ["set11-038"],
  cardType: "character",
  name: "Isis Vanderchill",
  version: "Ice Queen of St. Canard",
  i18n: {
    en: {
      name: "Isis Vanderchill",
      version: "Ice Queen of St. Canard",
      text: [
        {
          title: "CHILL OUT",
          description: "When you play this character, exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Eisalinde van der Frost",
      version: "Eisprinzessin von St. Erpelsburg",
      text: [
        {
          title: "ABKÜHLEN",
          description:
            "Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Fraîcheneige von Frimas",
      version: "Reine des Glaces de Bourg-les-Canards",
      text: [
        {
          title: "CALMEZ VOS ARDEURS",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Nives Frigider",
      version: "Regina del Ghiaccio di St. Canard",
      text: [
        {
          title: "RAFFREDDA L'ENTUSIASMO",
          description:
            "Quando giochi questo personaggio, impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 38,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_48084ac3a18c452cadbabd4675f9672b",
    tcgPlayer: 673428,
  },
  text: [
    {
      title: "CHILL OUT",
      description: "When you play this character, exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Super", "Villain"],
  abilities: [
    {
      id: "rfw-1",
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      name: "CHILL OUT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CHILL OUT When you play this character, exert chosen opposing character.",
    },
  ],
};
