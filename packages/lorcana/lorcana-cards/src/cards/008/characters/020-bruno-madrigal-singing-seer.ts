import type { CharacterCard } from "@tcg/lorcana-types";

export const brunoMadrigalSingingSeer: CharacterCard = {
  id: "7WL",
  canonicalId: "ci_7WL",
  reprints: ["set8-020"],
  cardType: "character",
  name: "Bruno Madrigal",
  version: "Singing Seer",
  i18n: {
    en: {
      name: "Bruno Madrigal",
      version: "Singing Seer",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "BRIGHT FUTURE",
          description:
            "Whenever this character sings a song, you may draw a card for each character you have in play.",
        },
      ],
    },
    de: {
      name: "Bruno Madrigal",
      version: "Singender Seher",
      text: "Gestaltwandel 5 STRAHLENDE ZUKUNFT Jedes Mal, wenn dieser Charakter ein Lied singt, darfst du für jeden deiner Charaktere im Spiel eine Karte ziehen.",
    },
    fr: {
      name: "Bruno Madrigal",
      version: "Oracle chantant",
      text: "Alter 5 UN AVENIR RADIEUX Chaque fois que ce personnage chante une chanson, vous pouvez piocher une carte pour chaque personnage que vous avez en jeu.",
    },
    it: {
      name: "Bruno Madrigal",
      version: "Veggente Canoro",
      text: "Trasformazione 5 FUTURO PROSPERO Ogni volta che questo personaggio canta una canzone, puoi pescare una carta per ogni personaggio che hai in gioco.",
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 20,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 7,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5620f9d7486543ea90d2b6a4499c7ae4",
    tcgPlayer: 631364,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "BRIGHT FUTURE",
      description:
        "Whenever this character sings a song, you may draw a card for each character you have in play.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Madrigal"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1cp-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "1cp-2",
      name: "BRIGHT FUTURE",
      text: "BRIGHT FUTURE Whenever this character sings a song, you may draw a card for each character you have in play.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
