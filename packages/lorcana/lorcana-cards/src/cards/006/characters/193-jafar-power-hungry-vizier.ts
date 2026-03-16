import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarPowerhungryVizier: CharacterCard = {
  id: "QV3",
  canonicalId: "ci_QV3",
  reprints: ["set6-193"],
  cardType: "character",
  name: "Jafar",
  version: "Power-Hungry Vizier",
  i18n: {
    en: {
      name: "Jafar",
      version: "Power-Hungry Vizier",
      text: [
        {
          title: "YOU WILL BE PAID WHEN THE TIME COMES",
          description:
            "During your turn, whenever a card is put into your inkwell, deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Machthungriger Wesir",
      text: [
        {
          title: "IHR BEKOMMT SCHON, WAS EUCH ZUSTEHT",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, füge einem Charakter deiner Wahl 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Jafar",
      version: "Vizir avide de pouvoir",
      text: [
        {
          title: "TU SERAS PAYÉ LE MOMENT VENU",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage et infligez-lui 1 dommage.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Visir Assetato di Potere",
      text: [
        {
          title: "AVRAI QUELLO CHE TI MERITI",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, infliggi 1 danno a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 193,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_b3029d9bf3ee4b7c8bf5cd2403f0b2f5",
    tcgPlayer: 591118,
  },
  text: [
    {
      title: "YOU WILL BE PAID WHEN THE TIME COMES",
      description:
        "During your turn, whenever a card is put into your inkwell, deal 1 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1w6-1",
      name: "YOU WILL BE PAID WHEN THE TIME COMES",
      text: "YOU WILL BE PAID WHEN THE TIME COMES During your turn, whenever a card is put into your inkwell, deal 1 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
