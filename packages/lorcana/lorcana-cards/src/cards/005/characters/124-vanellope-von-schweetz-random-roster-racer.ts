import type { CharacterCard } from "@tcg/lorcana-types";

export const vanellopeVonSchweetzRandomRosterRacer: CharacterCard = {
  id: "yeD",
  canonicalId: "ci_yeD",
  reprints: ["set5-124"],
  cardType: "character",
  name: "Vanellope von Schweetz",
  version: "Random Roster Racer",
  i18n: {
    en: {
      name: "Vanellope von Schweetz",
      version: "Random Roster Racer",
      text: [
        {
          title: "Rush",
        },
        {
          title: "PIXLEXIA",
          description:
            "When you play this character, she gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Vanellope von Schweetz",
      version: "Im Rennen um die Qualifikation",
      text: "Rasant PIXELITIS Wenn du diesen Charakter ausspielst, erhält er bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Vanellope von Schweetz",
      version: "Coureuse aléatoire",
      text: "Charge PIXLEXIE Lorsque vous jouez ce personnage, il gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Vanellope von Schweetz",
      version: "Pilota del Gran Premio",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) PIXELLESSICA Quando giochi questo personaggio, ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 124,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a24dcdebfc7246d4be1faad573e0a23e",
    tcgPlayer: 555271,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "PIXLEXIA",
      description:
        "When you play this character, she gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess", "Racer"],
  abilities: [
    {
      id: "a4q-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "a4q-2",
      name: "PIXLEXIA",
      text: "PIXLEXIA When you play this character, she gains Evasive until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
