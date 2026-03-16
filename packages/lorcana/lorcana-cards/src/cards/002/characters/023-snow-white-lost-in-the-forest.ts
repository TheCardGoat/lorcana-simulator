import type { CharacterCard } from "@tcg/lorcana-types";

export const snowWhiteLostInTheForest: CharacterCard = {
  id: "sl6",
  canonicalId: "ci_sl6",
  reprints: ["set2-023"],
  cardType: "character",
  name: "Snow White",
  version: "Lost in the Forest",
  i18n: {
    en: {
      name: "Snow White",
      version: "Lost in the Forest",
      text: [
        {
          title: "I WON'T HURT YOU",
          description:
            "When you play this character, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Schneewittchen",
      version: "Im Wald verlaufen",
      text: [
        {
          title: "ICH TUE EUCH JA NICHTS",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Blanche-Neige",
      version: "Perdue dans la forêt",
      text: [
        {
          title: "JE NE VOUS FERAI PAS DE MAL",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Snow White",
      version: "Lost in the Forest",
      text: [
        {
          title: "I WON'T HURT YOU",
          description:
            "When you play this character, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 23,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_abb29b66e814454ab886f18985102a9d",
    tcgPlayer: 527721,
  },
  text: [
    {
      title: "I WON'T HURT YOU",
      description:
        "When you play this character, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "muw-1",
      name: "I WON'T HURT YOU",
      text: "I WON'T HURT YOU When you play this character, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
