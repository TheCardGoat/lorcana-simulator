import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceClumsyAsCanBe: CharacterCard = {
  id: "Xgj",
  canonicalId: "ci_Xgj",
  reprints: ["set8-104"],
  cardType: "character",
  name: "Alice",
  version: "Clumsy as Can Be",
  i18n: {
    en: {
      name: "Alice",
      version: "Clumsy as Can Be",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "ACCIDENT PRONE",
          description:
            "Whenever this character quests, put 1 damage counter on each other character.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Ungeschickt wie immer",
      text: "Gestaltwandel 3 UNFALLGEFÄHRDET Jedes Mal, wenn dieser Charakter erkundet, lege 1 Schadensmarker auf alle anderen Charaktere.",
    },
    fr: {
      name: "Alice",
      version: "Maladroite au possible",
      text: "Alter 3 SUJETTE AUX ACCIDENTS Chaque fois que ce personnage est envoyé à l'aventure, placez 1 dommage sur chaque autre personnage.",
    },
    it: {
      name: "Alice",
      version: "Estremamente Goffa",
      text: "Trasformazione 3 PROPENSA AGLI INCIDENTI Ogni volta che questo personaggio va all'avventura, metti 1 segnalino danno su ogni altro personaggio.",
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 104,
  rarity: "rare",
  cost: 6,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2de38611ab924e2da249c2ceeb1eb89d",
    tcgPlayer: 631417,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "ACCIDENT PRONE",
      description: "Whenever this character quests, put 1 damage counter on each other character.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "luf-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "any",
          selector: "all",
          zones: ["play"],
        },
        type: "put-damage",
      },
      id: "luf-2",
      name: "ACCIDENT PRONE",
      text: "ACCIDENT PRONE Whenever this character quests, put 1 damage counter on each other character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
