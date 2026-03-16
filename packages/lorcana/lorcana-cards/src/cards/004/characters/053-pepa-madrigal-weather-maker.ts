import type { CharacterCard } from "@tcg/lorcana-types";

export const pepaMadrigalWeatherMaker: CharacterCard = {
  id: "Vvx",
  canonicalId: "ci_Vvx",
  reprints: ["set4-053"],
  cardType: "character",
  name: "Pepa Madrigal",
  version: "Weather Maker",
  i18n: {
    en: {
      name: "Pepa Madrigal",
      version: "Weather Maker",
      text: [
        {
          title: "IT LOOKS LIKE RAIN",
          description:
            "When you play this character, you may exert chosen opposing character. That character can't ready at the start of their next turn unless they're at a location.",
        },
      ],
    },
    de: {
      name: "Pepa Madrigal",
      version: "Wettermacherin",
      text: [
        {
          title: "BRUNO KÜNDIGT REGEN AN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen gegnerischen Charakter deiner Wahl erschöpfen. Wenn er nicht an einem Ort ist, wird er zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Pepa Madrigal",
      version: "Fait la pluie et le beau temps",
      text: [
        {
          title: "PRÉDIT UNE TEMPÊTE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse et l'épuiser. Il ne peut pas être redressé au début de son prochain tour, sauf s'il se trouve sur un lieu.",
        },
      ],
    },
    it: {
      name: "Pepa Madrigal",
      version: "Signora degli Elementi",
      text: [
        {
          title: "SEMBRA PIOVERE",
          description:
            "Quando giochi questo personaggio, puoi impegnare un personaggio avversario a tua scelta. Quel personaggio non si può preparare all'inizio del suo prossimo turno a meno che non si trovi in un luogo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 53,
  rarity: "rare",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_8f5bdfa86b31418bb75a251ce2ebd313",
    tcgPlayer: 548205,
  },
  text: [
    {
      title: "IT LOOKS LIKE RAIN",
      description:
        "When you play this character, you may exert chosen opposing character. That character can't ready at the start of their next turn unless they're at a location.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "until-start-of-next-turn",
          restriction: "cant-ready",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "7gu-1",
      name: "IT LOOKS LIKE RAIN",
      text: "IT LOOKS LIKE RAIN When you play this character, you may exert chosen opposing character. That character can't ready at the start of their next turn unless they're at a location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
