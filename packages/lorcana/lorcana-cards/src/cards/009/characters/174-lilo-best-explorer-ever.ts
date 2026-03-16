import type { CharacterCard } from "@tcg/lorcana-types";

export const liloBestExplorerEver: CharacterCard = {
  id: "T3q",
  canonicalId: "ci_sRi",
  reprints: ["set9-174"],
  cardType: "character",
  name: "Lilo",
  version: "Best Explorer Ever",
  i18n: {
    en: {
      name: "Lilo",
      version: "Best Explorer Ever",
      text: [
        {
          title: "COME ON, PEOPLE, LET'S MOVE",
          description:
            "When you play this character, your other characters gain Challenger +2 this turn (They get +2 {S} while challenging.)",
        },
        {
          title: "GO GET 'EM",
          description:
            'Whenever this character quests, chosen Alien character gains Challenger +2 and "This character can challenge ready characters" this turn.',
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Beste Entdeckerin aller Zeiten",
      text: [
        {
          title: "KOMMT SCHON, JUNGS, BEWEGUNG",
          description:
            "Wenn du diesen Charakter ausspielst, erhalten deine anderen Charaktere in diesem Zug Herausfordern +2. (Während sie herausfordern, erhalten sie +2.)",
        },
        {
          title: "SCHNAPPT SIE EUCH",
          description:
            'Jedes Mal, wenn dieser Charakter erkundet, erhält ein Alien deiner Wahl in diesem Zug Herausfordern +2 und "Dieser Charakter kann bereite Charaktere herausfordern".',
        },
      ],
    },
    fr: {
      name: "Lilo",
      version: "La meilleure exploratrice de tous les temps",
      text: [
        {
          title: "AU TRAVAIL, MES AMIS, ACTIVEZ-VOUS",
          description:
            "Lorsque vous jouez ce personnage, vos autres personnages gagnent Offensif +2 pour le reste de ce tour.",
        },
        {
          title: "VAS-Y, ATTRAPE-LES",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage Alien qui gagne Offensif +2 et « Ce personnage peut défier des personnages redressés » pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Lilo",
      version: "Migliore Esploratrice di Sempre",
      text: [
        {
          title: "ANDIAMO RAGAZZI, DIAMOCI UNA MOSSA",
          description:
            "Quando giochi questo personaggio, i tuoi altri personaggi ottengono Sfidante +2 per questo turno. (Ricevono +2 mentre stanno sfidando.)",
        },
        {
          title: "FAGLI VEDERE CHI SEI",
          description:
            'Ogni volta che questo personaggio va all\'avventura, un personaggio Alieno a tua scelta ottiene Sfidante +2 e "Questo personaggio può sfidare i personaggi preparati" per questo turno.',
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "009",
  cardNumber: 174,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fbccd8fc95fa45009665824b0731c3d3",
    tcgPlayer: 649236,
  },
  text: [
    {
      title: "COME ON, PEOPLE, LET'S MOVE",
      description:
        "When you play this character, your other characters gain Challenger +2 this turn (They get +2 {S} while challenging.)",
    },
    {
      title: "GO GET 'EM",
      description:
        'Whenever this character quests, chosen Alien character gains Challenger +2 and "This character can challenge ready characters" this turn.',
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "127-1",
      text: "COME ON, PEOPLE, LET'S MOVE When you play this character, your other characters gain Challenger +2 this turn",
      type: "static",
    },
    {
      effect: {
        steps: [
          {
            keyword: "Challenger",
            target: "SELF",
            type: "gain-keyword",
            value: 2,
          },
          {
            ability: "can-challenge-ready",
            target: "SELF",
            type: "grant-ability",
          },
        ],
        type: "sequence",
      },
      id: "127-2",
      name: "GO GET 'EM",
      text: 'GO GET \'EM Whenever this character quests, chosen Alien character gains Challenger +2 and "This character can challenge ready characters" this turn.',
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
