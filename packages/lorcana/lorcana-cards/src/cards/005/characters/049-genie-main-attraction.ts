import type { CharacterCard } from "@tcg/lorcana-types";

export const genieMainAttraction: CharacterCard = {
  id: "zYB",
  canonicalId: "ci_zYB",
  reprints: ["set5-049"],
  cardType: "character",
  name: "Genie",
  version: "Main Attraction",
  i18n: {
    en: {
      name: "Genie",
      version: "Main Attraction",
      text: [
        {
          title: "PHENOMENAL SHOWMAN",
          description:
            "While this character is exerted, opposing characters can't ready at the start of their turn.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Hauptattraktion",
      text: [
        {
          title: "SPEKTAKULÄRER ENTERTAINER",
          description:
            "Solange dieser Charakter erschöpft ist, werden gegnerische Charaktere zu Beginn ihres Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Génie",
      version: "Clou du spectacle",
      text: [
        {
          title: "ARTISTE PHÉNOMÉNAL",
          description:
            "Tant que ce personnage est épuisé, les personnages adverses ne se redressent pas au début de leur tour.",
        },
      ],
    },
    it: {
      name: "Genio",
      version: "Attrazione Principale",
      text: [
        {
          title: "SHOWMAN FENOMENALE",
          description:
            "Mentre questo personaggio è impegnato, i personaggi avversari non si possono preparare all'inizio del loro turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 49,
  rarity: "legendary",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_e0a935e3f8394d2b881f48d3c9c46b05",
    tcgPlayer: 561953,
  },
  text: [
    {
      title: "PHENOMENAL SHOWMAN",
      description:
        "While this character is exerted, opposing characters can't ready at the start of their turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "1ia-1",
      text: "PHENOMENAL SHOWMAN While this character is exerted, opposing characters can't ready at the start of their turn.",
      type: "static",
    },
  ],
};
