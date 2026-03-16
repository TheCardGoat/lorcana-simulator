import type { CharacterCard } from "@tcg/lorcana-types";

export const lumiereFieryFriend: CharacterCard = {
  id: "RPE",
  canonicalId: "ci_fE7",
  reprints: ["set4-113", "set9-121"],
  cardType: "character",
  name: "Lumiere",
  version: "Fiery Friend",
  i18n: {
    en: {
      name: "Lumiere",
      version: "Fiery Friend",
      text: [
        {
          title: "FERVENT ADDRESS",
          description: "Your other characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Lumière",
      version: "Hitzköpfiger Freund",
      text: [
        {
          title: "GLÜHENDE ANSPRACHE",
          description: "Deine anderen Charaktere erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Lumière",
      version: "Ardent ami",
      text: [
        {
          title: "FERVENT DISCOURS",
          description: "Vos autres personnages gagnent +1.",
        },
      ],
    },
    it: {
      name: "Lumiere",
      version: "Amico Focoso",
      text: [
        {
          title: "DISCORSO FERVENTE I",
          description: "tuoi altri personaggi ricevono +1.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 113,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_724fef83bb594bbf883b6fc1bcc6d4e2",
    tcgPlayer: 650056,
  },
  text: [
    {
      title: "FERVENT ADDRESS",
      description: "Your other characters get +1 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "xyr-1",
      name: "FERVENT ADDRESS Your other",
      text: "FERVENT ADDRESS Your other characters get +1 {S}.",
      type: "static",
    },
  ],
};
