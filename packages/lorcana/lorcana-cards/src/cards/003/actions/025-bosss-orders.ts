import type { ActionCard } from "@tcg/lorcana-types";

export const bosssOrders: ActionCard = {
  id: "8aE",
  canonicalId: "ci_8aE",
  reprints: ["set3-025"],
  cardType: "action",
  name: "Boss's Orders",
  i18n: {
    en: {
      name: "Boss's Orders",
      text: "Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    de: {
      name: "Befehl vom Boss",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Unterstützen. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Ordres de la patronne",
      text: "Choisissez un personnage, il gagne Soutien pour le reste de ce tour.",
    },
    it: {
      name: "Ordini del Boss",
      text: "Un personaggio a tua scelta ottiene Aiutante per questo turno. (Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
    },
  },
  inkType: ["amber"],
  franchise: "Rescuers",
  set: "003",
  cardNumber: 25,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d1f9df5413484ad6975ba55243e4804e",
    tcgPlayer: 537888,
  },
  text: "Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        keyword: "Support",
        type: "gain-keyword",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
