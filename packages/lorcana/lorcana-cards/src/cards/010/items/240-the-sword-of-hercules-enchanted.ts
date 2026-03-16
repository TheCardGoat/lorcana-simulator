import type { ItemCard } from "@tcg/lorcana-types";

export const theSwordOfHerculesEnchanted: ItemCard = {
  id: "1Wc",
  canonicalId: "ci_www",
  reprints: ["set10-200"],
  cardType: "item",
  name: "The Sword of Hercules",
  i18n: {
    en: {
      name: "The Sword of Hercules",
      text: [
        {
          title: "MIGHTY HIT",
          description: "When you play this item, banish chosen opposing Deity character.",
        },
        {
          title: "HAND-TO-HAND",
          description:
            "During your turn, whenever one of your characters banishes another character in a challenge, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Hercules’ Schwert",
      text: [
        {
          title: "MÄCHTIGER TREFFER",
          description:
            "Wenn du diesen Gegenstand ausspielst, verbanne eine gegnerische Gottheit deiner Wahl.",
        },
        {
          title: "MANN GEGEN MANN",
          description:
            "Jedes Mal während deines Zuges, wenn einer deiner Charaktere durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "L'épée d'Hercule",
      text: [
        {
          title: "COUP PUISSANT",
          description:
            "Lorsque vous jouez cet objet, choisissez un personnage Dieu adverse et bannissez-le.",
        },
        {
          title: "CORPS-À-CORPS",
          description:
            "Durant votre tour, chaque fois que l'un de vos personnages en bannit un autre via un défi, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "La Spada di Ercole",
      text: [
        {
          title: "COLPO POTENTE",
          description:
            "Quando giochi questo oggetto, esilia un personaggio Divinità avversario a tua scelta.",
        },
        {
          title: "CORPO A CORPO",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi personaggi esilia un altro personaggio in una sfida, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 240,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_70fa88bf3a35452b8178209944e8604a",
    tcgPlayer: 660031,
  },
  text: [
    {
      title: "MIGHTY HIT",
      description: "When you play this item, banish chosen opposing Deity character.",
    },
    {
      title: "HAND-TO-HAND",
      description:
        "During your turn, whenever one of your characters banishes another character in a challenge, gain 1 lore.",
    },
  ],
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
          filter: [
            {
              type: "has-classification",
              classification: "Deity",
            },
          ],
        },
        type: "banish",
      },
      id: "1lh-1",
      name: "MIGHTY HIT",
      text: "MIGHTY HIT When you play this item, banish chosen opposing Deity character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1lh-2",
      name: "HAND-TO-HAND",
      text: "HAND-TO-HAND During your turn, whenever one of your characters banishes another character in a challenge, gain 1 lore.",
      trigger: {
        event: "banish-in-challenge",
        on: "YOUR_CHARACTERS",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
