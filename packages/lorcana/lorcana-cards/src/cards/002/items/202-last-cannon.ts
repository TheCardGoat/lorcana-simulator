import type { ItemCard } from "@tcg/lorcana-types";

export const lastCannon: ItemCard = {
  id: "Q9b",
  canonicalId: "ci_Q9b",
  reprints: ["set2-202"],
  cardType: "item",
  name: "Last Cannon",
  i18n: {
    en: {
      name: "Last Cannon",
      text: [
        {
          title: "ARM YOURSELF 1",
          description:
            "{I}, Banish this item — Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Letzte Kanone",
      text: [
        {
          title: "BEWAFFNE DICH 1,",
          description:
            "Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
        },
      ],
    },
    fr: {
      name: "Dernier canon",
      text: [
        {
          title: "ARME-TOI 1,",
          description:
            "Bannissez cet objet — Choisissez un personnage, il gagne Offensif +3 pour le reste de ce tour. (Lorsqu'il défie, ce personnage gagne + 3.)",
        },
      ],
    },
    it: {
      name: "Last Cannon",
      text: [
        {
          title: "ARM YOURSELF 1,",
          description:
            "Banish this item — Chosen character gains Challenger +3 this turn. (They get +3 while challenging.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "002",
  cardNumber: 202,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a776fb952998401394dcee6936d85b56",
    tcgPlayer: 527780,
  },
  text: [
    {
      title: "ARM YOURSELF 1",
      description:
        "{I}, Banish this item — Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 3,
      },
      id: "u1y-1",
      name: "ARM YOURSELF 1",
      text: "ARM YOURSELF 1 {I}, Banish this item — Chosen character gains Challenger +3 this turn.",
      type: "activated",
    },
  ],
};
