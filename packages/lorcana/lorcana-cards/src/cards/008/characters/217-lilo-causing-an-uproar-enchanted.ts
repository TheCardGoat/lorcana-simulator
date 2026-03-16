import type { CharacterCard } from "@tcg/lorcana-types";

export const liloCausingAnUproarEnchanted: CharacterCard = {
  id: "Isl",
  canonicalId: "ci_U6V",
  reprints: ["set8-137"],
  cardType: "character",
  name: "Lilo",
  version: "Causing an Uproar",
  i18n: {
    en: {
      name: "Lilo",
      version: "Causing an Uproar",
      text: [
        {
          title: "STOMPIN' TIME!",
          description:
            "During your turn, if you've played 3 or more actions this turn, you may play this character for free.",
        },
        {
          title: "RAAAWR!",
          description:
            "When you play this character, ready chosen character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Aufruhr-Auslöserin",
      text: [
        {
          title: "ZEIT, ZU STAMPFEN!",
          description:
            "Falls du in diesem Zug mindestens 3 Aktionen ausgespielt hast, darfst du diesen Charakter kostenlos ausspielen.",
        },
        {
          title: "ROOOAA!",
          description:
            "Wenn du diesen Charakter ausspielst, mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Lilo",
      version: "Faisant du raffut",
      text: [
        {
          title: "L'HEURE DU PIÉTINEMENT!",
          description:
            "Durant votre tour, vous pouvez jouer ce personnage gratuitement si vous avez joué 3 actions ou plus lors de ce tour.",
        },
        {
          title: "ROAAAR!",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et redressez-le. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Lilo",
      version: "Che Scatena un Putiferio",
      text: [
        {
          title: "È TEMPO DI CALPESTARE!",
          description:
            "Durante il tuo turno, se hai giocato 3 o più azioni in questo turno, puoi giocare questo personaggio gratis.",
        },
        {
          title: "ROOOAR!",
          description:
            "Quando giochi questo personaggio, prepara un personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 217,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_95167fa28eb2442c8d04fc67d2db7fa7",
    tcgPlayer: 632684,
  },
  text: [
    {
      title: "STOMPIN' TIME!",
      description:
        "During your turn, if you've played 3 or more actions this turn, you may play this character for free.",
    },
    {
      title: "RAAAWR!",
      description:
        "When you play this character, ready chosen character. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "played-actions",
          comparison: {
            operator: "gte",
            value: 3,
          },
        },
        then: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "1to-1",
      text: "STOMPIN' TIME! During your turn, if you've played 3 or more actions this turn, you may play this character for free.",
      type: "action",
    },
    {
      effect: {
        steps: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1to-2",
      name: "RAAAWR!",
      text: "RAAAWR! When you play this character, ready chosen character. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
