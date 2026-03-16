import type { CharacterCard } from "@tcg/lorcana-types";

export const ratiganVeryLargeMouse: CharacterCard = {
  id: "jfe",
  canonicalId: "ci_jfe",
  reprints: ["set2-121"],
  cardType: "character",
  name: "Ratigan",
  version: "Very Large Mouse",
  i18n: {
    en: {
      name: "Ratigan",
      version: "Very Large Mouse",
      text: [
        {
          title: "THIS IS MY KINGDOM",
          description:
            "When you play this character, exert chosen opposing character with 3 {S} or less. Choose one of your characters and ready them. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Rattenzahn",
      version: "Sehr große Maus",
      text: [
        {
          title: "ES IST MEIN KÖNIGREICH!",
          description:
            "Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen Charakter deiner Wahl mit 3 oder weniger. Mache einen deiner Charaktere bereit, er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Ratigan",
      version: "Le plus beau des rats",
      text: [
        {
          title: "CECI EST MON ROYAUME",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse avec 3 ou moins et épuisez-le. Choisissez l'un de vos personnages et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Ratigan",
      version: "Very Large Mouse",
      text: [
        {
          title: "THIS IS MY KINGDOM",
          description:
            "When you play this character, exert chosen opposing character with 3 or less. Choose one of your characters and ready them. They can't quest for the rest of this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 121,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_35af0ddde9834b5e8b37b9ba98126c71",
    tcgPlayer: 527276,
  },
  text: [
    {
      title: "THIS IS MY KINGDOM",
      description:
        "When you play this character, exert chosen opposing character with 3 {S} or less. Choose one of your characters and ready them. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "1wj-1",
      name: "THIS IS MY KINGDOM",
      text: "THIS IS MY KINGDOM When you play this character, exert chosen opposing character with 3 {S} or less. Choose one of your characters and ready them. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
