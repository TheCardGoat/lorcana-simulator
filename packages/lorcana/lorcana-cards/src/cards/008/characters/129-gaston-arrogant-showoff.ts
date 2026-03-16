import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonArrogantShowoff: CharacterCard = {
  id: "Ooh",
  canonicalId: "ci_Ooh",
  reprints: ["set8-129"],
  cardType: "character",
  name: "Gaston",
  version: "Arrogant Showoff",
  i18n: {
    en: {
      name: "Gaston",
      version: "Arrogant Showoff",
      text: [
        {
          title: "BREAK APART",
          description:
            "When you play this character, you may banish one of your items to give chosen character +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Gaston",
      version: "Arroganter Angeber",
      text: [
        {
          title: "AUFBRECHEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner Gegenstände verbannen, um einem Charakter deiner Wahl in diesem Zug +2 zu geben.",
        },
      ],
    },
    fr: {
      name: "Gaston",
      version: "Crâneur arrogant",
      text: [
        {
          title: "BRISER EN DEUX",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez bannir l'un de vos objets pour choisir un personnage qui gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Gaston",
      version: "Arrogante Esibizionista",
      text: [
        {
          title: "FARE A PEZZI",
          description:
            "Quando giochi questo personaggio, puoi esiliare uno dei tuoi oggetti per dare a un personaggio a tua scelta +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 129,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0e17eaad60a343068204ccdf776daa36",
    tcgPlayer: 632687,
  },
  text: [
    {
      title: "BREAK APART",
      description:
        "When you play this character, you may banish one of your items to give chosen character +2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "is0-1",
      name: "BREAK APART",
      text: "BREAK APART When you play this character, you may banish one of your items to give chosen character +2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
