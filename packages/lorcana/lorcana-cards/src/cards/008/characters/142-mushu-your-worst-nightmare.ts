import type { CharacterCard } from "@tcg/lorcana-types";

export const mushuYourWorstNightmare: CharacterCard = {
  id: "dhS",
  canonicalId: "ci_wxW",
  reprints: ["set8-142"],
  cardType: "character",
  name: "Mushu",
  version: "Your Worst Nightmare",
  i18n: {
    en: {
      name: "Mushu",
      version: "Your Worst Nightmare",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "ALL FIRED UP",
          description:
            "Whenever you play another character, they gain Rush, Reckless, and Evasive this turn. (They can challenge the turn they're played. They can't quest and must challenge if able. They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Mushu",
      version: "Dein schlimmster Albtraum",
      text: "Gestaltwandel 4 VOLLER TATENDRANG Jedes Mal, wenn du einen anderen Charakter ausspielst, erhält jener in diesem Zug Rasant, Impulsiv und Wendig. (Er kann im selben Zug herausfordern, in dem er ausgespielt wird. Er kann nicht erkunden und muss herausfordern, wenn möglich. Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "Mushu",
      version: "Ton pire cauchemar",
      text: "Alter 4 PÈTE LE FEU Chaque fois que vous jouez un autre personnage, il gagne Charge, Combattant et Insaisissable pour le reste de ce tour. (Ce personnage peut défier le tour où il est joué. Il ne peut pas être envoyé à l'aventure et doit défier s'il le peut. Il peut défier des personnages avec Insaisissable.)",
    },
    it: {
      name: "Mushu",
      version: "Il Vostro Peggiore Incubo",
      text: "Trasformazione 4 CREPITANTE Ogni volta che giochi un altro personaggio, quel personaggio ottiene Lesto, Attaccabrighe e Sfuggente per questo turno. (Può sfidare nel turno in cui viene giocato. Non può andare all'avventura e deve sfidare, se possibile. Può sfidare altri personaggi con Sfuggente.)",
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 142,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4ea909f6818d4776ae936aa51aed88b8",
    tcgPlayer: 632228,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "ALL FIRED UP",
      description:
        "Whenever you play another character, they gain Rush, Reckless, and Evasive this turn. (They can challenge the turn they're played. They can't quest and must challenge if able. They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Floodborn", "Ally", "Dragon"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "qm5-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "qm5-2",
      name: "ALL FIRED UP",
      text: "ALL FIRED UP Whenever you play another character, they gain Rush, Reckless, and Evasive this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
