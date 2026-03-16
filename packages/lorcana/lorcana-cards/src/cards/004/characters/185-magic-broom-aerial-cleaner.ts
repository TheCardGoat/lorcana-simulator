import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomAerialCleaner: CharacterCard = {
  id: "KvN",
  canonicalId: "ci_KvN",
  reprints: ["set4-185"],
  cardType: "character",
  name: "Magic Broom",
  version: "Aerial Cleaner",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Aerial Cleaner",
      text: [
        {
          title: "WINGED FOR A DAY",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Luftreiniger",
      text: [
        {
          title: "FÜR EINEN TAG BEFLÜGELT",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Balais Magiques",
      version: "Nettoyeur aérien",
      text: [
        {
          title: "AILÉ POUR UN JOUR",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Pulitrice Volante",
      text: [
        {
          title: "ALATA PER UN GIORNO",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Fantasia",
  set: "004",
  cardNumber: 185,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_df2a4ae009034326bac684df1aac9287",
    tcgPlayer: 547705,
  },
  text: [
    {
      title: "WINGED FOR A DAY",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
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
      id: "1wc-1",
      text: "WINGED FOR A DAY During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
