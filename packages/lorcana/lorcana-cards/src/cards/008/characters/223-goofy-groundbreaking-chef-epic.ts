import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyGroundbreakingChefEpic: CharacterCard = {
  id: "TRK",
  canonicalId: "ci_fqx",
  reprints: ["set8-004"],
  cardType: "character",
  name: "Goofy",
  version: "Groundbreaking Chef",
  i18n: {
    en: {
      name: "Goofy",
      version: "Groundbreaking Chef",
      text: [
        {
          title: "PLENTY TO GO AROUND",
          description:
            "At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Bahnbrechender Koch",
      text: [
        {
          title: "JEDE MENGE ZU TUN",
          description:
            "Am Ende deines Zuges darfst du bis zu 1 Schaden von jedem deiner anderen Charaktere entfernen. Mache jeden Charakter bereit, von dem auf diese Weise Schaden entfernt wurde.",
        },
      ],
    },
    fr: {
      name: "Dingo",
      version: "Chef avant-gardiste",
      text: [
        {
          title: "SUFFISAMMENT POUR TOUT LE MONDE À",
          description:
            "la fin de votre tour, vous pouvez retirer jusqu'à 1 dommage de chacun de vos autres personnages. Redressez chaque personnage à qui vous avez retiré un dommage de cette façon.",
        },
      ],
    },
    it: {
      name: "Goofy",
      version: "Groundbreaking Chef",
      text: [
        {
          title: "PLENTY TO GO AROUND",
          description:
            "At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "008",
  cardNumber: 223,
  rarity: "legendary",
  specialRarity: "epic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5271034abc194947b4c2b0e9c66b7f78",
    tcgPlayer: 632719,
  },
  text: [
    {
      title: "PLENTY TO GO AROUND",
      description:
        "At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "all",
            count: "all",
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "t21-1",
      text: "PLENTY TO GO AROUND At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
      type: "action",
    },
  ],
};
