import type { CharacterCard } from "@tcg/lorcana-types";

export const kidaCreativeThinker: CharacterCard = {
  id: "F39",
  canonicalId: "ci_F39",
  reprints: ["set7-164"],
  cardType: "character",
  name: "Kida",
  version: "Creative Thinker",
  i18n: {
    en: {
      name: "Kida",
      version: "Creative Thinker",
      text: [
        {
          title: "Ward",
        },
        {
          title: "KEY TO THE PUZZLE",
          description:
            "{E} — Look at the top 2 cards of your deck. Put one into your ink supply, face down and exerted, and the other on top of your deck.",
        },
      ],
    },
    de: {
      name: "Kida",
      version: "Kreative Denkerin",
      text: "Behütet DER SCHLÜSSEL ZUM RÄTSEL — Schaue dir die obersten 2 Karten deines Decks an. Lege eine davon verdeckt und erschöpft in deinen Tintenvorrat und die andere zurück auf dein Deck.",
    },
    fr: {
      name: "Kida",
      version: "Penseuse créative",
      text: "Hors d'atteinte CLÉ DE L'ÉNIGME — Regardez les 2 premières cartes de votre pioche. Placez-en une dans votre réserve d'encre, face cachée et épuisée, et l'autre sur votre pioche.",
    },
    it: {
      name: "Kida",
      version: "Pensatrice Creativa",
      text: "Protetto CHIAVE DELL'ENIGMA — Guarda le prime 2 carte del tuo mazzo. Aggiungine una al tuo calamaio, a faccia in giù e impegnata, e metti l'altra in cima al tuo mazzo.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 164,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_19e9e680d0d044d6a5fa0d39b5ab3206",
    tcgPlayer: 619501,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "KEY TO THE PUZZLE",
      description:
        "{E} — Look at the top 2 cards of your deck. Put one into your ink supply, face down and exerted, and the other on top of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "13v-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        destinations: [
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-bottom",
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      id: "13v-2",
      text: "KEY TO THE PUZZLE {E} – Look at the top 2 cards of your deck. Put one into your ink supply, face down and exerted, and the other on top of your deck.",
      type: "action",
    },
  ],
};
