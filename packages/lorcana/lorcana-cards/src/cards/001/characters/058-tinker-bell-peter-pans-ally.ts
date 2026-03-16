import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellPeterPansAlly: CharacterCard = {
  id: "52N",
  canonicalId: "ci_52N",
  reprints: ["set1-058"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Peter Pan’s Ally",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Peter Pan’s Ally",
      text: "Evasive LOYAL AND DEVOTED Your characters named Peter Pan gain Challenger +1. (They get +1 while challenging.)",
    },
    de: {
      name: "Naseweis",
      version: "Peter Pans Verbündete",
      text: "Wendig LOYAL UND HINGEBUNGSVOLL Deine Peter-Pan-Charaktere erhalten Herausfordern +1. (Während sie herausfordern, erhalten sie +1.)",
    },
    fr: {
      name: "LA FÉE CLOCHETTE",
      version: "Alliée de Peter Pan",
      text: "Insaisissable LOYALE ET DÉVOUÉE Vos personnages Peter Pan gagnent Offensif + 1. (Ils gagnent +1 lorsqu'ils défient.)",
    },
    it: {
      name: "Tinker Bell",
      version: "Peter Pan’s Ally",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) LOYAL AND DEVOTED Your characters named Peter Pan gain Challenger +1. (They get +1 while challenging.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 58,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_3ac122b5a08e42ac986aa536da6c1000",
    tcgPlayer: 507488,
  },
  text: "Evasive LOYAL AND DEVOTED Your characters named Peter Pan gain Challenger +1. (They get +1 while challenging.)",
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      keyword: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      type: "static",
    },
  ],
};
