import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomIndustrialModel: CharacterCard = {
  id: "QlQ",
  canonicalId: "ci_QlQ",
  reprints: ["set2-188"],
  cardType: "character",
  name: "Magic Broom",
  version: "Industrial Model",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Industrial Model",
      text: [
        {
          title: "MAKE IT SHINE",
          description:
            "When you play this character, chosen character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Industrieausführung",
      text: [
        {
          title: "AUF HOCHGLANZ POLIEREN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Balais magiques",
      version: "Modèle industriel",
      text: [
        {
          title: "FAUT QUE ÇA BRILLE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Modello Industriale",
      text: [
        {
          title: "FALLO BRILLARE",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Fantasia",
  set: "002",
  cardNumber: 188,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e3b8971a2d4140a79429277295edc4eb",
    tcgPlayer: 527777,
  },
  text: [
    {
      title: "MAKE IT SHINE",
      description:
        "When you play this character, chosen character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  missingTests: true,
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 1,
      },
      id: "11u-1",
      name: "MAKE IT SHINE",
      text: "MAKE IT SHINE When you play this character, chosen character gains Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
