import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanShadowCatcher: CharacterCard = {
  id: "3qg",
  canonicalId: "ci_3qg",
  reprints: ["set6-058"],
  cardType: "character",
  name: "Peter Pan",
  version: "Shadow Catcher",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "Shadow Catcher",
      text: [
        {
          title: "GOTCHA!",
          description:
            "During your turn, whenever a card is put into your inkwell, exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Peter Pan",
      version: "Schattenfänger",
      text: [
        {
          title: "HAB DICH!",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erschöpfe einen gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Peter Pan",
      version: "Attrapant son ombre",
      text: [
        {
          title: "JE T'AI EUE!",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage adverse et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Peter Pan",
      version: "Acciuffatore di Ombre",
      text: [
        {
          title: "PRESA!",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 58,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_421a2dfb847b406fb91556a8ee090423",
    tcgPlayer: 591995,
  },
  text: [
    {
      title: "GOTCHA!",
      description:
        "During your turn, whenever a card is put into your inkwell, exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        source: "chosen-character",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "1q3-1",
      name: "GOTCHA!",
      text: "GOTCHA! During your turn, whenever a card is put into your inkwell, exert chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
