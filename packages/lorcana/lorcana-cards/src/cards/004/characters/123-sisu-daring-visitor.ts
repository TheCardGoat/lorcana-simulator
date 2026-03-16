import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuDaringVisitor: CharacterCard = {
  id: "W3s",
  canonicalId: "ci_zcv",
  reprints: ["set4-123", "set9-119"],
  cardType: "character",
  name: "Sisu",
  version: "Daring Visitor",
  i18n: {
    en: {
      name: "Sisu",
      version: "Daring Visitor",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "BRING ON THE HEAT!",
          description:
            "When you play this character, banish chosen opposing character with 1 {S} or less.",
        },
      ],
    },
    de: {
      name: "Sisu",
      version: "Wagemutige Besucherin",
      text: "Wendig BRENN MIR DIE ZUNGE WEG! Wenn du diesen Charakter ausspielst, verbanne einen gegnerischen Charakter deiner Wahl mit 1 oder weniger.",
    },
    fr: {
      name: "Sisu",
      version: "Visiteuse audacieuse",
      text: "Insaisissable VAS-Y POUR LA DYNAMITE! Lorsque vous jouez ce personnage, choisissez un personnage adverse avec 1 ou moins et bannissez-le.",
    },
    it: {
      name: "Sisu",
      version: "Visitatrice Audace",
      text: "Sfuggente SUPER PICCANTE! Quando giochi questo personaggio, esilia un personaggio avversario a tua scelta con 1 o inferiore.",
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 123,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_76066fccc9724d34b6e7a238e52bee61",
    tcgPlayer: 650055,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "BRING ON THE HEAT!",
      description:
        "When you play this character, banish chosen opposing character with 1 {S} or less.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      id: "1y1-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1y1-2",
      name: "BRING ON THE HEAT!",
      text: "BRING ON THE HEAT! When you play this character, banish chosen opposing character with 1 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
