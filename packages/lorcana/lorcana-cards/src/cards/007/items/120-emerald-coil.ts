import type { ItemCard } from "@tcg/lorcana-types";

export const emeraldCoil: ItemCard = {
  id: "jH6",
  canonicalId: "ci_jH6",
  reprints: ["set7-120"],
  cardType: "item",
  name: "Emerald Coil",
  i18n: {
    en: {
      name: "Emerald Coil",
      text: [
        {
          title: "SHIMMERING WINGS",
          description:
            "During your turn, whenever a card is put into your inkwell, chosen character gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Smaragd-Reif",
      text: [
        {
          title: "SCHIMMERNDE FLÜGEL",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Spirale d’Émeraude",
      text: [
        {
          title: "AILES CHATOYANTES",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Spira di Smeraldo",
      text: [
        {
          title: "ALI SCINTILLANTI",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 120,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_6109e70026c649f2baca4f9656b66510",
    tcgPlayer: 619471,
  },
  text: [
    {
      title: "SHIMMERING WINGS",
      description:
        "During your turn, whenever a card is put into your inkwell, chosen character gains Evasive until the start of your next turn.",
    },
  ],
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "1xj-1",
      name: "SHIMMERING WINGS",
      text: "SHIMMERING WINGS During your turn, whenever a card is put into your inkwell, chosen character gains Evasive until the start of your next turn.",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
