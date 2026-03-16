import type { CharacterCard } from "@tcg/lorcana-types";

export const boomerHasTheBeak: CharacterCard = {
  id: "8Pv",
  canonicalId: "ci_8Pv",
  reprints: ["set11-076"],
  cardType: "character",
  name: "Boomer",
  version: "Has the Beak",
  i18n: {
    en: {
      name: "Boomer",
      version: "Has the Beak",
      text: [
        {
          title: "SPOTTED HIM!",
          description: "When you play this character, you may exert chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Bumer",
      version: "Der mit dem Schnabel",
      text: [
        {
          title: "HAB IHN GEFUNDEN!",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen beschädigten Charakter deiner Wahl erschöpfen.",
        },
      ],
    },
    fr: {
      name: "Piqueur",
      version: "A le bec",
      text: [
        {
          title: "REPÉRÉ!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ayant au moins un dommage et l'épuiser.",
        },
      ],
    },
    it: {
      name: "Sbuccia",
      version: "Quello col Becco",
      text: [
        {
          title: "L'HO TROVATO!",
          description:
            "Quando giochi questo personaggio, puoi impegnare un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 76,
  rarity: "common",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_db6ccc6d3dde4e4890ff8a1fd391e905",
    tcgPlayer: 676197,
  },
  text: [
    {
      title: "SPOTTED HIM!",
      description: "When you play this character, you may exert chosen damaged character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "et7-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "exert",
        },
        type: "optional",
      },
      name: "SPOTTED HIM!",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SPOTTED HIM! When you play this character, you may exert chosen damaged character.",
    },
  ],
};
