import type { CharacterCard } from "@tcg/lorcana-types";

export const kitCloudkickerToughGuy: CharacterCard = {
  id: "th7",
  canonicalId: "ci_th7",
  reprints: ["set3-077"],
  cardType: "character",
  name: "Kit Cloudkicker",
  version: "Tough Guy",
  i18n: {
    en: {
      name: "Kit Cloudkicker",
      version: "Tough Guy",
      text: [
        {
          title: "SKYSURFING",
          description:
            "When you play this character, you may return chosen opposing character with 2 {S} or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Kit Wolkenflitzer",
      version: "Harter Bursche",
      text: [
        {
          title: "WOLKENSURFEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen gegnerischen Charakter deiner Wahl, mit 2 oder weniger, zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Kit",
      version: "Dur à cuire",
      text: [
        {
          title: "SURFEUR DES AIRS",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse ayant 2 ou moins et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Kit Nuvoletta",
      version: "Tipo Tosto",
      text: [
        {
          title: "SURF TRA LE NUVOLE",
          description:
            "Quando giochi questo personaggio, puoi far tornare un personaggio avversario a tua scelta con 2 o inferiore in mano al suo giocatore.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 77,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e672bba7d4c5402f82d9360fca1594f5",
    tcgPlayer: 538357,
  },
  text: [
    {
      title: "SKYSURFING",
      description:
        "When you play this character, you may return chosen opposing character with 2 {S} or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "c40-1",
      name: "SKYSURFING",
      text: "SKYSURFING When you play this character, you may return chosen opposing character with 2 {S} or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
