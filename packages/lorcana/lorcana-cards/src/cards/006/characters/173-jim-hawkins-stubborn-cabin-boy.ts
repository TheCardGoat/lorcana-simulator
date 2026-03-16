import type { CharacterCard } from "@tcg/lorcana-types";

export const jimHawkinsStubbornCabinBoy: CharacterCard = {
  id: "auV",
  canonicalId: "ci_auV",
  reprints: ["set6-173"],
  cardType: "character",
  name: "Jim Hawkins",
  version: "Stubborn Cabin Boy",
  i18n: {
    en: {
      name: "Jim Hawkins",
      version: "Stubborn Cabin Boy",
      text: [
        {
          title: "COME HERE, COME HERE, COME HERE!",
          description:
            "During your turn, whenever a card is put into your inkwell, this character gets Challenger +2 this turn.",
        },
      ],
    },
    de: {
      name: "Jim Hawkins",
      version: "Sturer Schiffsjunge",
      text: [
        {
          title: "KOMM HER, KOMM HER, KOMM HER!",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält dieser Charakter in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2.)",
        },
      ],
    },
    fr: {
      name: "Jim Hawkins",
      version: "Mousse obstiné",
      text: [
        {
          title: "REVIENS, REVIENS, REVIENS!",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, ce personnage gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Jim Hawkins",
      version: "Mozzo Cocciuto",
      text: [
        {
          title: "VIENI, VIENI, VIENI!",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, questo personaggio ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 173,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c2b1ec76c46f4bc795726d2c2113e478",
    tcgPlayer: 593014,
  },
  text: [
    {
      title: "COME HERE, COME HERE, COME HERE!",
      description:
        "During your turn, whenever a card is put into your inkwell, this character gets Challenger +2 this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "tx8-1",
      text: "COME HERE, COME HERE, COME HERE! During your turn, whenever a card is put into your inkwell, this character gets Challenger +2 this turn.",
      type: "action",
    },
  ],
};
