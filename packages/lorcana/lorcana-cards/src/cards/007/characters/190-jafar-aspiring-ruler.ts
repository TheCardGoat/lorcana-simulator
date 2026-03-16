import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarAspiringRuler: CharacterCard = {
  id: "Fg9",
  canonicalId: "ci_Fg9",
  reprints: ["set7-190"],
  cardType: "character",
  name: "Jafar",
  version: "Aspiring Ruler",
  i18n: {
    en: {
      name: "Jafar",
      version: "Aspiring Ruler",
      text: [
        {
          title: "THAT'S BETTER",
          description:
            "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Aufstrebender Herrscher",
      text: [
        {
          title: "SO IST ES BESSER",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2).",
        },
      ],
    },
    fr: {
      name: "Jafar",
      version: "Aspirant souverain",
      text: [
        {
          title: "VOILÀ QUI EST MIEUX",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Aspirante Monarca",
      text: [
        {
          title: "COSÌ VA MEGLIO",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 190,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_61da3f5c01564ae386af3de304e910af",
    tcgPlayer: 618177,
  },
  text: [
    {
      title: "THAT'S BETTER",
      description:
        "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "1bu-1",
      name: "THAT'S BETTER",
      text: "THAT'S BETTER When you play this character, chosen character gains Challenger +2 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
