import type { CharacterCard } from "@tcg/lorcana-types";

export const pascalRapunzelsCompanion: CharacterCard = {
  id: "81V",
  canonicalId: "ci_81V",
  reprints: ["set1-053"],
  cardType: "character",
  name: "Pascal",
  version: "Rapunzel’s Companion",
  i18n: {
    en: {
      name: "Pascal",
      version: "Rapunzel’s Companion",
      text: [
        {
          title: "CAMOUFLAGE",
          description: "While you have another character in play, this character gains Evasive.",
        },
      ],
    },
    de: {
      name: "Pascal",
      version: "Rapunzels Begleiter",
      text: [
        {
          title: "TARNUNG",
          description:
            "Dieser Charakter erhält Wendig, solange du mindestens einen weiteren Charakter im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "PASCAL",
      version: "Compagnon de Raiponce",
      text: [
        {
          title: "CAMOUFLAGE",
          description:
            "Tant que vous avez un autre personnage en jeu, ce personnage gagne Insaisissable. (Seuls les personnages avec Insaisissable peuvent le défier.)",
        },
      ],
    },
    it: {
      name: "Pascal",
      version: "Rapunzel’s Companion",
      text: [
        {
          title: "CAMOUFLAGE",
          description:
            "While you have another character in play, this character gains Evasive. (Only characters with Evasive can challenge them.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 53,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_52d47bf453634824858ebdd26f42d5f6",
    tcgPlayer: 493488,
  },
  text: [
    {
      title: "CAMOUFLAGE",
      description: "While you have another character in play, this character gains Evasive.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1f9-1",
      name: "CAMOUFLAGE",
      text: "CAMOUFLAGE While you have another character in play, this character gains Evasive.",
      type: "static",
    },
  ],
};
