import type { CharacterCard } from "@tcg/lorcana-types";

export const thaddeusEKlangMetallicLeader: CharacterCard = {
  id: "iyr",
  canonicalId: "ci_iyr",
  reprints: ["set3-194"],
  cardType: "character",
  name: "Thaddeus E. Klang",
  version: "Metallic Leader",
  i18n: {
    en: {
      name: "Thaddeus E. Klang",
      version: "Metallic Leader",
      text: [
        {
          title: "MY TEETH ARE SHARPER",
          description:
            "Whenever this character quests while at a location, you may deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Thaddeus E. Klang",
      version: "Metallener Anführer",
      text: [
        {
          title: "MEINE ZÄHNE SIND SCHÄRFER",
          description:
            "Jedes Mal, wenn dieser Charakter an einem Ort erkundet, darfst du einem Charakter deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Gulliver Glas",
      version: "Chef métallique",
      text: [
        {
          title: "MÂCHOIRE ACÉRÉE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure et qu'il se trouve sur un lieu, vous pouvez choisir un personnage et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Thaddeus Tuono",
      version: "Leader Metallico",
      text: [
        {
          title: "I MIEI DENTI SONO PIÙ AFFILATI",
          description:
            "Ogni volta che questo personaggio va all'avventura mentre si trova in un luogo, puoi infliggere 1 danno a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 194,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_810ae6612d094f8a89c5db907d193cf5",
    tcgPlayer: 539116,
  },
  text: [
    {
      title: "MY TEETH ARE SHARPER",
      description:
        "Whenever this character quests while at a location, you may deal 1 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "195-1",
      name: "MY TEETH ARE SHARPER",
      text: "MY TEETH ARE SHARPER Whenever this character quests while at a location, you may deal 1 damage to chosen character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
