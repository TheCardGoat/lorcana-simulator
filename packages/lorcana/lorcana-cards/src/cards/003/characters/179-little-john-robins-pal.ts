import type { CharacterCard } from "@tcg/lorcana-types";

export const littleJohnRobinsPal: CharacterCard = {
  id: "9Mk",
  canonicalId: "ci_9Mk",
  reprints: ["set3-179"],
  cardType: "character",
  name: "Little John",
  version: "Robin's Pal",
  i18n: {
    en: {
      name: "Little John",
      version: "Robin's Pal",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "DISGUISED",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Little John",
      version: "Robins Kumpel",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) VERKLEIDET In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "Petit Jean",
      version: "Compagnon de Robin",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.) DÉGUISÉ Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Little John",
      version: "Compare di Robin",
      text: "Guardiano CAMUFFATO Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 179,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_95f558d0b08e47cf9c92c57a7719f874",
    tcgPlayer: 539108,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "DISGUISED",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      id: "1ta-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1ta-2",
      text: "DISGUISED During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
