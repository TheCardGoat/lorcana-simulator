import type { CharacterCard } from "@tcg/lorcana-types";

export const ichabodCraneBookishSchoolmaster: CharacterCard = {
  id: "Nus",
  canonicalId: "ci_Nus",
  reprints: ["set10-148"],
  cardType: "character",
  name: "Ichabod Crane",
  version: "Bookish Schoolmaster",
  i18n: {
    en: {
      name: "Ichabod Crane",
      version: "Bookish Schoolmaster",
      text: [
        {
          title: "WELL-READ",
          description:
            "Whenever this character quests, if you've played a character with cost 5 or more this turn, put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Ichabod Crane",
      version: "Buchgläubiger Schulmeister",
      text: [
        {
          title: "GUT BELESEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, falls du in diesem Zug mindestens 1 Charakter ausgespielt hast, der 5 oder mehr kostet, lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Ichabod Crane",
      version: "Maître d'école bibliophile",
      text: [
        {
          title: "LETTRÉ",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, si vous avez joué un personnage coûtant 5 ou plus ce tour-ci, placez la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Ichabod Crane",
      version: "Maestro Studioso",
      text: [
        {
          title: "ISTRUITO",
          description:
            "Ogni volta che questo personaggio va all'avventura, se hai giocato un personaggio con costo 5 o superiore in questo turno, aggiungi la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 148,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_83cc465308474e60aed6b86986d57854",
    tcgPlayer: 660019,
  },
  text: [
    {
      title: "WELL-READ",
      description:
        "Whenever this character quests, if you've played a character with cost 5 or more this turn, put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you've played a character with cost 5 or more this turn",
          type: "if",
        },
        then: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "hnb-1",
      name: "WELL-READ",
      text: "WELL-READ Whenever this character quests, if you've played a character with cost 5 or more this turn, put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
