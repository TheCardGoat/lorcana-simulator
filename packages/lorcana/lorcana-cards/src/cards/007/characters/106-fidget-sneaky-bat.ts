import type { CharacterCard } from "@tcg/lorcana-types";

export const fidgetSneakyBat: CharacterCard = {
  id: "xmE",
  canonicalId: "ci_xmE",
  reprints: ["set7-106"],
  cardType: "character",
  name: "Fidget",
  version: "Sneaky Bat",
  i18n: {
    en: {
      name: "Fidget",
      version: "Sneaky Bat",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "I TOOK CARE OF EVERYTHING",
          description:
            "Whenever this character quests, another chosen character of yours gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Greifer",
      version: "Hinterhältige Fledermaus",
      text: "Wendig ICH HABE MICH UM ALLES GEKÜMMERT Jedes Mal, wenn dieser Charakter erkundet, wähle einen deiner anderen Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Fidget",
      version: "Chauve-souris furtive",
      text: "Insaisissable J'AI TOUT CE QU'IL VOUS FALLAIT Chaque fois que ce personnage est envoyé à l'aventure, choisissez un autre de vos personnages qui gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Vampirello",
      version: "Pipistrello Furtivo",
      text: "Sfuggente HO PRESO TUTTO Ogni volta che questo personaggio va all'avventura, un tuo altro personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Great Mouse Detective",
  set: "007",
  cardNumber: 106,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0306993b7adb4a52afb9ff31aea3a9b1",
    tcgPlayer: 619464,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "I TOOK CARE OF EVERYTHING",
      description:
        "Whenever this character quests, another chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1lo-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
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
      id: "1lo-2",
      name: "I TOOK CARE OF EVERYTHING",
      text: "I TOOK CARE OF EVERYTHING Whenever this character quests, another chosen character of yours gains Evasive until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
