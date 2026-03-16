import type { ItemCard } from "@tcg/lorcana-types";

export const lantern: ItemCard = {
  id: "XaO",
  canonicalId: "ci_38Q",
  reprints: ["set1-033", "set9-032"],
  cardType: "item",
  name: "Lantern",
  i18n: {
    en: {
      name: "Lantern",
      text: [
        {
          title: "BIRTHDAY LIGHTS",
          description: "{E} — You pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Himmelslaterne",
      text: [
        {
          title: "GEBURTSTAGSLICHTER",
          description:
            "— Du zahlst 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "LANTERNE",
      text: [
        {
          title: "LUMIÈRES D'ANNIVERSAIRE",
          description: "— Le prochain personnage que vous jouez durant ce tour coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Lanterna",
      text: [
        {
          title: "LUCI DI COMPLEANNO",
          description: "— Paga 1 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "009",
  cardNumber: 32,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c77ef321da53426c9f7d856202152b2e",
    tcgPlayer: 649979,
  },
  text: [
    {
      title: "BIRTHDAY LIGHTS",
      description: "{E} — You pay 1 {I} less for the next character you play this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "o5u-1",
      name: "BIRTHDAY LIGHTS",
      text: "BIRTHDAY LIGHTS {E} — You pay 1 {I} less for the next character you play this turn.",
      type: "activated",
    },
  ],
};
