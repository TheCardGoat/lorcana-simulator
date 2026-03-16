import type { CharacterCard } from "@tcg/lorcana-types";

export const isabelaMadrigalInTheMoment: CharacterCard = {
  id: "pWM",
  canonicalId: "ci_pWM",
  reprints: ["set7-025"],
  cardType: "character",
  name: "Isabela Madrigal",
  version: "In the Moment",
  i18n: {
    en: {
      name: "Isabela Madrigal",
      version: "In the Moment",
      text: [
        {
          title: "I'M TIRED OF PERFECT",
          description:
            "Whenever one of your characters sings a song, this character can't be challenged until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Isabela Madrigal",
      version: "Lebt im Moment",
      text: [
        {
          title: "ICH WILL NICHT PERFEKT SEIN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere ein Lied singt, kann dieser Charakter bis zu Beginn deines nächsten Zuges nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Isabela Madrigal",
      version: "Vit le moment présent",
      text: [
        {
          title: "J'EN AI ASSEZ DE LA PERFECTION",
          description:
            "Chaque fois que l'un de vos personnages chante une chanson, ce personnage-ci ne peut pas être défié jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Isabela Madrigal",
      version: "Nel Momento",
      text: [
        {
          title: "SONO STANCA DELLA PERFEZIONE",
          description:
            "Ogni volta che uno dei tuoi personaggi canta una canzone, questo personaggio non può essere sfidato fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 25,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_b5348c3b5e494988a10e2adbfd366f50",
    tcgPlayer: 619420,
  },
  text: [
    {
      title: "I'M TIRED OF PERFECT",
      description:
        "Whenever one of your characters sings a song, this character can't be challenged until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "xh0-1",
      name: "I'M TIRED OF PERFECT",
      text: "I'M TIRED OF PERFECT Whenever one of your characters sings a song, this character can't be challenged until the start of your next turn.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
