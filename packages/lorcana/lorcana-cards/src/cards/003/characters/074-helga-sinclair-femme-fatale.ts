import type { CharacterCard } from "@tcg/lorcana-types";

export const helgaSinclairFemmeFatale: CharacterCard = {
  id: "akr",
  canonicalId: "ci_akr",
  reprints: ["set3-074"],
  cardType: "character",
  name: "Helga Sinclair",
  version: "Femme Fatale",
  i18n: {
    en: {
      name: "Helga Sinclair",
      version: "Femme Fatale",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "THIS CHANGES EVERYTHING",
          description:
            "Whenever this character quests, you may deal 3 damage to chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Helga Sinclair",
      version: "Femme Fatale",
      text: "Gestaltwandel 3 DADURCH ÄNDERT SICH ALLES Jedes Mal, wenn dieser Charakter erkundet, darfst du einem beschädigten Charakter deiner Wahl 3 Schaden zufügen.",
    },
    fr: {
      name: "Helga Sinclair",
      version: "Femme fatale",
      text: "Alter 3 ÇA CHANGE BEAUCOUP DE CHOSES Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un personnage blessé et lui infliger 3 dommages.",
    },
    it: {
      name: "Helga Sinclair",
      version: "Femme Fatale",
      text: "Trasformazione 3 QUESTO CAMBIA TUTTO Ogni volta che questo personaggio va all'avventura, puoi infliggere 3 danni a un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 74,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_bd43b98b4db44fc49f0aea4790ad393a",
    tcgPlayer: 537764,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "THIS CHANGES EVERYTHING",
      description:
        "Whenever this character quests, you may deal 3 damage to chosen damaged character.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1t9-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
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
      id: "1t9-2",
      name: "THIS CHANGES EVERYTHING",
      text: "THIS CHANGES EVERYTHING Whenever this character quests, you may deal 3 damage to chosen damaged character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
