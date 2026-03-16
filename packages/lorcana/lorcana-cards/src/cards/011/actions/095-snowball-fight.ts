import type { ActionCard } from "@tcg/lorcana-types";

export const snowballFight: ActionCard = {
  id: "ucF",
  canonicalId: "ci_ucF",
  reprints: ["set11-095"],
  cardType: "action",
  name: "Snowball Fight",
  i18n: {
    en: {
      name: "Snowball Fight",
      text: "Each opponent chooses and discards a card. If you have a character with Evasive in play, gain 1 lore.",
    },
    de: {
      name: "Schneeballschlacht",
      text: "Alle gegnerischen Mitspielenden wählen je 1 Karte aus ihrer Hand und werfen sie ab. Wenn du mindestens einen Charakter mit Wendig im Spiel hast, sammelst du 1 Legende.",
    },
    fr: {
      name: "Bataille de boules de neige",
      text: "Chaque adversaire défausse une carte. Si vous avez un personnage avec Insaisissable en jeu, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Battaglia di Palle di Neve",
      text: "Ogni avversario sceglie e scarta una carta. Se hai in gioco un personaggio con Sfuggente, ottieni 1 leggenda.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 95,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8bd23953f8744c588a3f122476f67c3c",
    tcgPlayer: 673071,
  },
  text: "Each opponent chooses and discards a card. If you have a character with Evasive in play, gain 1 lore.",
  abilities: [
    {
      type: "action",
      text: "Each opponent chooses and discards a card. If you have a character with Evasive in play, gain 1 lore.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "discard",
            amount: 1,
            chosen: true,
            from: "hand",
            target: "EACH_OPPONENT",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                owner: "you",
                zones: ["play"],
                cardType: "character",
                filters: [
                  {
                    type: "has-keyword",
                    keyword: "Evasive",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "gain-lore",
              amount: 1,
              target: "CONTROLLER",
            },
          },
        ],
      },
    },
  ],
};
