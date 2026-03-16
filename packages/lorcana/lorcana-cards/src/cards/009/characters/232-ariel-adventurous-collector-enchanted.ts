import type { CharacterCard } from "@tcg/lorcana-types";

export const arielAdventurousCollectorEnchanted: CharacterCard = {
  id: "NxO",
  canonicalId: "ci_6BB",
  reprints: ["set3-103", "set9-107"],
  cardType: "character",
  name: "Ariel",
  version: "Adventurous Collector",
  i18n: {
    en: {
      name: "Ariel",
      version: "Adventurous Collector",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "INSPIRING VOICE",
          description:
            "Whenever you play a song, chosen character of yours gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Abenteuerlustige Sammlerin",
      text: "Wendig BEGEISTERNDE STIMME Jedes Mal, wenn du ein Lied ausspielst, wähle einen deiner Charaktere, er erhält bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Ariel",
      version: "Collectionneuse intrépide",
      text: "Insaisissable VOIX INSPIRANTE Chaque fois que vous jouez une chanson, choisissez l'un de vos personnages qui gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Ariel",
      version: "Collezionista Avventurosa",
      text: "Sfuggente VOCE MOTIVANTE Ogni volta che giochi una canzone, uno dei tuoi personaggi a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 232,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e6a1d03334964fb78033020d86a5f502",
    tcgPlayer: 651123,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "INSPIRING VOICE",
      description:
        "Whenever you play a song, chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "1ws-1",
      name: "Evasive INSPIRING VOICE",
      text: "Evasive INSPIRING VOICE Whenever you play a song, chosen character of yours gains Evasive until the start of your next turn.",
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
