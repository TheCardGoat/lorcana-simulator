import type { ActionCard } from "@tcg/lorcana-types";

export const helpingHand: ActionCard = {
  id: "178",
  canonicalId: "ci_178",
  reprints: ["set6-164"],
  cardType: "action",
  name: "Helping Hand",
  i18n: {
    en: {
      name: "Helping Hand",
      text: "Chosen character gains Support this turn. Draw a card. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    de: {
      name: "Helfende Hand",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Unterstützen. Ziehe 1 Karte. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Coup de main",
      text: "Choisissez un personnage qui gagne Soutien pour le reste de ce tour. Piochez une carte.",
    },
    it: {
      name: "Dare una mano",
      text: "Un personaggio a tua scelta ottiene Aiutante per questo turno. Pesca una carta. (Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 164,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_82a7bdb095d2477bbad45e524ad4a7dd",
    tcgPlayer: 586975,
  },
  text: "Chosen character gains Support this turn. Draw a card. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            keyword: "Support",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "1wv-1",
      text: "Chosen character gains Support this turn. Draw a card.",
      type: "action",
    },
  ],
};
