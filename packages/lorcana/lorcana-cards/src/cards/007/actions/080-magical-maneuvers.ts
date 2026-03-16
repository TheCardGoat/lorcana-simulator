import type { ActionCard } from "@tcg/lorcana-types";

export const magicalManeuvers: ActionCard = {
  id: "9hd",
  canonicalId: "ci_9hd",
  reprints: ["set7-080"],
  cardType: "action",
  name: "Magical Maneuvers",
  i18n: {
    en: {
      name: "Magical Maneuvers",
      text: "Return chosen character of yours to your hand. Exert chosen character.",
    },
    de: {
      name: "Magische Manöver",
      text: "Wähle einen deiner Charaktere und nimm ihn zurück auf deine Hand. Erschöpfe einen Charakter deiner Wahl.",
    },
    fr: {
      name: "Manœuvres magiques",
      text: "Choisissez l'un de vos personnages et renvoyez-le dans votre main. Choisissez un personnage et épuisez-le.",
    },
    it: {
      name: "Manovre Magiche",
      text: "Riprendi in mano un tuo personaggio a tua scelta. Impegna un personaggio a tua scelta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "007",
  cardNumber: 80,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a03dfd74bc3343a883df4bb71b193f0c",
    tcgPlayer: 618702,
  },
  text: "Return chosen character of yours to your hand. Exert chosen character.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "return-to-hand",
          },
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "exert",
          },
        ],
        type: "sequence",
      },
      id: "1nx-1",
      text: "Return chosen character of yours to your hand. Exert chosen character.",
      type: "action",
    },
  ],
};
