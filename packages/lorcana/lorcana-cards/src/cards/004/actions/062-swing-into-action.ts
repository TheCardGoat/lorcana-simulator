import type { ActionCard } from "@tcg/lorcana-types";

export const swingIntoAction: ActionCard = {
  id: "bPM",
  canonicalId: "ci_bPM",
  reprints: ["set4-062"],
  cardType: "action",
  name: "Swing into Action",
  i18n: {
    en: {
      name: "Swing into Action",
      text: "Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
    de: {
      name: "Mit Schwung in die Aktion",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
    },
    fr: {
      name: "Passer à l'action",
      text: "Choisissez un personnage qui gagne Charge pour le reste de ce tour.",
    },
    it: {
      name: "Lanciarsi in Azione",
      text: "Un personaggio a tua scelta ottiene Lesto per questo turno. (Può sfidare nel turno in cui viene giocato.)",
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 62,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_388773c70283456b87414157b1eebd98",
    tcgPlayer: 550571,
  },
  text: "Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "r30-1",
      text: "Chosen character gains Rush this turn.",
      type: "action",
    },
  ],
};
