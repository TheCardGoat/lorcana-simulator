import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaIslandExplorer: CharacterCard = {
  id: "Roi",
  canonicalId: "ci_Roi",
  reprints: ["set7-134"],
  cardType: "character",
  name: "Moana",
  version: "Island Explorer",
  i18n: {
    en: {
      name: "Moana",
      version: "Island Explorer",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "ADVENTUROUS SPIRIT",
          description:
            "Whenever this character challenges another character, another chosen character of yours gets +3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Erforscherin von Inseln",
      text: "Wendig ABENTEUERGEIST Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, wähle einen deiner anderen Charaktere. Jener erhält in diesem Zug +3.",
    },
    fr: {
      name: "Vaiana",
      version: "Exploratrice d'île",
      text: "Insaisissable ESPRIT D'AVENTURE Chaque fois que ce personnage en défie un autre, choisissez un autre de vos personnages qui gagne +3 pour le reste de ce tour.",
    },
    it: {
      name: "Vaiana",
      version: "Esploratrice dell'Isola",
      text: "Sfuggente SPIRITO AVVENTUROSO Ogni volta che questo personaggio sfida un altro personaggio, un tuo altro personaggio a tua scelta riceve +3 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "007",
  cardNumber: 134,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_da7a7db2845c4262be680a8a5b03c027",
    tcgPlayer: 619480,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "ADVENTUROUS SPIRIT",
      description:
        "Whenever this character challenges another character, another chosen character of yours gets +3 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1rb-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 3,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1rb-2",
      name: "ADVENTUROUS SPIRIT",
      text: "ADVENTUROUS SPIRIT Whenever this character challenges another character, another chosen character of yours gets +3 {S} this turn.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
