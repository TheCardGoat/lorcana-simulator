import type { CharacterCard } from "@tcg/lorcana-types";

export const jimHawkinsSpaceTraveler: CharacterCard = {
  id: "emY",
  canonicalId: "ci_emY",
  reprints: ["set3-109"],
  cardType: "character",
  name: "Jim Hawkins",
  version: "Space Traveler",
  i18n: {
    en: {
      name: "Jim Hawkins",
      version: "Space Traveler",
      text: [
        {
          title: "THIS IS IT!",
          description:
            "When you play this character, you may play a location with cost 4 or less for free.",
        },
        {
          title: "TAKE THE HELM",
          description: "Whenever you play a location, this character may move there for free.",
        },
      ],
    },
    de: {
      name: "Jim Hawkins",
      version: "Raumfahrer",
      text: [
        {
          title: "DAS IST ES!",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Ort, der 4 oder weniger kostet, kostenlos ausspielen.",
        },
        {
          title: "ANS RUDER STELLEN",
          description:
            "Jedes Mal, wenn du einen Ort ausspielst, darfst du diesen Charakter kostenlos zu diesem Ort bewegen.",
        },
      ],
    },
    fr: {
      name: "Jim Hawkins",
      version: "Voyageur de l'espace",
      text: [
        {
          title: "C'EST GAGNÉ!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez jouer gratuitement un lieu coûtant 4 ou moins.",
        },
        {
          title: "IL FAUT TE METTRE À LA BARRE",
          description:
            "Chaque fois que vous jouez un lieu, vous pouvez y déplacer ce personnage gratuitement.",
        },
      ],
    },
    it: {
      name: "Jim Hawkins",
      version: "Viaggiatore Spaziale",
      text: [
        {
          title: "GUARDA QUI!",
          description:
            "Quando giochi questo personaggio, puoi giocare gratis un luogo con costo 4 o inferiore.",
        },
        {
          title: "PRENDERE IN MANO IL TIMONE",
          description:
            "Ogni volta che giochi un luogo, questo personaggio può spostarsi in quel luogo gratis.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 109,
  rarity: "legendary",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_163516a9fa684676b2bed66aa7a64a35",
    tcgPlayer: 532660,
  },
  text: [
    {
      title: "THIS IS IT!",
      description:
        "When you play this character, you may play a location with cost 4 or less for free.",
    },
    {
      title: "TAKE THE HELM",
      description: "Whenever you play a location, this character may move there for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
