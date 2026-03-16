import type { LocationCard } from "@tcg/lorcana-types";

export const trainingGroundsImpossiblePillar: LocationCard = {
  id: "n6q",
  canonicalId: "ci_n6q",
  reprints: ["set4-136"],
  cardType: "location",
  name: "Training Grounds",
  version: "Impossible Pillar",
  i18n: {
    en: {
      name: "Training Grounds",
      version: "Impossible Pillar",
      text: [
        {
          title: "STRENGTH OF MIND 1",
          description: "{I} — Chosen character here gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Trainingsgelände",
      version: "Unerreichbare Säule",
      text: [
        {
          title: "STÄRKE DES WILLENS",
          description: "1 — Wähle einen Charakter an diesem Ort. Er erhält in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Terrains d'Entraînement",
      version: "Mât insurmontable",
      text: [
        {
          title: "FORCE MENTALE 1",
          description:
            "— Choisissez un personnage sur ce lieu qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Campo di Addestramento",
      version: "Pilastro Impossibile",
      text: [
        {
          title: "FORZA DELLA MENTE 1",
          description: "— Un personaggio a tua scelta in questo luogo riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 136,
  rarity: "common",
  cost: 1,
  willpower: 5,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_ed931c16cb0142469bd6f7571576d61a",
    tcgPlayer: 550604,
  },
  text: [
    {
      title: "STRENGTH OF MIND 1",
      description: "{I} — Chosen character here gets +1 {S} this turn.",
    },
  ],
  abilities: [
    {
      id: "n6q-1",
      name: "STRENGTH OF MIND",
      text: "STRENGTH OF MIND 1 {I} — Chosen character here gets +1 {S} this turn.",
      type: "activated",
      cost: {
        ink: 1,
      },
      effect: {
        type: "modify-stat",
        stat: "strength",
        modifier: 1,
        duration: "this-turn",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "same-location-as-source",
            },
          ],
        },
      },
    },
  ],
};
