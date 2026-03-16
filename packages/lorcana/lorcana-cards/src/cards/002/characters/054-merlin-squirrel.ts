import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinSquirrel: CharacterCard = {
  id: "sGp",
  canonicalId: "ci_sGp",
  reprints: ["set2-054"],
  cardType: "character",
  name: "Merlin",
  version: "Squirrel",
  i18n: {
    en: {
      name: "Merlin",
      version: "Squirrel",
      text: [
        {
          title: "LOOK BEFORE YOU LEAP",
          description:
            "When you play this character and when he leaves play, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Eichhörnchen",
      text: [
        {
          title: "GENAU HINSEHEN, BEVOR DU SPRINGST",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, schaue dir die oberste Karte deines Decks an. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "En écureuil",
      text: [
        {
          title: "CALCULE TON COUP AVANT DE BONDIR",
          description:
            "Lorsque vous jouez ce personnage et lorsqu'il quitte la zone de jeu, regardez la première carte de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Merlin",
      version: "Squirrel",
      text: [
        {
          title: "LOOK BEFORE YOU LEAP",
          description:
            "When you play this character and when he leaves play, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 54,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_68c2d4e87fa84e0bb650d5e2b9c0737b",
    tcgPlayer: 522209,
  },
  text: [
    {
      title: "LOOK BEFORE YOU LEAP",
      description:
        "When you play this character and when he leaves play, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "put-on-bottom",
      },
      id: "1qe-1",
      name: "LOOK BEFORE YOU LEAP When you play this character and",
      text: "LOOK BEFORE YOU LEAP When you play this character and when he leaves play, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
