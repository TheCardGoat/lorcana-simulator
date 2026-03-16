import type { CharacterCard } from "@tcg/lorcana-types";

export const scarEerilyPrepared: CharacterCard = {
  id: "ETj",
  canonicalId: "ci_ETj",
  reprints: ["set10-153"],
  cardType: "character",
  name: "Scar",
  version: "Eerily Prepared",
  i18n: {
    en: {
      name: "Scar",
      version: "Eerily Prepared",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "SURVIVAL OF THE FITTEST",
          description:
            "Whenever you put a card under this character, chosen opposing character gets -5 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Unheimlich bereit",
      text: "Stärken 2 DAS ÜBERLEBEN DES STÄRKEREN Jedes Mal, wenn du eine Karte unter diesen Charakter legst, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -5.",
    },
    fr: {
      name: "Scar",
      version: "Étrangement prêt",
      text: "Boost 2 SURVIE DU PLUS APTE Chaque fois que vous placez une carte sous ce personnage, choisissez un personnage adverse qui subit -5 pour le reste de ce tour.",
    },
    it: {
      name: "Scar",
      version: "Misteriosamente Pronto",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) LEGGE DELLA GIUNGLA Ogni volta che metti una carta sotto a questo personaggio, un personaggio avversario a tua scelta riceve -5 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lion King",
  set: "010",
  cardNumber: 153,
  rarity: "common",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f2674e110de64c81ae9b07068364c22d",
    tcgPlayer: 659384,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "SURVIVAL OF THE FITTEST",
      description:
        "Whenever you put a card under this character, chosen opposing character gets -5 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Whisper"],
  abilities: [
    {
      id: "1rg-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        duration: "this-turn",
        modifier: -5,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1rg-2",
      name: "SURVIVAL OF THE FITTEST",
      text: "SURVIVAL OF THE FITTEST Whenever you put a card under this character, chosen opposing character gets -5 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
