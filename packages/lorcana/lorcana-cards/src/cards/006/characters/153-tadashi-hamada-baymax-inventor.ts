import type { CharacterCard } from "@tcg/lorcana-types";

export const tadashiHamadaBaymaxInventor: CharacterCard = {
  id: "AMb",
  canonicalId: "ci_AMb",
  reprints: ["set6-153"],
  cardType: "character",
  name: "Tadashi Hamada",
  version: "Baymax Inventor",
  i18n: {
    en: {
      name: "Tadashi Hamada",
      version: "Baymax Inventor",
      text: [
        {
          title: "LET'S GET BACK TO WORK",
          description: "This character gets +1 {S} and +1 {W} for each item you have in play.",
        },
      ],
    },
    de: {
      name: "Tadashi Hamada",
      version: "Erfinder von Baymax",
      text: [
        {
          title: "ZURÜCK AN DIE ARBEIT",
          description:
            "Dieser Charakter erhält +1 und +1 für jeden Gegenstand, den du im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "Tadashi Hamada",
      version: "Concepteur de Baymax",
      text: [
        {
          title: "REMETTONS-NOUS AU BOULOT",
          description: "Ce personnage gagne +1 et +1 pour chaque objet que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Tadashi Hamada",
      version: "Inventore di Baymax",
      text: [
        {
          title: "TORNIAMO AL LAVORO",
          description: "Questo personaggio riceve +1 e +1 per ogni oggetto che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 153,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 3,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_3a009848a04944aba8e7402d221c897c",
    tcgPlayer: 588327,
  },
  text: [
    {
      title: "LET'S GET BACK TO WORK",
      description: "This character gets +1 {S} and +1 {W} for each item you have in play.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Inventor"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "16i-1",
      text: "LET'S GET BACK TO WORK This character gets +1 {S} and +1 {W} for each item you have in play.",
      type: "static",
    },
  ],
};
