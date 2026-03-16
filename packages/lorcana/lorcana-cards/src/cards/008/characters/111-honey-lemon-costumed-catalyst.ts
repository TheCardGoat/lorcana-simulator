import type { CharacterCard } from "@tcg/lorcana-types";

export const honeyLemonCostumedCatalyst: CharacterCard = {
  id: "MDv",
  canonicalId: "ci_MDv",
  reprints: ["set8-111"],
  cardType: "character",
  name: "Honey Lemon",
  version: "Costumed Catalyst",
  i18n: {
    en: {
      name: "Honey Lemon",
      version: "Costumed Catalyst",
      text: [
        {
          title: "LET'S DO THIS!",
          description:
            "Whenever you play a Floodborn character, if you used Shift to play them, you may return chosen character to their player's hand.",
        },
      ],
    },
    de: {
      name: "Honey Lemon",
      version: "Kostümierter Katalysator",
      text: [
        {
          title: "ZIEHEN WIR ES DURCH!",
          description:
            "Jedes Mal, wenn du mithilfe von Gestaltwandel eine Flutgestalt ausspielst, darfst du einen Charakter deiner Wahl zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Honey Lemon",
      version: "Catalyseuse costumée",
      text: [
        {
          title: "C'EST PARTI!",
          description:
            "Chaque fois que vous jouez un personnage Floodborn en utilisant sa capacité Alter, vous pouvez choisir un personnage et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Honey Lemon",
      version: "Catalizzatrice in Costume",
      text: [
        {
          title: "DIAMOCI DENTRO!",
          description:
            "Ogni volta che giochi un personaggio Imbevuto, se hai usato Trasformazione per giocarlo, puoi far riprendere in mano al suo giocatore un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 111,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_68a30037a4074eed8e5d0924b542cec9",
    tcgPlayer: 631421,
  },
  text: [
    {
      title: "LET'S DO THIS!",
      description:
        "Whenever you play a Floodborn character, if you used Shift to play them, you may return chosen character to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you used Shift to play them",
          type: "if",
        },
        then: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "conditional",
      },
      id: "1h9-1",
      name: "LET'S DO THIS!",
      text: "LET'S DO THIS! Whenever you play a Floodborn character, if you used Shift to play them, you may return chosen character to their player's hand.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
