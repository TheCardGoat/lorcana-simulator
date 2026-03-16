import type { CharacterCard } from "@tcg/lorcana-types";

export const louisEndearingAlligator: CharacterCard = {
  id: "hTp",
  canonicalId: "ci_hTp",
  reprints: ["set8-095"],
  cardType: "character",
  name: "Louis",
  version: "Endearing Alligator",
  i18n: {
    en: {
      name: "Louis",
      version: "Endearing Alligator",
      text: [
        {
          title: "SENSITIVE SOUL",
          description: "This character enters play exerted.",
        },
        {
          title: "FRIENDLIER THAN HE LOOKS",
          description:
            "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Louis",
      version: "Liebenswerter Alligator",
      text: [
        {
          title: "SENSIBLE SEELE",
          description: "Dieser Charakter kommt erschöpft ins Spiel.",
        },
        {
          title: "FREUNDLICHER, ALS ER AUSSIEHT",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Louis",
      version: "Alligator attachant",
      text: [
        {
          title: "ÂME SENSIBLE",
          description: "Ce personnage entre en jeu épuisé.",
        },
        {
          title: "PLUS SYMPA QU'IL N'Y PARAÎT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui gagne Combattant durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Louis",
      version: "Tenero Alligatore",
      text: [
        {
          title: "ANIMO SENSIBILE",
          description: "Questo personaggio entra in gioco impegnato.",
        },
        {
          title: "PIÙ AMICHEVOLE DI QUANTO SEMBRI",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Princess and the Frog",
  set: "008",
  cardNumber: 95,
  rarity: "uncommon",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fbddbf17f5824cb38bc0b35502f0d9a9",
    tcgPlayer: 631775,
  },
  text: [
    {
      title: "SENSITIVE SOUL",
      description: "This character enters play exerted.",
    },
    {
      title: "FRIENDLIER THAN HE LOOKS",
      description:
        "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "h6i-1",
      name: "SENSITIVE SOUL",
      text: "SENSITIVE SOUL This character enters play exerted.",
      type: "static",
    },
    {
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "h6i-2",
      name: "FRIENDLIER THAN HE LOOKS",
      text: "FRIENDLIER THAN HE LOOKS When you play this character, chosen opposing character gains Reckless during their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
