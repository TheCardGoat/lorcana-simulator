import type { CharacterCard } from "@tcg/lorcana-types";

export const drFacilierRemarkableGentleman: CharacterCard = {
  id: "BMe",
  canonicalId: "ci_BMe",
  reprints: ["set1-039"],
  cardType: "character",
  name: "Dr. Facilier",
  version: "Remarkable Gentleman",
  i18n: {
    en: {
      name: "Dr. Facilier",
      version: "Remarkable Gentleman",
      text: [
        {
          title: "DREAMS MADE REAL",
          description:
            "Whenever you play a song, you may look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
        },
      ],
    },
    de: {
      name: "Dr. Facilier",
      version: "Bemerkenswerter Gentleman",
      text: [
        {
          title: "TRÄUME WERDEN WAHR",
          description:
            "Jedes Mal, wenn du ein Lied ausspielst, darfst du dir die obersten 2 Karten deines Decks anschauen. Lege 1 davon auf dein Deck und die andere unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "DR. FACILIER",
      version: "Étrange gentleman",
      text: [
        {
          title: "RÊVES RÉALISÉS",
          description:
            "Lorsque vous jouez une chanson, vous pouvez regarder les 2 premières cartes de votre pioche. Remettez-en une sur le dessus de votre pioche et l'autre en dessous.",
        },
      ],
    },
    it: {
      name: "Dr. Facilier",
      version: "Remarkable Gentleman",
      text: [
        {
          title: "DREAMS MADE REAL",
          description:
            "Whenever you play a song, you may look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "001",
  cardNumber: 39,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_7c6dbcfcfb90484c9e7d5f28cee46687",
    tcgPlayer: 508727,
  },
  text: [
    {
      title: "DREAMS MADE REAL",
      description:
        "Whenever you play a song, you may look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          destinations: [
            {
              zone: "deck-top",
              min: 1,
              max: 1,
            },
            {
              zone: "deck-bottom",
              remainder: true,
            },
          ],
          type: "scry",
        },
        type: "optional",
      },
      id: "xhk-1",
      name: "DREAMS MADE REAL",
      text: "**DREAMS MADE REAL** Whenever you play a song, you may look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
      trigger: {
        event: "play",
        on: {
          cardType: "song",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
