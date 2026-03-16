import type { ActionCard } from "@tcg/lorcana-types";

export const twitterpated: ActionCard = {
  id: "WEP",
  canonicalId: "ci_WEP",
  reprints: ["set8-150"],
  cardType: "action",
  name: "Twitterpated",
  i18n: {
    en: {
      name: "Twitterpated",
      text: "Chosen character gains Evasive until the start of your next turn.",
    },
    de: {
      name: "Schwer verknallt",
      text: "Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Batifolage",
      text: "Choisissez un personnage qui gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Rincitrullulito",
      text: "Un personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
    },
  },
  inkType: ["ruby"],
  franchise: "Bambi",
  set: "008",
  cardNumber: 150,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5bdb76e9410847a48c43a4a8b0f2ef81",
    tcgPlayer: 631450,
  },
  text: "Chosen character gains Evasive until the start of your next turn.",
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "11m-1",
      text: "Chosen character gains Evasive until the start of your next turn.",
      type: "action",
    },
  ],
};
