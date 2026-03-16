import type { CharacterCard } from "@tcg/lorcana-types";

export const rafikiShamanDuelist: CharacterCard = {
  id: "q4q",
  canonicalId: "ci_q4q",
  reprints: ["set5-055"],
  cardType: "character",
  name: "Rafiki",
  version: "Shaman Duelist",
  i18n: {
    en: {
      name: "Rafiki",
      version: "Shaman Duelist",
      text: [
        {
          title: "Rush",
        },
        {
          title: "SURPRISING SKILL",
          description:
            "When you play this character, he gains Challenger +4 this turn. (They get +4 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Rafiki",
      version: "Schamanischer Duellant",
      text: "Rasant ÜBERRASCHENDE FÄHIGKEITEN Wenn du diesen Charakter ausspielst, erhält er in diesem Zug Herausfordern +4. (Während dieser Charakter herausfordert, erhält er +4).",
    },
    fr: {
      name: "Rafiki",
      version: "Chamane duelliste",
      text: "Charge PRENDRE PAR SURPRISE Lorsque vous jouez ce personnage, il gagne Offensif +4 pour le reste de ce tour.",
    },
    it: {
      name: "Rafiki",
      version: "Sciamano Duellante",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) ABILITÀ SORPRENDENTE Quando giochi questo personaggio, ottiene Sfidante +4 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 55,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1f76ed2f61db4a9cb5a5647c43e1ebfc",
    tcgPlayer: 560105,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "SURPRISING SKILL",
      description:
        "When you play this character, he gains Challenger +4 this turn. (They get +4 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "v9e-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 4,
      },
      id: "v9e-2",
      name: "SURPRISING SKILL",
      text: "SURPRISING SKILL When you play this character, he gains Challenger +4 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
