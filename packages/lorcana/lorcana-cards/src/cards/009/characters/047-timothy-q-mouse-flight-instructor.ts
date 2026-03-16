import type { CharacterCard } from "@tcg/lorcana-types";

export const timothyQMouseFlightInstructor: CharacterCard = {
  id: "WXB",
  canonicalId: "ci_WXB",
  reprints: ["set9-047"],
  cardType: "character",
  name: "Timothy Q. Mouse",
  version: "Flight Instructor",
  i18n: {
    en: {
      name: "Timothy Q. Mouse",
      version: "Flight Instructor",
      text: [
        {
          title: "LET'S SHOW 'EM, DUMBO!",
          description:
            "While you have a character with Evasive in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Timotheus",
      version: "Fluglehrer",
      text: [
        {
          title: "JETZT ZEIG'S IHNEN, DUMBO!",
          description:
            "Solange du mindestens einen Charakter mit Wendig im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Timothée",
      version: "Instructeur de vol",
      text: [
        {
          title: "MONTRE-LEUR, DUMBO!",
          description:
            "Tant que vous avez un personnage avec Insaisissable en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Timoteo",
      version: "Istruttore di Volo",
      text: [
        {
          title: "BENE COSÌ, DUMBO!",
          description:
            "Mentre hai in gioco un personaggio con Sfuggente, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Dumbo",
  set: "009",
  cardNumber: 47,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7132ae64563f4ca688e7033e90cf50fb",
    tcgPlayer: 647678,
  },
  text: [
    {
      title: "LET'S SHOW 'EM, DUMBO!",
      description: "While you have a character with Evasive in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "101-1",
      text: "LET'S SHOW 'EM, DUMBO! While you have a character with Evasive in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
