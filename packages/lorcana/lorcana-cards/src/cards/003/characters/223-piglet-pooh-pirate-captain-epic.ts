import type { CharacterCard } from "@tcg/lorcana-types";

export const pigletPoohPirateCaptainEpic: CharacterCard = {
  id: "ZOH",
  canonicalId: "ci_51V",
  reprints: ["set3-016"],
  cardType: "character",
  name: "Piglet",
  version: "Pooh Pirate Captain",
  i18n: {
    en: {
      name: "Piglet",
      version: "Pooh Pirate Captain",
      text: [
        {
          title: "AND I'M THE CAPTAIN!",
          description: "While you have 2 or more other characters in play, this character gets +2.",
        },
      ],
    },
    de: {
      name: "Ferkel",
      version: "Puuhs Piratenkapitän",
      text: [
        {
          title: "UND ICH BIN DER KAPITÄN!",
          description:
            "Solange du mindestens 2 weitere Charaktere im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Porcinet",
      version: "Capitaine pirate de Winnie",
      text: [
        {
          title: "ET JE SERAI LE CAPITAINE!",
          description:
            "Tant que vous avez au moins 2 autres personnages en jeu, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Pimpi",
      version: "Capitano del Pirata Pooh",
      text: [
        {
          title: "E IO SONO IL CAPITANO!",
          description:
            "Mentre hai altri 2 o più personaggi in gioco, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "003",
  cardNumber: 223,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f478c96f7b1b45b790d74395480da563",
    tcgPlayer: 531822,
  },
  text: [
    {
      title: "AND I'M THE CAPTAIN!",
      description: "While you have 2 or more other characters in play, this character gets +2.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate", "Captain"],
  missingImplementation: true,
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "51i-1",
      text: "AND I'M THE CAPTAIN! While you have 2 or more other characters in play, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
