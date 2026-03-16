import type { CharacterCard } from "@tcg/lorcana-types";

export const lyleTiberiusRourkeCunningMercenary: CharacterCard = {
  id: "1Ni",
  canonicalId: "ci_1Ni",
  reprints: ["set3-078"],
  cardType: "character",
  name: "Lyle Tiberius Rourke",
  version: "Cunning Mercenary",
  i18n: {
    en: {
      name: "Lyle Tiberius Rourke",
      version: "Cunning Mercenary",
      text: [
        {
          title: "WELL, NOW YOU KNOW",
          description:
            "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
        {
          title: "THANKS FOR VOLUNTEERING",
          description:
            "Whenever one of your other characters is banished, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Lyle Tiberius Rourke",
      version: "Gerissener Söldner",
      text: [
        {
          title: "JETZT REICHT'S JA AUCH NOCH",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
        {
          title: "SCHÖN, DASS DU DICH FREIWILLIG MELDEST",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere verbannt wird, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Lyle Tiberius Rourke",
      version: "Mercenaire fourbe",
      text: [
        {
          title: "VOUS VOILÀ DANS LA CONFIDENCE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui gagne Combattant durant son prochain tour. (Ce personnage ne peut pas être envoyé à l'aventure et doit défier s'il le peut.)",
        },
        {
          title: "VOUS ÊTES L'HOMME QU'IL NOUS FAUT",
          description:
            "Chaque fois que l'un de vos autres personnages est banni, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Lyle Tiberius Rourke",
      version: "Astuto Mercenario",
      text: [
        {
          title: "BEH, ORA LO SAI",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
        {
          title: "GRAZIE PER ESSERTI OFFERTO VOLONTARIO",
          description:
            "Ogni volta che uno dei tuoi altri personaggi viene esiliato, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 78,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_04851c839e844359bfe6a0fa70158d38",
    tcgPlayer: 536279,
  },
  text: [
    {
      title: "WELL, NOW YOU KNOW",
      description:
        "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
    {
      title: "THANKS FOR VOLUNTEERING",
      description: "Whenever one of your other characters is banished, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        keyword: "Reckless",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1s7-1",
      text: "WELL, NOW YOU KNOW When you play this character, chosen opposing character gains Reckless during their next turn.",
      type: "action",
    },
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "1s7-2",
      name: "THANKS FOR VOLUNTEERING",
      text: "THANKS FOR VOLUNTEERING Whenever one of your other characters is banished, each opponent loses 1 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
