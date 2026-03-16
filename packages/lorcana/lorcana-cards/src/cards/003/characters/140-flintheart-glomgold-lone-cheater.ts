import type { CharacterCard } from "@tcg/lorcana-types";

export const flintheartGlomgoldLoneCheater: CharacterCard = {
  id: "BVy",
  canonicalId: "ci_BVy",
  reprints: ["set3-140"],
  cardType: "character",
  name: "Flintheart Glomgold",
  version: "Lone Cheater",
  i18n: {
    en: {
      name: "Flintheart Glomgold",
      version: "Lone Cheater",
      text: [
        {
          title: "THEY'LL NEVER SEE IT COMING!",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Mac Moneysac",
      version: "Einsamer Betrüger",
      text: [
        {
          title: "NIEMAND WIRD ES KOMMEN SEHEN!",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Archibald Gripsou",
      version: "Tricheur solitaire",
      text: [
        {
          title: "ILS NE LE VERRONT JAMAIS VENIR",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Cuordipietra Famedoro",
      version: "Imbroglione Solitario",
      text: [
        {
          title: "NON SE LO ASPETTERANNO MAI!",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 140,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1121277f1b454321be2740185a61c1c7",
    tcgPlayer: 538237,
  },
  text: [
    {
      title: "THEY'LL NEVER SEE IT COMING!",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
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
      type: "static",
    },
  ],
};
