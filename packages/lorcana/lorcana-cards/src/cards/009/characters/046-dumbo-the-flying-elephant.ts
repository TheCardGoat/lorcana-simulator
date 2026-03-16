import type { CharacterCard } from "@tcg/lorcana-types";

export const dumboTheFlyingElephant: CharacterCard = {
  id: "nnC",
  canonicalId: "ci_nnC",
  reprints: ["set9-046"],
  cardType: "character",
  name: "Dumbo",
  version: "The Flying Elephant",
  i18n: {
    en: {
      name: "Dumbo",
      version: "The Flying Elephant",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "AERIAL DUO",
          description:
            "When you play this character, chosen character gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Dumbo",
      version: "Der fliegende Elefant",
      text: "Wendig LUFT-DUO Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Dumbo",
      version: "L’éléphant volant",
      text: "Insaisissable DUO AÉRIEN Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Dumbo",
      version: "L'Elefante Volante",
      text: "Sfuggente COPPIA AEREA Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Dumbo",
  set: "009",
  cardNumber: 46,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1c42d9e976d0414099a145227b83b08c",
    tcgPlayer: 647679,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "AERIAL DUO",
      description:
        "When you play this character, chosen character gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "ab9-1",
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
      id: "ab9-2",
      name: "AERIAL DUO",
      text: "AERIAL DUO When you play this character, chosen character gains Evasive until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
