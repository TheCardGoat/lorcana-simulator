import type { CharacterCard } from "@tcg/lorcana-types";

export const tianaNaturalTalent: CharacterCard = {
  id: "9h6",
  canonicalId: "ci_9h6",
  reprints: ["set8-009"],
  cardType: "character",
  name: "Tiana",
  version: "Natural Talent",
  i18n: {
    en: {
      name: "Tiana",
      version: "Natural Talent",
      text: [
        {
          title: "Singer 6",
        },
        {
          title: "CAPTIVATING MELODY",
          description:
            "Whenever you play a song, each opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Tiana",
      version: "Naturtalent",
      text: [
        {
          title: "Singen 6",
          description:
            "(Die Kosten dieses Charakters gelten als 6 für das Singen von Liedern.) MITREISSENDE MELODIE Jedes Mal, wenn du ein Lied ausspielst, gib allen gegnerischen Charakteren bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Tiana",
      version: "Talent naturel",
      text: "Mélomane 6 (Ce personnage est considéré comme ayant un coût de 6 pour chanter des chansons.) MÉLODIE CAPTIVANTE Chaque fois que vous jouez une chanson, chaque personnage adverse subit -1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Tiana",
      version: "Talento Naturale",
      text: "Melodioso 6 MELODIA AFFASCINANTE Ogni volta che giochi una canzone, ogni personaggio avversario riceve -1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "008",
  cardNumber: 9,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_e1412fbad88c459a989f3738fb678789",
    tcgPlayer: 631333,
  },
  text: [
    {
      title: "Singer 6",
    },
    {
      title: "CAPTIVATING MELODY",
      description:
        "Whenever you play a song, each opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "tr1-1",
      keyword: "Singer",
      text: "Singer 6",
      type: "keyword",
      value: 6,
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "tr1-2",
      name: "CAPTIVATING MELODY",
      text: "CAPTIVATING MELODY Whenever you play a song, each opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
