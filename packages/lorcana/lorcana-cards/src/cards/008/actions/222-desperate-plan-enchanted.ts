import type { ActionCard } from "@tcg/lorcana-types";

export const desperatePlanEnchanted: ActionCard = {
  id: "WBL",
  canonicalId: "ci_sk9",
  reprints: ["set8-201"],
  cardType: "action",
  name: "Desperate Plan",
  i18n: {
    en: {
      name: "Desperate Plan",
      text: "If you have no cards in your hand, draw until you have 3 cards in your hand. Otherwise, choose and discard any number of cards, then draw that many cards.",
    },
    de: {
      name: "Verzweifelter Plan",
      text: "Falls du keine Karten auf der Hand hast, ziehe so viele Karten, bis du 3 Karten auf deiner Hand hast. Andernfalls, wähle eine beliebige Anzahl an Karten von deiner Hand aus und wirf sie ab, um dieselbe Anzahl an Karten zu ziehen.",
    },
    fr: {
      name: "Plan désespéré",
      text: "Si vous n'avez aucune carte en main, piochez jusqu'à avoir 3 cartes en main. Sinon, défaussez n'importe quel nombre de cartes et piochez-en autant.",
    },
    it: {
      name: "Piano Disperato",
      text: "Se non hai carte in mano, pesca finché non hai 3 carte in mano. Altrimenti, scegli e scarta un qualsiasi numero di carte, poi pesca altrettante carte.",
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "008",
  cardNumber: 222,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_cfbcf752b5064d1e8abfc2a2c6d3e98a",
    tcgPlayer: 631990,
  },
  text: "If you have no cards in your hand, draw until you have 3 cards in your hand. Otherwise, choose and discard any number of cards, then draw that many cards.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "conditional",
        condition: {
          type: "resource-count",
          controller: "you",
          what: "cards-in-hand",
          comparison: "equal",
          value: 0,
        },
        then: {
          type: "draw-until-hand-size",
          size: 3,
          target: "CONTROLLER",
        },
        else: {
          type: "sequence",
          steps: [
            {
              type: "discard",
              target: "CONTROLLER",
              from: "hand",
              chosen: true,
              amount: "DISCARDED_COUNT",
            },
            {
              type: "draw",
              amount: "DISCARDED_COUNT",
              target: "CONTROLLER",
            },
          ],
        },
      },
    },
  ],
};
