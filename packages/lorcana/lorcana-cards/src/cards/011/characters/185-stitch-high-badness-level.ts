import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchHighBadnessLevel: CharacterCard = {
  id: "xeg",
  canonicalId: "ci_xeg",
  reprints: ["set11-185"],
  cardType: "character",
  name: "Stitch",
  version: "High Badness Level",
  i18n: {
    en: {
      name: "Stitch",
      version: "High Badness Level",
      text: [
        {
          title: "AMPED UP",
          description:
            "While you have a character named Lilo in play, this character gains Challenger +3. (They get +3 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Hoher Bös-o-meter Stand",
      text: [
        {
          title: "VERSTÄRKT",
          description:
            "Solange du mindestens einen Lilo-Charakter im Spiel hast, erhält dieser Charakter Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Au niveau de méchanceté élevé",
      text: [
        {
          title: "SURVOLTÉ",
          description:
            "Tant que vous avez un personnage Lilo en jeu, ce personnage-ci gagne Offensif +3.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Alto Livello di Cattiveria",
      text: [
        {
          title: "SU DI GIRI",
          description:
            "Mentre hai in gioco un personaggio chiamato Lilo, questo personaggio ottiene Sfidante +3.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 185,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e2cac54dd5d4e0ea2db87cf752df00a",
    tcgPlayer: 673335,
  },
  text: [
    {
      title: "AMPED UP",
      description:
        "While you have a character named Lilo in play, this character gains Challenger +3. (They get +3 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      id: "qzq-1",
      effect: {
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 3,
      },
      type: "action",
      text: "AMPED UP While you have a character named Lilo in play, this character gains Challenger +3.",
    },
  ],
};
