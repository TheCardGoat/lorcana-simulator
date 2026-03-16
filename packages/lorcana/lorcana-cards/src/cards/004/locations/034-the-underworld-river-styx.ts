import type { LocationCard } from "@tcg/lorcana-types";

export const theUnderworldRiverStyx: LocationCard = {
  id: "hKJ",
  canonicalId: "ci_hKJ",
  reprints: ["set4-034"],
  cardType: "location",
  name: "The Underworld",
  version: "River Styx",
  i18n: {
    en: {
      name: "The Underworld",
      version: "River Styx",
      text: [
        {
          title: "SAVE A SOUL",
          description:
            "Whenever a character quests while here, you may pay 3 {I} to return a character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Die Unterwelt",
      version: "Fluss Styx",
      text: [
        {
          title: "EINE SEELE RETTEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort erkundet, darfst du 3 bezahlen, um eine Charakterkarte aus deinem Ablagestapel zurück auf deine Hand zu nehmen.",
        },
      ],
    },
    fr: {
      name: "Les Enfers",
      version: "Le Styx",
      text: [
        {
          title: "SAUVER UNE ÂME",
          description:
            "Chaque fois qu'un personnage sur ce lieu est envoyé à l'aventure, vous pouvez payer 3 pour reprendre en main une carte personnage de votre défausse.",
        },
      ],
    },
    it: {
      name: "L'Oltretomba",
      version: "Fiume Stige",
      text: [
        {
          title: "SALVARE UN'ANIMA",
          description:
            "Ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, puoi pagare 3 per riprendere in mano una carta personaggio dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 34,
  rarity: "rare",
  cost: 2,
  willpower: 6,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0c75f068ac98487f9544d1bce3858b39",
    tcgPlayer: 550564,
  },
  text: [
    {
      title: "SAVE A SOUL",
      description:
        "Whenever a character quests while here, you may pay 3 {I} to return a character card from your discard to your hand.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "pay-cost",
          cost: {
            ink: 3,
          },
          effect: {
            cardType: "character",
            target: "CONTROLLER",
            type: "return-from-discard",
          },
        },
        type: "optional",
      },
      id: "6fe-1",
      name: "SAVE A SOUL",
      text: "SAVE A SOUL Whenever a character quests while here, you may pay 3 {I} to return a character card from your discard to your hand.",
      trigger: {
        event: "quest",
        on: "CHARACTER_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
