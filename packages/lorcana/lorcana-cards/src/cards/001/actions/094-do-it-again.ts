import type { ActionCard } from "@tcg/lorcana-types";

export const doItAgain: ActionCard = {
  id: "27H",
  canonicalId: "ci_27H",
  reprints: ["set1-094"],
  cardType: "action",
  name: "Do It Again!",
  i18n: {
    en: {
      name: "Do It Again!",
      text: "Return an action card from your discard to your hand.",
    },
    de: {
      name: "Mach es noch mal!",
      text: "Nimm 1 Aktionskarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "RECOMMENCE !",
      text: "Reprenez en main une carte action de votre défausse.",
    },
    it: {
      name: "Do It Again!",
      text: "Return an action card from your discard to your hand.",
    },
  },
  inkType: ["emerald"],
  franchise: "Cinderella",
  set: "001",
  cardNumber: 94,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_c6e59761b01b488b9a46b1dbfb30707e",
    tcgPlayer: 506830,
  },
  text: "Return an action card from your discard to your hand.",
  abilities: [
    {
      type: "action",
      effect: {
        cardType: "action",
        target: "CONTROLLER",
        type: "return-from-discard",
      },
    },
  ],
};
