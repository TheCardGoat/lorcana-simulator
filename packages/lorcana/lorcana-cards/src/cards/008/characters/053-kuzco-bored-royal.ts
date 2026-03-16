import type { CharacterCard } from "@tcg/lorcana-types";

export const kuzcoBoredRoyal: CharacterCard = {
  id: "AdI",
  canonicalId: "ci_AdI",
  reprints: ["set8-053"],
  cardType: "character",
  name: "Kuzco",
  version: "Bored Royal",
  i18n: {
    en: {
      name: "Kuzco",
      version: "Bored Royal",
      text: [
        {
          title: "LLAMA BREATH",
          description:
            "When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Kusco",
      version: "Gelangweilter König",
      text: [
        {
          title: "LAMA-ATEM",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter, Gegenstand oder Ort deiner Wahl, der 2 oder weniger kostet, zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Kuzco",
      version: "Ennui royal",
      text: [
        {
          title: "HALEINE DE LAMA",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage, un objet ou un lieu coûtant 2 ou moins et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Kuzco",
      version: "Reale Annoiato",
      text: [
        {
          title: "ALITO DI LAMA",
          description:
            "Quando giochi questo personaggio, puoi far riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo a tua scelta con costo 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 53,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5508d787ca204fdcbba52a26d7258301",
    tcgPlayer: 631387,
  },
  text: [
    {
      title: "LLAMA BREATH",
      description:
        "When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "King"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "p9g-1",
      name: "LLAMA BREATH",
      text: "LLAMA BREATH When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
