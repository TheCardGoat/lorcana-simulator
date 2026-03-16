import type { CharacterCard } from "@tcg/lorcana-types";

export const puaPotbelliedBuddy: CharacterCard = {
  id: "rYO",
  canonicalId: "ci_rYO",
  reprints: ["set3-053"],
  cardType: "character",
  name: "Pua",
  version: "Potbellied Buddy",
  i18n: {
    en: {
      name: "Pua",
      version: "Potbellied Buddy",
      text: [
        {
          title: "ALWAYS THERE",
          description: "When this character is banished, you may shuffle this card into your deck.",
        },
      ],
    },
    de: {
      name: "Pua",
      version: "Hängebauch-Freund",
      text: [
        {
          title: "IMMER DABEI",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte in dein Deck mischen.",
        },
      ],
    },
    fr: {
      name: "Pua",
      version: "Compagnon bedonnant",
      text: [
        {
          title: "TOUJOURS À TES CÔTÉS",
          description:
            "Lorsque ce personnage est banni, vous pouvez le remélanger dans votre pioche.",
        },
      ],
    },
    it: {
      name: "Pua",
      version: "Amico Panciuto",
      text: [
        {
          title: "SEMPRE PRESENTE",
          description:
            "Quando questo personaggio viene esiliato, puoi rimescolare questa carta nel tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "003",
  cardNumber: 53,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_835c907af9be4b9d93b301eb3324b83e",
    tcgPlayer: 538216,
  },
  text: [
    {
      title: "ALWAYS THERE",
      description: "When this character is banished, you may shuffle this card into your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          intoDeck: "owner",
          target: "SELF",
          type: "shuffle-into-deck",
        },
        type: "optional",
      },
      id: "19j-1",
      name: "ALWAYS THERE",
      text: "ALWAYS THERE When this character is banished, you may shuffle this card into your deck.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
