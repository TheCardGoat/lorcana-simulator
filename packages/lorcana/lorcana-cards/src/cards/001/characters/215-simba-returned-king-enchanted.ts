import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaReturnedKingEnchanted: CharacterCard = {
  id: "vpZ",
  canonicalId: "ci_11m",
  reprints: ["set1-189"],
  cardType: "character",
  name: "Simba",
  version: "Returned King",
  i18n: {
    en: {
      name: "Simba",
      version: "Returned King",
      text: [
        {
          title: "Challenger +4 (When challenging, this character gets +4 {S}.)",
        },
        {
          title: "POUNCE",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Zurückgekehrter König",
      text: "Herausfordern +4 KATZENSPRUNG In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "SIMBA",
      version: "Roi de retour",
      text: "Offensif +4 BOND Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
    },
    it: {
      name: "Simba",
      version: "Returned King",
      text: "Challenger +4 (While challenging, this character gets +4.) POUNCE During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_80cf71e223cf491796609458b2866665",
    tcgPlayer: 510162,
  },
  text: [
    {
      title: "Challenger +4 (When challenging, this character gets +4 {S}.)",
    },
    {
      title: "POUNCE",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Hero", "King"],
  abilities: [
    {
      id: "nj8-1",
      keyword: "Challenger",
      text: "Challenger +4",
      type: "keyword",
      value: 4,
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "nj8-2",
      name: "POUNCE",
      text: "POUNCE During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
