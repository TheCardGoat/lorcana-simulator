import type { CharacterCard } from "@tcg/lorcana-types";

export const vanellopeVonSchweetzCandyMechanic: CharacterCard = {
  id: "gcm",
  canonicalId: "ci_gcm",
  reprints: ["set5-009"],
  cardType: "character",
  name: "Vanellope von Schweetz",
  version: "Candy Mechanic",
  i18n: {
    en: {
      name: "Vanellope von Schweetz",
      version: "Candy Mechanic",
      text: [
        {
          title: "YOU'VE GOT TO PAY TO PLAY",
          description:
            "Whenever this character quests, chosen opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Vanellope von Schweetz",
      version: "Süßigkeiten-Mechanikerin",
      text: [
        {
          title: "WER SPIELEN WILL, MUSS BEZAHLEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Vanellope von Schweetz",
      version: "Mécanicienne de bonbons",
      text: [
        {
          title: "IL FAUT PAYER POUR JOUER",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Vanellope von Schweetz",
      version: "Meccanica di Dolcetti",
      text: [
        {
          title: "DEVI PAGARE PER GIOCARE",
          description:
            "Ogni volta che questo personaggio va all'avventura, un personaggio avversario a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 9,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_48fb46a8fbdd4615a2c9ab99f304a0f2",
    tcgPlayer: 561946,
  },
  text: [
    {
      title: "YOU'VE GOT TO PAY TO PLAY",
      description:
        "Whenever this character quests, chosen opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess", "Racer"],
  abilities: [
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "18i-1",
      name: "YOU'VE GOT TO PAY TO PLAY",
      text: "YOU'VE GOT TO PAY TO PLAY Whenever this character quests, chosen opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
