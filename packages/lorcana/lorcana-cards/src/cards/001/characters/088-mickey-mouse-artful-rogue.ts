import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseArtfulRogue: CharacterCard = {
  id: "PiO",
  canonicalId: "ci_8IO",
  reprints: ["set1-088"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Artful Rogue",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Artful Rogue",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "MISDIRECTION",
          description:
            "Whenever you play an action, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Gewiefter Gauner",
      text: "Gestaltwandel 5 IRREFÜHRUNG Jedes Mal, wenn du eine Aktion ausspielst, wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht erkunden.",
    },
    fr: {
      name: "MICKEY",
      version: "Bandit rusé",
      text: [
        {
          title: "Alter 5",
          description:
            "(Vous pouvez payer 5 pour jouer ce personnage sur l'un de vos personnages Mickey MAUVAISE ORIENTATION Chaque fois que vous jouez une carte action, choisissez un personnage adverse. Il ne peut pas être envoyé à l'aventure durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Artful Rogue",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Mickey Mouse.) MISDIRECTION Whenever you play an action, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "001",
  cardNumber: 88,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: false,
  missingImplementation: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_1a8604b7ba6c45e2bc8b32b0a70d08b5",
    tcgPlayer: 510156,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "MISDIRECTION",
      description:
        "Whenever you play an action, chosen opposing character can't quest during their next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "dul-1",
      text: "**Shift** 5 (_You may pay 5 {I} to play this on top of one of your characters named Tinker Bell._)\n**MISDIRECTION** Whenever you play an action, chosen opposing character can",
      type: "action",
    },
  ],
};
