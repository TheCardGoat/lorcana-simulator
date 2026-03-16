import type { ItemCard } from "@tcg/lorcana-types";

export const pawpsicle: ItemCard = {
  id: "VrY",
  canonicalId: "ci_VrY",
  reprints: ["set2-169"],
  cardType: "item",
  name: "Pawpsicle",
  i18n: {
    en: {
      name: "Pawpsicle",
      text: [
        {
          title: "JUMBO POP",
          description: "When you play this item, you may draw a card.",
        },
        {
          title: "THAT'S REDWOOD",
          description: "Banish this item — Remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Tatziatella",
      text: [
        {
          title: "JUMBO-POP",
          description: "Wenn du diesen Gegenstand ausspielst, darfst du 1 Karte ziehen.",
        },
        {
          title: "DAS IST KIRSCHHOLZ",
          description:
            "Verbanne diesen Gegenstand — Entferne bis zu 2 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Glace à l'eau",
      text: [
        {
          title: "JUMBO POP",
          description: "Lorsque vous jouez cet objet, vous pouvez piocher une carte.",
        },
        {
          title: "C'EST DU",
          description:
            "BÂTON ROUGE Bannissez cet objet — Choisissez un personnage et retirez-lui jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Pawpsicle",
      text: [
        {
          title: "JUMBO POP",
          description: "When you play this item, you may draw a card.",
        },
        {
          title: "THAT'S REDWOOD",
          description: "Banish this item — Remove up to 2 damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "002",
  cardNumber: 169,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_60f1bf0ac9ac46ca92e290a11ac334e5",
    tcgPlayer: 527535,
  },
  text: [
    {
      title: "JUMBO POP",
      description: "When you play this item, you may draw a card.",
    },
    {
      title: "THAT'S REDWOOD",
      description: "Banish this item — Remove up to 2 damage from chosen character.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "s1u-1",
      name: "JUMBO POP",
      text: "JUMBO POP When you play this item, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "s1u-2",
      text: "THAT'S REDWOOD Banish this item — Remove up to 2 damage from chosen character.",
      type: "activated",
    },
  ],
};
