import type { CharacterCard } from "@tcg/lorcana-types";

export const launchpadTrustySidekick: CharacterCard = {
  id: "RLN",
  canonicalId: "ci_RLN",
  reprints: ["set11-177"],
  cardType: "character",
  name: "Launchpad",
  version: "Trusty Sidekick",
  i18n: {
    en: {
      name: "Launchpad",
      version: "Trusty Sidekick",
      text: [
        {
          title: "WHAT DID YOU NEED?",
          description:
            "{E} — Draw a card. Then, choose and discard a card unless you have a character named Darkwing Duck in play.",
        },
      ],
    },
    de: {
      name: "Quack, der Bruchpilot",
      version: "Treuer Handlanger",
      text: [
        {
          title: "WAS HAST DU",
          description:
            "BENÖTIGT? — Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab, außer du hast einen Darkwing-Duck-Charakter im Spiel.",
        },
      ],
    },
    fr: {
      name: "Flagada Jones",
      version: "Assistant de confiance",
      text: [
        {
          title: "DE QUOI AVIEZ-VOUS BESOIN?",
          description:
            "— Piochez une carte. Ensuite, défaussez une carte sauf si vous avez un personnage Myster Mask en jeu.",
        },
      ],
    },
    it: {
      name: "Jet",
      version: "Fido Assistente",
      text: [
        {
          title: "DI COSA AVEVI BISOGNO?",
          description:
            "— Pesca una carta. Poi, scegli e scarta una carta a meno che tu non abbia in gioco un personaggio chiamato Darkwing Duck.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 177,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5dd9c7a6d0ca4d4e9b0891adf35e1a99",
    tcgPlayer: 658219,
  },
  text: [
    {
      title: "WHAT DID YOU NEED?",
      description:
        "{E} — Draw a card. Then, choose and discard a card unless you have a character named Darkwing Duck in play.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1ll-1",
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
      type: "action",
      text: "WHAT DID YOU NEED? {E} - Draw a card. Then, choose and discard a card unless you have a character named Darkwing Duck in play.",
    },
  ],
};
