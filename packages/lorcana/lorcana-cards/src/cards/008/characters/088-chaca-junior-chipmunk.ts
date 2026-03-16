import type { CharacterCard } from "@tcg/lorcana-types";

export const chacaJuniorChipmunk: CharacterCard = {
  id: "Vx6",
  canonicalId: "ci_Vx6",
  reprints: ["set8-088"],
  cardType: "character",
  name: "Chaca",
  version: "Junior Chipmunk",
  i18n: {
    en: {
      name: "Chaca",
      version: "Junior Chipmunk",
      text: [
        {
          title: "IN CAHOOTS",
          description:
            "When you play this character, if you have a character named Tipo in play, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Chaca",
      version: "Junior Chipmunk",
      text: [
        {
          title: "UNTER GLEICHGESINNTEN",
          description:
            "Wenn du diesen Charakter ausspielst und einen Tipo-Charakter im Spiel hast, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Chaca",
      version: "Ragondin Junior",
      text: [
        {
          title: "DE MÈCHE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage nommé Tipo en jeu, choisissez un personnage adverse qui gagne Combattant durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Chaca",
      version: "Giovane Marmotta",
      text: [
        {
          title: "COMPLICI",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Tipo, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 88,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4be229ca7b79419896cf9bea3c11ee66",
    tcgPlayer: 631409,
  },
  text: [
    {
      title: "IN CAHOOTS",
      description:
        "When you play this character, if you have a character named Tipo in play, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character named Tipo in play",
          type: "if",
        },
        then: {
          keyword: "Reckless",
          target: "CHOSEN_CHARACTER",
          type: "gain-keyword",
        },
        type: "conditional",
      },
      id: "mhv-1",
      name: "IN CAHOOTS",
      text: "IN CAHOOTS When you play this character, if you have a character named Tipo in play, chosen opposing character gains Reckless during their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
