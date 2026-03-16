import type { CharacterCard } from "@tcg/lorcana-types";

export const kronkUnlicensedInvestigator: CharacterCard = {
  id: "D2Y",
  canonicalId: "ci_D2Y",
  reprints: ["set5-178"],
  cardType: "character",
  name: "Kronk",
  version: "Unlicensed Investigator",
  i18n: {
    en: {
      name: "Kronk",
      version: "Unlicensed Investigator",
      text: "Challenger +1",
    },
    de: {
      name: "Kronk",
      version: "Nicht lizenzierter Ermittler",
      text: "Herausfordern +1",
    },
    fr: {
      name: "Kronk",
      version: "Enquêteur sans permis",
      text: "Offensif +1",
    },
    it: {
      name: "Kronk",
      version: "Investigatore Senza Licenza",
      text: "Sfidante +1",
    },
  },
  inkType: ["steel"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 178,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bb7c0120d4b14622b11e2a06f9352a3c",
    tcgPlayer: 561492,
  },
  text: "Challenger +1",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "kit-1",
      keyword: "Challenger",
      type: "keyword",
      value: 1,
      text: "Challenger +1",
    },
  ],
};
