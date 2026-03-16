import type { CharacterCard } from "@tcg/lorcana-types";

export const orvilleAlbatrossAir: CharacterCard = {
  id: "DJD",
  canonicalId: "ci_DJD",
  reprints: ["set7-194"],
  cardType: "character",
  name: "Orville",
  version: "Albatross Air",
  i18n: {
    en: {
      name: "Orville",
      version: "Albatross Air",
      text: [
        {
          title: "WELCOME ABOARD, FOLKS",
          description:
            "During your turn, while you have a character named Miss Bianca or Bernard in play, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Orville",
      version: "Albatross-Fluggesellschaft",
      text: [
        {
          title: "WILLKOMMEN AN BORD",
          description:
            "Solange du mindestens einen Miss-Bianca-Charakter oder einen Bernard-Charakter im Spiel hast, erhält dieser Charakter in deinem Zug Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Orville",
      version: "L'Albatros Air",
      text: [
        {
          title: "BIENVENUE À BORD",
          description:
            "Durant votre tour, tant que vous avez un personnage Miss Bianca ou Bernard en jeu, ce personnage-ci gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Orville",
      version: "Albatross Air",
      text: [
        {
          title: "BENVENUTI A BORDO, GENTE",
          description:
            "Durante il tuo turno, mentre hai in gioco un personaggio chiamato Miss Bianca o Bernie, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 194,
  rarity: "common",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d44a1dff239492ebbafca394d0f475c",
    tcgPlayer: 618729,
  },
  text: [
    {
      title: "WELCOME ABOARD, FOLKS",
      description:
        "During your turn, while you have a character named Miss Bianca or Bernard in play, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1jn-1",
      text: "WELCOME ABOARD, FOLKS During your turn, while you have a character named Miss Bianca or Bernard in play, this character gains Evasive.",
      type: "action",
    },
  ],
};
