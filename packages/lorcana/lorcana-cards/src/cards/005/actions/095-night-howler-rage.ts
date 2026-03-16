import type { ActionCard } from "@tcg/lorcana-types";

export const nightHowlerRage: ActionCard = {
  id: "38h",
  canonicalId: "ci_38h",
  reprints: ["set5-095"],
  cardType: "action",
  name: "Night Howler Rage",
  i18n: {
    en: {
      name: "Night Howler Rage",
      text: "Draw a card. Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
    de: {
      name: "Wut der Könige der Nacht",
      text: "Ziehe 1 Karte. Ein Charakter deiner Wahl erhält in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
    },
    fr: {
      name: "Rage du Hurleur nocturne",
      text: "Piochez une carte. Choisissez un personnage qui gagne Combattant lors de son prochain tour.",
    },
    it: {
      name: "Furia da Ululatore Notturno",
      text: "Pesca una carta. Un personaggio a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
    },
  },
  inkType: ["emerald"],
  franchise: "Zootropolis",
  set: "005",
  cardNumber: 95,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4fc312f6a56240dba9cb3c6fc6efecde",
    tcgPlayer: 560541,
  },
  text: "Draw a card. Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            duration: "their-next-turn",
            keyword: "Reckless",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "1mw-1",
      text: "Draw a card. Chosen character gains Reckless during their next turn.",
      type: "action",
    },
  ],
};
