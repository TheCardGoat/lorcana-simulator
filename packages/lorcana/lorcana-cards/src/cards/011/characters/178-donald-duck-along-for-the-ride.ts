import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckAlongForTheRide: CharacterCard = {
  id: "I70",
  canonicalId: "ci_4PF",
  reprints: ["set11-178"],
  cardType: "character",
  name: "Donald Duck",
  version: "Along for the Ride",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Along for the Ride",
      text: [
        {
          title: "COMIN' THROUGH!",
          description: "When you play this character, you may banish chosen item.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Mit auf der Reise",
      text: [
        {
          title: "ICH BRECHE DURCH!",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Se laisse embarquer",
      text: [
        {
          title: "ATTENTION, J'ARRIVE!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un objet et le bannir.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Che Si Lascia Trasportare",
      text: [
        {
          title: "FATE LARGO!",
          description: "Quando giochi questo personaggio, puoi esiliare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "011",
  cardNumber: 178,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_197bd1d5d07843d49d892ea9536fcbed",
    tcgPlayer: 677155,
  },
  text: [
    {
      title: "COMIN' THROUGH!",
      description: "When you play this character, you may banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "s02-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["item"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "banish",
        },
        type: "optional",
      },
      type: "action",
      text: "COMIN’ THROUGH! When you play this character, you may banish chosen item.",
    },
  ],
};
