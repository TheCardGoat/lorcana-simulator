import type { ActionCard } from "@tcg/lorcana-types";

export const wipeOut: ActionCard = {
  id: "5P4",
  canonicalId: "ci_5P4",
  reprints: ["set11-165"],
  cardType: "action",
  name: "Wipe Out!",
  i18n: {
    en: {
      name: "Wipe Out!",
      text: "Put chosen character with Bodyguard or item into their player's inkwell facedown and exerted.",
    },
    de: {
      name: "Wegrutschen!",
      text: "Lege einen Charakter deiner Wahl mit Beschützen oder einen Gegenstand deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat.",
    },
    fr: {
      name: "Chute !",
      text: "Choisissez un personnage avec Rempart ou un objet et placez-le dans la réserve d'encre de son propriétaire, face cachée et épuisé.",
    },
    it: {
      name: "Precipitare!",
      text: "Aggiungi un personaggio con Guardiano o un oggetto a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 165,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0d28e0cfc9ea44d4a568fa034fc67dbd",
    tcgPlayer: 676229,
  },
  text: "Put chosen character with Bodyguard or item into their player's inkwell facedown and exerted.",
  abilities: [
    {
      type: "action",
      text: "Put chosen character with Bodyguard or item into their player's inkwell facedown and exerted.",
      effect: {
        type: "put-into-inkwell",
        source: "chosen-card-in-play",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character", "item"],
          filter: [
            {
              type: "or",
              filters: [
                {
                  type: "card-type",
                  value: "item",
                },
                {
                  type: "and",
                  filters: [
                    {
                      type: "card-type",
                      value: "character",
                    },
                    {
                      type: "has-keyword",
                      keyword: "Bodyguard",
                    },
                  ],
                },
              ],
            },
          ],
        },
        facedown: true,
        exerted: true,
      },
    },
  ],
};
