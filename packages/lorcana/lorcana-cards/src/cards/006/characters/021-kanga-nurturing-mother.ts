import type { CharacterCard } from "@tcg/lorcana-types";

export const kangaNurturingMother: CharacterCard = {
  id: "jsu",
  canonicalId: "ci_jsu",
  reprints: ["set6-021"],
  cardType: "character",
  name: "Kanga",
  version: "Nurturing Mother",
  i18n: {
    en: {
      name: "Kanga",
      version: "Nurturing Mother",
      text: [
        {
          title: "SAFE AND SOUND",
          description:
            "Whenever this character quests, choose a character of yours and that character can't be challenged until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Kanga",
      version: "Pflegende Mutter",
      text: [
        {
          title: "GESUND UND MUNTER",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, wähle einen deiner anderen Charaktere. Jener kann bis zu Beginn deines nächsten Zuges nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Maman Gourou",
      version: "Mère nourricière",
      text: [
        {
          title: "SAIN ET SAUF",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un autre de vos personnages qui ne pourra pas être défié jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Kanga",
      version: "Madre Amorevole",
      text: [
        {
          title: "AL SICURO",
          description:
            "Ogni volta che questo personaggio va all'avventura, un tuo altro personaggio a tua scelta non può essere sfidato fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 21,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4557d5bc41de40728df0ebbbdce4787f",
    tcgPlayer: 593019,
  },
  text: [
    {
      title: "SAFE AND SOUND",
      description:
        "Whenever this character quests, choose a character of yours and that character can't be challenged until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "qu5-1",
      name: "SAFE AND SOUND",
      text: "SAFE AND SOUND Whenever this character quests, choose a character of yours and that character can't be challenged until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
