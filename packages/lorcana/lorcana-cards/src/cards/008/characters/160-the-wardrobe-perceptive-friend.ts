import type { CharacterCard } from "@tcg/lorcana-types";

export const theWardrobePerceptiveFriend: CharacterCard = {
  id: "MRR",
  canonicalId: "ci_MRR",
  reprints: ["set8-160"],
  cardType: "character",
  name: "The Wardrobe",
  version: "Perceptive Friend",
  i18n: {
    en: {
      name: "The Wardrobe",
      version: "Perceptive Friend",
      text: [
        {
          title: "I HAVE JUST THE THING!",
        },
        {
          title: "{E},",
          description: "Choose and discard an item card — Draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Mme. Kommode",
      version: "Aufmerksame Freundin",
      text: [
        {
          title: "DAS HIER PASST BESTIMMT!,",
          description:
            "Wähle eine Gegenstandskarte aus deiner Hand und wirf sie ab — Ziehe 2 Karten.",
        },
      ],
    },
    fr: {
      name: "Madame De Garderobe",
      version: "Amie perspicace",
      text: [
        {
          title: "J'AI CE QU'IL VOUS FAUT!,",
          description: "Défaussez un objet — Piochez 2 cartes.",
        },
      ],
    },
    it: {
      name: "L'Armadio",
      version: "Amica Perspicace",
      text: [
        {
          title: "HO PROPRIO LA COSA GIUSTA!,",
          description: "scegli e scarta una carta oggetto — Pesca 2 carte.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 160,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_00a8d41f53554e5b9151021f4bd59f41",
    tcgPlayer: 631457,
  },
  text: [
    {
      title: "I HAVE JUST THE THING!",
    },
    {
      title: "{E},",
      description: "Choose and discard an item card — Draw 2 cards.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 2,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "s0r-1",
      text: "I HAVE JUST THE THING! , Choose and discard an item card — Draw 2 cards.",
      type: "action",
    },
  ],
};
