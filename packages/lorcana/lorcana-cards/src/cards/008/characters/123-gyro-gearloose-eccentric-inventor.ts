import type { CharacterCard } from "@tcg/lorcana-types";

export const gyroGearlooseEccentricInventor: CharacterCard = {
  id: "mYr",
  canonicalId: "ci_mYr",
  reprints: ["set8-123"],
  cardType: "character",
  name: "Gyro Gearloose",
  version: "Eccentric Inventor",
  i18n: {
    en: {
      name: "Gyro Gearloose",
      version: "Eccentric Inventor",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "I'LL SHOW YOU!",
          description:
            "When you play this character, chosen opposing character gets -3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Daniel Düsentrieb",
      version: "Exzentrischer Erfinder",
      text: "Wendig ICH ZEIGE ES IHNEN! Wenn du diesen Charakter ausspielst, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -3.",
    },
    fr: {
      name: "Géo Trouvetou",
      version: "Inventeur excentrique",
      text: "Insaisissable VOUS ALLEZ VOIR! Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -3 pour le reste de ce tour.",
    },
    it: {
      name: "Archimede Pitagorico",
      version: "Inventore Eccentrico",
      text: "Sfuggente VE LO DIMOSTRERÒ! Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -3 per questo turno.",
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Ducktales",
  set: "008",
  cardNumber: 123,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3e2e03e343f64fa9ad398cb733b154bd",
    tcgPlayer: 631429,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "I'LL SHOW YOU!",
      description: "When you play this character, chosen opposing character gets -3 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Inventor"],
  abilities: [
    {
      id: "1fz-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: -3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1fz-2",
      name: "I'LL SHOW YOU!",
      text: "I'LL SHOW YOU! When you play this character, chosen opposing character gets -3 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
