import type { CharacterCard } from "@tcg/lorcana-types";

export const mchornIcecoldOfficer: CharacterCard = {
  id: "8pd",
  canonicalId: "ci_8pd",
  reprints: ["set11-181"],
  cardType: "character",
  name: "McHorn",
  version: "Ice-Cold Officer",
  i18n: {
    en: {
      name: "McHorn",
      version: "Ice-Cold Officer",
      text: "Bodyguard",
    },
    de: {
      name: "McHorn",
      version: "Eiskalter Offizier",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "McCorne",
      version: "Policier glacial",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "McHorn",
      version: "Agente Gelido",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "011",
  cardNumber: 181,
  rarity: "common",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a878e31ab9a94c4ba48079ebff6b155e",
    tcgPlayer: 673406,
  },
  text: "Bodyguard",
  classifications: ["Dreamborn", "Ally", "Detective"],
  abilities: [
    {
      id: "130-1",
      keyword: "Bodyguard",
      type: "keyword",
      text: "Bodyguard",
    },
  ],
};
