import type { CharacterCard } from "@tcg/lorcana-types";

export const rajahRoyalProtector: CharacterCard = {
  id: "SUh",
  canonicalId: "ci_SUh",
  reprints: ["set4-192"],
  cardType: "character",
  name: "Rajah",
  version: "Royal Protector",
  i18n: {
    en: {
      name: "Rajah",
      version: "Royal Protector",
      text: [
        {
          title: "STEADY GAZE",
          description:
            "While you have no cards in your hand, characters with cost 4 or less can't challenge this character.",
        },
      ],
    },
    de: {
      name: "Radsha",
      version: "Königlicher Beschützer",
      text: [
        {
          title: "WACHSAMER BLICK",
          description:
            "Wenn du keine Karten auf der Hand hast, können Charaktere, die 4 oder weniger kosten, diesen Charakter nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Rajah",
      version: "Protecteur Royal",
      text: [
        {
          title: "NE QUITTE PAS DES YEUX",
          description:
            "Tant que vous n'avez aucune carte en main, ce personnage ne peut pas être défié par des personnages coûtant 4 ou moins.",
        },
      ],
    },
    it: {
      name: "Rajah",
      version: "Protettore Reale",
      text: [
        {
          title: "SGUARDO FERMO",
          description:
            "Mentre non hai carte in mano, questo personaggio non può essere sfidato da personaggi con costo 4 o inferiore.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "004",
  cardNumber: 192,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dbc5f2c9f1cc41ebb7b6ba6c9133a942",
    tcgPlayer: 547779,
  },
  text: [
    {
      title: "STEADY GAZE",
      description:
        "While you have no cards in your hand, characters with cost 4 or less can't challenge this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "f6t-1",
      text: "STEADY GAZE While you have no cards in your hand, characters with cost 4 or less can't challenge this character.",
      type: "action",
    },
  ],
};
