import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesInfernalSchemer: CharacterCard = {
  id: "iRC",
  canonicalId: "ci_nzC",
  reprints: ["set1-147", "set9-151"],
  cardType: "character",
  name: "Hades",
  version: "Infernal Schemer",
  i18n: {
    en: {
      name: "Hades",
      version: "Infernal Schemer",
      text: [
        {
          title: "IS THERE A DOWNSIDE TO THIS?",
          description:
            "When you play this character, you may put chosen opposing character into their player's inkwell facedown.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Höllischer Intrigant",
      text: [
        {
          title: "KÖNNTE DA EIN HAKEN SEIN?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen gegnerischen Charakter deiner Wahl verdeckt in den zugehörigen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "HADÈS",
      version: "Conspirateur infernal",
      text: [
        {
          title: "Y AURAIT-IL UN OS LA-DESSOUS?",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse et le placer, face cachée, dans la réserve d'encre de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Hades",
      version: "Infernal Schemer",
      text: [
        {
          title: "IS THERE A DOWNSIDE TO THIS?",
          description:
            "When you play this character, you may put chosen opposing character into their player's inkwell facedown.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 147,
  rarity: "legendary",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_050ae6da90154532905911c8c2569802",
    tcgPlayer: 651117,
  },
  text: [
    {
      title: "IS THERE A DOWNSIDE TO THIS?",
      description:
        "When you play this character, you may put chosen opposing character into their player's inkwell facedown.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          facedown: true,
          source: "chosen-character",
          target: "OPPONENT",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "12a-1",
      name: "IS THERE A DOWNSIDE TO THIS?",
      text: "IS THERE A DOWNSIDE TO THIS? When you play this character, you may put chosen opposing character into their player's inkwell facedown.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
