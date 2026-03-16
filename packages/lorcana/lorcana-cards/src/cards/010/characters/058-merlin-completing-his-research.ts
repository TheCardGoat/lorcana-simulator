import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinCompletingHisResearch: CharacterCard = {
  id: "JaP",
  canonicalId: "ci_Vvr",
  reprints: ["set10-058"],
  cardType: "character",
  name: "Merlin",
  version: "Completing His Research",
  i18n: {
    en: {
      name: "Merlin",
      version: "Completing His Research",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "LEGACY OF LEARNING",
          description:
            "When this character is banished in a challenge, if he had a card under him, draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Vollendet seine Forschung",
      text: "Stärken 2 ERBE DES LERNENS Wenn dieser Charakter durch eine Herausforderung verbannt wird, falls er mindestens eine Karte unter sich hatte, ziehe 2 Karten.",
    },
    fr: {
      name: "Merlin",
      version: "Terminant ses recherches",
      text: "Boost 2 HÉRITAGE DE CONNAISSANCES Lorsque ce personnage est banni via un défi, s'il y avait une carte sous lui, piochez 2 cartes.",
    },
    it: {
      name: "Merlino",
      version: "Che Completa le Sue Ricerche",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) L'EREDITÀ DELL'ERUDITO Quando questo personaggio viene esiliato in una sfida, se aveva una carta sotto di sé, pesca 2 carte.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "010",
  cardNumber: 58,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d51cdd2a1d904e03adb5e255a2b53a22",
    tcgPlayer: 660189,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "LEGACY OF LEARNING",
      description:
        "When this character is banished in a challenge, if he had a card under him, draw 2 cards.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer", "Whisper"],
  abilities: [
    {
      id: "mr7-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "mr7-2",
      effect: {
        condition: {
          expression: "he had a card under him",
          type: "if",
        },
        then: {
          amount: 2,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "LEGACY OF LEARNING",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LEGACY OF LEARNING When this character is banished in a challenge, if he had a card under him, draw 2 cards.",
    },
  ],
};
