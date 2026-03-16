import type { LocationCard } from "@tcg/lorcana-types";

export const motunuiIslandParadise: LocationCard = {
  id: "77T",
  canonicalId: "ci_foY",
  reprints: ["set3-170", "set9-170"],
  cardType: "location",
  name: "Motunui",
  version: "Island Paradise",
  i18n: {
    en: {
      name: "Motunui",
      version: "Island Paradise",
      text: [
        {
          title: "REINCARNATION",
          description:
            "Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Motunui",
      version: "Insel-Paradies",
      text: [
        {
          title: "REINKARNATION",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort verbannt wird, darfst du jenen verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Motunui",
      version: "Île paradisiaque",
      text: [
        {
          title: "RÉINCARNATION",
          description:
            "Chaque fois qu'un personnage sur ce lieu est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Motunui",
      version: "Isola Paradisiaca",
      text: [
        {
          title: "REINCARNAZIONE",
          description:
            "Ogni volta che un personaggio viene esiliato mentre si trova in questo luogo, puoi aggiungere quella carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "009",
  cardNumber: 170,
  rarity: "uncommon",
  cost: 2,
  willpower: 5,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fc47f435832f4356ab419cf268febdb2",
    tcgPlayer: 650104,
  },
  text: [
    {
      title: "REINCARNATION",
      description:
        "Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        type: "optional",
        effect: {
          exerted: true,
          facedown: true,
          source: {
            ref: "trigger-source",
          },
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
      },
      trigger: {
        event: "banish",
        on: "CHARACTERS_HERE",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
