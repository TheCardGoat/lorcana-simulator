import type { CharacterCard } from "@tcg/lorcana-types";

export const fixitFelixJrTrustyBuilder: CharacterCard = {
  id: "pKi",
  canonicalId: "ci_pKi",
  reprints: ["set5-010"],
  cardType: "character",
  name: "Fix-It Felix, Jr.",
  version: "Trusty Builder",
  i18n: {
    en: {
      name: "Fix-It Felix, Jr.",
      version: "Trusty Builder",
      text: "Bodyguard",
    },
    de: {
      name: "Fix-It Felix, Jr.",
      version: "Zuverlässiger Erbauer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Félix Fixe Junior",
      version: "Constructeur fiable",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Felix Aggiustatutto Jr.",
      version: "Costruttore Fidato",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 10,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e300981771704026815250b876ae28be",
    tcgPlayer: 559769,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1hm-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
