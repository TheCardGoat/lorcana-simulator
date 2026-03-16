import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesRuthlessTyrant: CharacterCard = {
  id: "C4b",
  canonicalId: "ci_C4b",
  reprints: ["set8-048"],
  cardType: "character",
  name: "Hades",
  version: "Ruthless Tyrant",
  i18n: {
    en: {
      name: "Hades",
      version: "Ruthless Tyrant",
      text: [
        {
          title: "SHORT ON PATIENCE",
          description:
            "When you play this character and whenever he quests, you may deal 2 damage to another chosen character of yours to draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Gnadenloser Tyrann",
      text: [
        {
          title: "WENIG GEDULD",
          description:
            "Wenn du diesen Charakter ausspielst, und jedes Mal, wenn er erkundet, darfst du einen deiner anderen Charaktere wählen und ihm 2 Schaden zufügen, um 2 Karten zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Tyran impitoyable",
      text: [
        {
          title: "À COURT DE PATIENCE",
          description:
            "Lorsque vous jouez ce personnage et chaque fois qu'il est envoyé à l'aventure, vous pouvez choisir un autre de vos personnages et lui infliger 2 dommages. Si vous le faites, piochez 2 cartes.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Tiranno Spietato",
      text: [
        {
          title: "POCA PAZIENZA",
          description:
            "Quando giochi questo personaggio e ogni volta che va all'avventura, puoi infliggere 2 danni a un tuo altro personaggio a tua scelta per pescare 2 carte.",
        },
      ],
    },
  },
  inkType: ["amethyst", "ruby"],
  franchise: "Hercules",
  set: "008",
  cardNumber: 48,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4c3204fa9fa14ff9a13a41cadc4259aa",
    tcgPlayer: 630060,
  },
  text: [
    {
      title: "SHORT ON PATIENCE",
      description:
        "When you play this character and whenever he quests, you may deal 2 damage to another chosen character of yours to draw 2 cards.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Deity"],
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
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "keg-1",
      name: "SHORT ON PATIENCE When you play this character and",
      text: "SHORT ON PATIENCE When you play this character and whenever he quests, you may deal 2 damage to another chosen character of yours to draw 2 cards.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
