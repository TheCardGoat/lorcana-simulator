import type { ActionCard } from "@tcg/lorcana-types";

export const iFindEmIFlattenEm: ActionCard = {
  id: "ly1",
  canonicalId: "ci_lHK",
  reprints: ["set4-196", "set9-199"],
  cardType: "action",
  name: "I Find ’Em, I Flatten ’Em",
  i18n: {
    en: {
      name: "I Find ’Em, I Flatten ’Em",
      text: "Banish all items.",
    },
    de: {
      name: "Ja, ich trete es klein",
      text: "Verbanne alle Gegenstände.",
    },
    fr: {
      name: "Ils cassent en deux comme je veux",
      text: "Bannissez tous les objets.",
    },
    it: {
      name: "Una Furia Vivente",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Esilia tutti gli oggetti.",
    },
  },
  inkType: ["steel"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 199,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_47f56a5b08b04ccda46e94744710ad9c",
    tcgPlayer: 650132,
  },
  text: "Banish all items.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "banish",
        target: {
          selector: "all",
          count: "all",
          owner: "any",
          zones: ["play"],
          cardTypes: ["item"],
        },
      },
    },
  ],
};
