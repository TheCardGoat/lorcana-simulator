import type { CharacterCard } from "@tcg/lorcana-types";

export const marchHareHarebrainedEccentric: CharacterCard = {
  id: "tzo",
  canonicalId: "ci_tzo",
  reprints: ["set8-091"],
  cardType: "character",
  name: "March Hare",
  version: "Hare-Brained Eccentric",
  i18n: {
    en: {
      name: "March Hare",
      version: "Hare-Brained Eccentric",
      text: [
        {
          title: "LIGHT THE CANDLES",
          description:
            "When you play this character, you may deal 2 damage to chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Der Märzhase",
      version: "Exzentriker mit Hasenhirn",
      text: [
        {
          title: "ENTZÜNDE DIE KERZEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem beschädigten Charakter deiner Wahl 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Le Lièvre de Mars",
      version: "Farfelu excentrique",
      text: [
        {
          title: "ALLUMER LES BOUGIES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ayant un dommage ou plus et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Leprotto Bisestile",
      version: "Eccentrico Strampalato",
      text: [
        {
          title: "ACCENDERE LE CANDELINE",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 91,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_03fb917c4b444c35a0f174f40655e419",
    tcgPlayer: 631410,
  },
  text: [
    {
      title: "LIGHT THE CANDLES",
      description:
        "When you play this character, you may deal 2 damage to chosen damaged character.",
    },
  ],
  classifications: ["Storyborn"],
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
      id: "12b-1",
      name: "LIGHT THE CANDLES",
      text: "LIGHT THE CANDLES When you play this character, you may deal 2 damage to chosen damaged character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
