import type { CharacterCard } from "@tcg/lorcana-types";

export const genieMagicalResearcher: CharacterCard = {
  id: "fkH",
  canonicalId: "ci_PvV",
  reprints: ["set11-049"],
  cardType: "character",
  name: "Genie",
  version: "Magical Researcher",
  i18n: {
    en: {
      name: "Genie",
      version: "Magical Researcher",
      text: "Boost 1 {I} INCREASING WISDOM This character gets +1 {L} for each card under him.",
    },
    de: {
      name: "Dschinni",
      version: "Magischer Forscher",
      text: "Stärken 1 WACHSENDE WEISHEIT Dieser Charakter erhält für jede Karte unter ihm +1.",
    },
    fr: {
      name: "Génie",
      version: "Chercheur en magie",
      text: "Boost 1 SAGESSE CROISSANTE Ce personnage gagne +1 pour chaque carte sous lui.",
    },
    it: {
      name: "Genio",
      version: "Ricercatore Magico",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) SAGGEZZA IN AUMENTO Questo personaggio riceve +1 per ogni carta sotto di sé.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "011",
  cardNumber: 49,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_13f9925099454b7a8fd6225381d11061",
    tcgPlayer: 675280,
  },
  text: "Boost 1 {I} INCREASING WISDOM This character gets +1 {L} for each card under him.",
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "h4v-1",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "Boost 1 {I} INCREASING WISDOM This character gets +1 {L} for each card under him.",
    },
  ],
};
