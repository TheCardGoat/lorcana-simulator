import type { CharacterCard } from "@tcg/lorcana-types";

export const princePhillipVanquisherOfFoes: CharacterCard = {
  id: "Z2r",
  canonicalId: "ci_UBa",
  reprints: ["set4-087", "set9-073"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Vanquisher of Foes",
  i18n: {
    en: {
      name: "Prince Phillip",
      version: "Vanquisher of Foes",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "Evasive",
        },
        {
          title: "SWIFT AND SURE",
          description: "When you play this character, banish all opposing damaged characters.",
        },
      ],
    },
    de: {
      name: "Prinz Phillip",
      version: "Bezwinger der Feinde",
      text: "Gestaltwandel 6 Wendig SCHICKE VERDERBEN Wenn du diesen Charakter ausspielst, verbanne alle gegnerischen beschädigten Charaktere.",
    },
    fr: {
      name: "Prince Philippe",
      version: "Pourfendeur d'ennemis",
      text: "Alter 6 Insaisissable FRAPPE AU CŒUR Lorsque vous jouez ce personnage, bannissez tous les personnages adverses ayant au moins un jeton Dommage.",
    },
    it: {
      name: "Principe Filippo",
      version: "Distruttore di Nemici",
      text: "Trasformazione 6 Sfuggente SPADA MAGICA Quando giochi questo personaggio, esilia tutti i personaggi avversari danneggiati.",
    },
  },
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "004",
  cardNumber: 87,
  rarity: "common",
  cost: 9,
  strength: 6,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4c762e16709149b79b4f7d895fd1de8b",
    tcgPlayer: 650015,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "Evasive",
    },
    {
      title: "SWIFT AND SURE",
      description: "When you play this character, banish all opposing damaged characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1db-1",
      keyword: "Shift",
      text: "Shift 6 {I}",
      type: "keyword",
    },
    {
      id: "1db-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "1db-3",
      name: "SWIFT AND SURE",
      text: "SWIFT AND SURE When you play this character, banish all opposing damaged characters.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
