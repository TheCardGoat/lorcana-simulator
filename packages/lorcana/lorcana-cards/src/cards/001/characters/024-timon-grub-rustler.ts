import type { CharacterCard } from "@tcg/lorcana-types";

export const timonGrubRustler: CharacterCard = {
  id: "2d9",
  canonicalId: "ci_2d9",
  reprints: ["set1-024"],
  cardType: "character",
  name: "Timon",
  version: "Grub Rustler",
  i18n: {
    en: {
      name: "Timon",
      version: "Grub Rustler",
      text: [
        {
          title: "TASTES LIKE CHICKEN",
          description:
            "When you play this character, you may remove up to 1 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Timon",
      version: "Larvendieb",
      text: [
        {
          title: "SCHMECKT WIE HÜHNCHEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 1 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "TIMON",
      version: "Dénicheur de larves",
      text: [
        {
          title: "UN PEU GLUANT MAIS APPÉTISSANT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer 1 jeton Dommage.",
        },
      ],
    },
    it: {
      name: "Timon",
      version: "Grub Rustler",
      text: [
        {
          title: "TASTES LIKE CHICKEN",
          description:
            "When you play this character, you may remove up to 1 damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 24,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a7a780b01376481388b871a1b533de08",
    tcgPlayer: 497197,
  },
  text: [
    {
      title: "TASTES LIKE CHICKEN",
      description:
        "When you play this character, you may remove up to 1 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CHOSEN_CHARACTER",
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "1fm-1",
      name: "TASTES LIKE CHICKEN",
      text: "TASTES LIKE CHICKEN When you play this character, you may remove up to 1 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
