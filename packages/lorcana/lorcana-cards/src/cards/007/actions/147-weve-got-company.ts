import type { ActionCard } from "@tcg/lorcana-types";

export const weveGotCompany: ActionCard = {
  id: "JKW",
  canonicalId: "ci_JKW",
  reprints: ["set7-147"],
  cardType: "action",
  name: "We've Got Company!",
  i18n: {
    en: {
      name: "We've Got Company!",
      text: "Ready all your characters. They gain Reckless this turn. (They can't quest and must challenge if able.)",
    },
    de: {
      name: "Wir kriegen Gesellschaft!",
      text: "Mache alle deine Charaktere bereit. Sie erhalten in diesem Zug Impulsiv. (Sie können nicht erkunden und müssen herausfordern, wenn möglich.)",
    },
    fr: {
      name: "Nous avons de la visite !",
      text: "Redressez tous vos personnages. Ils gagnent Combattant pour le reste de ce tour. (Ils ne peuvent pas être envoyés à l'aventure et doivent défier s'il le peuvent.)",
    },
    it: {
      name: "Abbiamo Visite!",
      text: "Prepara tutti i tuoi personaggi. Ottengono Attaccabrighe per questo turno. (Non possono andare all'avventura e devono sfidare, se possibile.)",
    },
  },
  inkType: ["ruby"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 147,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_696163f5674e45ddb49ab917a6d91180",
    tcgPlayer: 619490,
  },
  text: "Ready all your characters. They gain Reckless this turn. (They can't quest and must challenge if able.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: "YOUR_CHARACTERS",
            type: "ready",
          },
          {
            duration: "this-turn",
            keyword: "Reckless",
            target: "YOUR_CHARACTERS",
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "inc-1",
      text: "Ready all your characters. They gain Reckless this turn.",
      type: "action",
    },
  ],
};
