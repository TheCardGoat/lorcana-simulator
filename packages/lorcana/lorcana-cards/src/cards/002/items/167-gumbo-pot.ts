import type { ItemCard } from "@tcg/lorcana-types";

export const gumboPot: ItemCard = {
  id: "MEA",
  canonicalId: "ci_A51",
  reprints: ["set2-167"],
  cardType: "item",
  name: "Gumbo Pot",
  i18n: {
    en: {
      name: "Gumbo Pot",
      text: [
        {
          title: "THE BEST I'VE EVER TASTED",
          description: "{E} — Remove 1 damage each from up to 2 chosen characters.",
        },
      ],
    },
    de: {
      name: "Gumbo Eintopf",
      text: [
        {
          title: "DAS BESTE GUMBO, DAS ICH JE PROBIERT HAB",
          description: "— Entferne jeweils 1 Schaden von bis zu 2 Charakteren deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Marmite de Gumbo",
      text: "Le meilleur gumbo que j'ai jamais goûté\\ — Choisissez jusqu'à 2 personnages et retirez-leur 1 jeton Dommage chacun.",
    },
    it: {
      name: "Gumbo Pot",
      text: [
        {
          title: "THE BEST I'VE EVER TASTED",
          description: "— Remove 1 damage each from up to 2 chosen characters.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Princess and the Frog",
  set: "002",
  cardNumber: 167,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_45bfb8a9f002440191e7bfd8b993fd22",
    tcgPlayer: 525309,
  },
  text: [
    {
      title: "THE BEST I'VE EVER TASTED",
      description: "{E} — Remove 1 damage each from up to 2 chosen characters.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: "UP_TO_2_CHOSEN_CHARACTERS",
        type: "remove-damage",
      },
      id: "1ee-1",
      name: "THE BEST I'VE EVER TASTED",
      text: "THE BEST I'VE EVER TASTED {E} — Remove 1 damage each from up to 2 chosen characters.",
      type: "activated",
    },
  ],
};
