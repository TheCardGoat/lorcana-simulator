import type { CharacterCard } from "@tcg/lorcana-types";

export const transformedChefCastleStove: CharacterCard = {
  id: "kyi",
  canonicalId: "ci_kyi",
  reprints: ["set4-157"],
  cardType: "character",
  name: "Transformed Chef",
  version: "Castle Stove",
  i18n: {
    en: {
      name: "Transformed Chef",
      version: "Castle Stove",
      text: [
        {
          title: "A CULINARY MASTERPIECE",
          description: "When you play this character, remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Verwandelter Küchenchef",
      version: "Schloss-Ofen",
      text: [
        {
          title: "EIN KULINARISCHES MEISTERWERK",
          description:
            "Wenn du diesen Charakter ausspielst, entferne bis zu 2 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Chef Transformé",
      version: "Poêle du château",
      text: [
        {
          title: "MIJOTER DES PETITS PLATS",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et retirez-lui jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Chef Trasformato",
      version: "Fuochista del Castello",
      text: [
        {
          title: "UN CAPOLAVORO DI CULINARIA",
          description:
            "Quando giochi questo personaggio, rimuovi fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 157,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a5ecfd31d79b4556ab6bf7233081349c",
    tcgPlayer: 550528,
  },
  text: [
    {
      title: "A CULINARY MASTERPIECE",
      description: "When you play this character, remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "1t8-1",
      name: "A CULINARY MASTERPIECE",
      text: "A CULINARY MASTERPIECE When you play this character, remove up to 2 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
