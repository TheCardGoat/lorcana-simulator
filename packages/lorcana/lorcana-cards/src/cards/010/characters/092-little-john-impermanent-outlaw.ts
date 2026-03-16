import type { CharacterCard } from "@tcg/lorcana-types";

export const littleJohnImpermanentOutlaw: CharacterCard = {
  id: "eD4",
  canonicalId: "ci_eD4",
  reprints: ["set10-092"],
  cardType: "character",
  name: "Little John",
  version: "Impermanent Outlaw",
  i18n: {
    en: {
      name: "Little John",
      version: "Impermanent Outlaw",
      text: [
        {
          title: "Boost 3 {I}",
        },
        {
          title: "READY TO RASSLE",
          description: "Whenever you put a card under this character, ready him.",
        },
      ],
    },
    de: {
      name: "Little John",
      version: "Vorübergehend Geächteter",
      text: "Stärken 3 BEREIT, ZU RANDALIEREN Jedes Mal, wenn du eine Karte unter diesen Charakter legst, mache ihn bereit.",
    },
    fr: {
      name: "Petit Jean",
      version: "Hors-la-loi éphémère",
      text: "Boost 3 PRÊT À LA CASTAGNE Chaque fois qu'une carte est placée sous ce personnage, redressez-le.",
    },
    it: {
      name: "Little John",
      version: "Fuorilegge Fugace",
      text: [
        {
          title: "Potenziamento 3",
          description:
            "(Una volta durante il tuo turno, puoi pagare 3 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) PRONTO ALLA LOTTA Ogni volta che metti una carta sotto a questo personaggio, preparalo.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "010",
  cardNumber: 92,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_b3668f2df08949359912fa775c750a52",
    tcgPlayer: 659413,
  },
  text: [
    {
      title: "Boost 3 {I}",
    },
    {
      title: "READY TO RASSLE",
      description: "Whenever you put a card under this character, ready him.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "196-1",
      keyword: "Boost",
      text: "Boost 3 {I}",
      type: "keyword",
      value: 3,
    },
    {
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "ready",
      },
      id: "196-2",
      name: "READY TO RASSLE",
      text: "READY TO RASSLE Whenever you put a card under this character, ready him.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
