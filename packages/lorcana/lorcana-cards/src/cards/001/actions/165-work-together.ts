import type { ActionCard } from "@tcg/lorcana-types";

export const workTogether: ActionCard = {
  id: "6w7",
  canonicalId: "ci_6w7",
  reprints: ["set1-165"],
  cardType: "action",
  name: "Work Together",
  i18n: {
    en: {
      name: "Work Together",
      text: "Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    de: {
      name: "Teamwork",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Unterstützen. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "TRAVAIL D'ÉQUIPE",
      text: "Choisissez un personnage, il gagne Soutien pour le reste de ce tour.",
    },
    it: {
      name: "Work Together",
      text: "Chosen character gains Support this turn. (Whenever they quest, you may add their to another chosen character's this turn.)",
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "001",
  cardNumber: 165,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8f64870b7d4f490ea13c8da48ebe514b",
    tcgPlayer: 508889,
  },
  text: "Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        keyword: "Support",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
    },
  ],
};
