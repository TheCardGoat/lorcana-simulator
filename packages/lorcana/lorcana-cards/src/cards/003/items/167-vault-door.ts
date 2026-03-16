import type { ItemCard } from "@tcg/lorcana-types";

export const vaultDoor: ItemCard = {
  id: "tAF",
  canonicalId: "ci_tAF",
  reprints: ["set3-167"],
  cardType: "item",
  name: "Vault Door",
  i18n: {
    en: {
      name: "Vault Door",
      text: [
        {
          title: "SEALED AWAY",
          description: "Your locations and characters at locations gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Tresortür",
      text: [
        {
          title: "WEGGESPERRT",
          description:
            "Deine Orte und Charaktere an Orten erhalten Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Porte du coffre",
      text: [
        {
          title: "SCELLÉ",
          description: "Vos lieux et personnages sur des lieux gagnent Résistance +1",
        },
      ],
    },
    it: {
      name: "Porta Blindata",
      text: [
        {
          title: "SIGILLATO I",
          description: "tuoi luoghi e i tuoi personaggi in un luogo ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 167,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_d4897bfa5fb047a894e6f69c3feebc1f",
    tcgPlayer: 537394,
  },
  text: [
    {
      title: "SEALED AWAY",
      description: "Your locations and characters at locations gain Resist +1.",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "1nn-1",
      text: "SEALED AWAY Your locations and characters at locations gain Resist +1.",
      type: "action",
    },
  ],
};
