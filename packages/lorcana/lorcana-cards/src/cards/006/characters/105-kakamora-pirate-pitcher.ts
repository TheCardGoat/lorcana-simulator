import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraPiratePitcher: CharacterCard = {
  id: "AVY",
  canonicalId: "ci_AVY",
  reprints: ["set6-105"],
  cardType: "character",
  name: "Kakamora",
  version: "Pirate Pitcher",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Pirate Pitcher",
      text: [
        {
          title: "DIZZYING SPEED",
          description:
            "When you play this character, chosen Pirate character gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Kokomora",
      version: "Piraten-Werfer",
      text: [
        {
          title: "SCHWINDELERREGENDE GESCHWINDIGKEIT",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Pirat deiner Wahl bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Kakamora",
      version: "Lance-pirate",
      text: [
        {
          title: "VITESSE FULGURANTE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Pirate qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Kakamora",
      version: "Lanciatore Pirata",
      text: [
        {
          title: "VELOCITÀ DISORIENTANTE",
          description:
            "Quando giochi questo personaggio, un personaggio Pirata a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 105,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_46799cbfa9fd48629572bf3851c598af",
    tcgPlayer: 588362,
  },
  text: [
    {
      title: "DIZZYING SPEED",
      description:
        "When you play this character, chosen Pirate character gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Pirate"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "xu8-1",
      name: "DIZZYING SPEED",
      text: "DIZZYING SPEED When you play this character, chosen Pirate character gains Evasive until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
