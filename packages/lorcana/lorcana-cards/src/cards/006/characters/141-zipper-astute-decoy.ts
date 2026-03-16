import type { CharacterCard } from "@tcg/lorcana-types";

export const zipperAstuteDecoy: CharacterCard = {
  id: "aVD",
  canonicalId: "ci_aVD",
  reprints: ["set6-141"],
  cardType: "character",
  name: "Zipper",
  version: "Astute Decoy",
  i18n: {
    en: {
      name: "Zipper",
      version: "Astute Decoy",
      text: [
        {
          title: "Ward",
        },
        {
          title: "RUN INTERFERENCE",
          description:
            "During your turn, whenever a card is put into your inkwell, another chosen character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Summi",
      version: "Scharfsinniger Lockvogel",
      text: "Behütet EINGREIFEN Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält ein anderer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Ruzor",
      version: "Leurre astucieux",
      text: "Hors d'atteinte EN INTERPOSITION Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un autre personnage qui gagne Résistance +1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Zipper",
      version: "Astuto Diversivo",
      text: "Protetto INTERFERIRE Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un altro personaggio a tua scelta ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 141,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_975737e961724e1983ed15fa1f6fbb33",
    tcgPlayer: 588338,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "RUN INTERFERENCE",
      description:
        "During your turn, whenever a card is put into your inkwell, another chosen character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "n08-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 1,
      },
      id: "n08-2",
      name: "RUN INTERFERENCE",
      text: "RUN INTERFERENCE During your turn, whenever a card is put into your inkwell, another chosen character gains Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
