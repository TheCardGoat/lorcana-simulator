import type { ActionCard } from "@tcg/lorcana-types";

export const gruesomeAndGrim: ActionCard = {
  id: "bqW",
  canonicalId: "ci_bqW",
  reprints: ["set2-062"],
  cardType: "action",
  name: "Gruesome and Grim",
  i18n: {
    en: {
      name: "Gruesome and Grim",
      text: "Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them. (They can challenge the turn they're played.)",
    },
    de: {
      name: "Grausam und Schlimm",
      text: "Spiele einen Charakter, der 4 oder weniger kostet, kostenlos aus. Er erhält Rasant. Verbanne ihn am Ende deines Zuges. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
    },
    fr: {
      name: "Le macabre et la terreur",
      text: "Jouez gratuitement un personnage coûtant 4 ou moins. Celui-ci gagne Charge. À la fin de votre tour, bannissez-le.",
    },
    it: {
      name: "Gruesome and Grim",
      text: "Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them. (They can challenge the turn they're played.)",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 62,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_15c2ebf5713c436eaf0478e2b7f8547c",
    tcgPlayer: 525344,
  },
  text: "Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them. (They can challenge the turn they're played.)",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "play-card",
        from: "hand",
        cardType: "character",
        cost: "free",
        filter: {
          maxCost: 4,
        },
        grantsRush: true,
        banishAtEndOfTurn: true,
      },
    },
  ],
};
