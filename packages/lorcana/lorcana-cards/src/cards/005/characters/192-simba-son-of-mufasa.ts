import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaSonOfMufasa: CharacterCard = {
  id: "746",
  canonicalId: "ci_746",
  reprints: ["set5-192"],
  cardType: "character",
  name: "Simba",
  version: "Son of Mufasa",
  i18n: {
    en: {
      name: "Simba",
      version: "Son of Mufasa",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "FEARSOME ROAR",
          description: "When you play this character, you may banish chosen item or location.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Sohn von Mufasa",
      text: "Gestaltwandel 4 FURCHTERREGENDES GEBRÜLL Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand oder Ort deiner Wahl verbannen.",
    },
    fr: {
      name: "Simba",
      version: "Fils de Mufasa",
      text: "Alter 4 RUGISSEMENT IMPRESSIONNANT Lorsque vous jouez ce personnage, vous pouvez choisir un objet ou un lieu et le bannir.",
    },
    it: {
      name: "Simba",
      version: "Figlio di Mufasa",
      text: "Trasformazione 4 RUGGITO SPAVENTOSO Quando giochi questo personaggio, puoi esiliare un oggetto o un luogo a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 192,
  rarity: "uncommon",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6b0937a994d6436ca4ffaf3e6304534b",
    tcgPlayer: 561974,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "FEARSOME ROAR",
      description: "When you play this character, you may banish chosen item or location.",
    },
  ],
  classifications: ["Floodborn", "Hero", "King"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "xnq-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "xnq-2",
      name: "FEARSOME ROAR",
      text: "FEARSOME ROAR When you play this character, you may banish chosen item or location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
