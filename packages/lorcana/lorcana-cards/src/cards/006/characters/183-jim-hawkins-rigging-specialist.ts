import type { CharacterCard } from "@tcg/lorcana-types";

export const jimHawkinsRiggingSpecialist: CharacterCard = {
  id: "FZ4",
  canonicalId: "ci_FZ4",
  reprints: ["set6-183"],
  cardType: "character",
  name: "Jim Hawkins",
  version: "Rigging Specialist",
  i18n: {
    en: {
      name: "Jim Hawkins",
      version: "Rigging Specialist",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "BATTLE STATION",
          description:
            "When you play this character, you may deal 1 damage to chosen character or location.",
        },
      ],
    },
    de: {
      name: "Jim Hawkins",
      version: "Takelage-Experte",
      text: "Gestaltwandel 3 GEFECHTSSTATIONEN Wenn du diesen Charakter ausspielst, darfst du einem Charakter oder einem Ort deiner Wahl 1 Schaden zufügen.",
    },
    fr: {
      name: "Jim Hawkins",
      version: "Spécialiste en gréement",
      text: "Alter 3 POSTE DE COMBAT Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ou un lieu et lui infliger 1 dommage.",
    },
    it: {
      name: "Jim Hawkins",
      version: "Specialista del Sartiame",
      text: "Trasformazione 3 POSTAZIONI DI COMBATTIMENTO Quando giochi questo personaggio, puoi infliggere 1 danno a un personaggio o a un luogo a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_88c973fe2a114a198654133896a022b7",
    tcgPlayer: 593015,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "BATTLE STATION",
      description:
        "When you play this character, you may deal 1 damage to chosen character or location.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "woa-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
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
      id: "woa-2",
      name: "BATTLE STATION",
      text: "BATTLE STATION When you play this character, you may deal 1 damage to chosen character or location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
