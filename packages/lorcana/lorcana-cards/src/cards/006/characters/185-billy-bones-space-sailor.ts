import type { CharacterCard } from "@tcg/lorcana-types";

export const billyBonesSpaceSailor: CharacterCard = {
  id: "MbE",
  canonicalId: "ci_MbE",
  reprints: ["set6-185"],
  cardType: "character",
  name: "Billy Bones",
  version: "Space Sailor",
  i18n: {
    en: {
      name: "Billy Bones",
      version: "Space Sailor",
      text: [
        {
          title: "KEEP IT HIDDEN",
          description: "When this character is banished, you may banish chosen item or location.",
        },
      ],
    },
    de: {
      name: "Billy Bones",
      version: "Weltraum-Segler",
      text: [
        {
          title: "HALT ES VERSTECKT",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du einen Gegenstand oder Ort deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Billy Bones",
      version: "Marin de l'espace",
      text: [
        {
          title: "CACHE-LE BIEN",
          description:
            "Lorsque ce personnage est banni, vous pouvez choisir un objet ou un lieu et le bannir.",
        },
      ],
    },
    it: {
      name: "Billy Bones",
      version: "Marinaio Spaziale",
      text: [
        {
          title: "TIENILO NASCOSTO",
          description:
            "Quando questo personaggio viene esiliato, puoi esiliare un oggetto o un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 185,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bd9c0c2fd69e467c82c247d1733c0d19",
    tcgPlayer: 587375,
  },
  text: [
    {
      title: "KEEP IT HIDDEN",
      description: "When this character is banished, you may banish chosen item or location.",
    },
  ],
  classifications: ["Storyborn", "Alien", "Pirate"],
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
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "1oc-1",
      name: "KEEP IT HIDDEN",
      text: "KEEP IT HIDDEN When this character is banished, you may banish chosen item or location.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
