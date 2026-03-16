import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomDancingDuster: CharacterCard = {
  id: "hC1",
  canonicalId: "ci_hC1",
  reprints: ["set3-044"],
  cardType: "character",
  name: "Magic Broom",
  version: "Dancing Duster",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Dancing Duster",
      text: [
        {
          title: "POWER CLEAN",
          description:
            "When you play this character, if you have a Sorcerer character in play, you may exert chosen opposing character. They can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Tanzender Staubwedel",
      text: [
        {
          title: "KRAFTREINIGER",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Magier oder eine Magierin im Spiel hast, darfst du einen gegnerischen Charakter deiner Wahl erschöpfen. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Balais magiques",
      version: "Plumeau dansant",
      text: [
        {
          title: "NETTOYAGE À FOND",
          description:
            "Si vous avez un personnage Mage en jeu lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse et l'épuiser. Il ne pourra pas être redressé au début de son prochain tour.",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Spolverino Danzante",
      text: [
        {
          title: "PULIZIA ENERGICA",
          description:
            "Quando giochi questo personaggio, se hai un personaggio Incantatore in gioco, puoi impegnare un personaggio avversario a tua scelta. Quel personaggio non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 44,
  rarity: "uncommon",
  cost: 6,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_bf44f442286c4b5fa783412ae85c3b58",
    tcgPlayer: 539069,
  },
  text: [
    {
      title: "POWER CLEAN",
      description:
        "When you play this character, if you have a Sorcerer character in play, you may exert chosen opposing character. They can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  missingTests: true,
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a Sorcerer character in play",
          type: "if",
        },
        then: {
          duration: "until-start-of-next-turn",
          restriction: "cant-ready",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "1k5-1",
      name: "POWER CLEAN",
      text: "POWER CLEAN When you play this character, if you have a Sorcerer character in play, you may exert chosen opposing character. They can't ready at the start of their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
