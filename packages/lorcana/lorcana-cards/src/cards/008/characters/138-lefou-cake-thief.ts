import type { CharacterCard } from "@tcg/lorcana-types";

export const lefouCakeThief: CharacterCard = {
  id: "Peq",
  canonicalId: "ci_Peq",
  reprints: ["set8-138"],
  cardType: "character",
  name: "LeFou",
  version: "Cake Thief",
  i18n: {
    en: {
      name: "LeFou",
      version: "Cake Thief",
      text: [
        {
          title: "ALL FOR ME",
          description:
            "{E}, Banish one of your items — Chosen opponent loses 1 lore and you gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Le Fou",
      version: "Kuchendieb",
      text: [
        {
          title: "ALLES",
          description:
            "FÜR MICH, Verbanne einen deiner Gegenstände — Eine gegnerische Person deiner Wahl verliert 1 Legende und du sammelst 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Le Fou",
      version: "Voleur de gâteau",
      text: [
        {
          title: "TOUT POUR MOI,",
          description:
            "bannissez l'un de vos objets — Choisissez un adversaire qui perd 1 éclat de Lore et vous gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Le Tont",
      version: "Ladro di Torte",
      text: [
        {
          title: "TUTTA PER ME,",
          description:
            "esilia uno dei tuoi oggetti — Un avversario a tua scelta perde 1 leggenda e tu ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 138,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b89e331f531c40c7a269911b0ca4a92b",
    tcgPlayer: 631440,
  },
  text: [
    {
      title: "ALL FOR ME",
      description:
        "{E}, Banish one of your items — Chosen opponent loses 1 lore and you gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        steps: [
          {
            amount: 1,
            target: "OPPONENT",
            type: "lose-lore",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "13j-1",
      text: "ALL FOR ME {E}, Banish one of your items — Chosen opponent loses 1 lore and you gain 1 lore.",
      type: "activated",
    },
  ],
};
