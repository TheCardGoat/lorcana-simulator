import type { ActionCard } from "@tcg/lorcana-types";

export const soBeIt: ActionCard = {
  id: "L16",
  canonicalId: "ci_L16",
  reprints: ["set10-094"],
  cardType: "action",
  name: "So Be It!",
  i18n: {
    en: {
      name: "So Be It!",
      text: "Each of your characters gets +1 {S} this turn. You may banish chosen item.",
    },
    de: {
      name: "So sei es!",
      text: "Deine Charaktere erhalten in diesem Zug +1. Du darfst einen Gegenstand deiner Wahl verbannen.",
    },
    fr: {
      name: "Alors tant pis !",
      text: "Chacun de vos personnages gagne +1 pour le reste de ce tour. Vous pouvez choisir un objet et le bannir.",
    },
    it: {
      name: "Ebbene Sia!",
      text: "Ogni tuo personaggio riceve +1 per questo turno. Puoi esiliare un oggetto a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "010",
  cardNumber: 94,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_758f17fbfa45410ab196cc29a03a4c45",
    tcgPlayer: 658462,
  },
  text: "Each of your characters gets +1 {S} this turn. You may banish chosen item.",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            modifier: 1,
            stat: "strength",
            target: "YOUR_CHARACTERS",
            type: "modify-stat",
          },
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["item"],
              },
              type: "banish",
            },
            type: "optional",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
