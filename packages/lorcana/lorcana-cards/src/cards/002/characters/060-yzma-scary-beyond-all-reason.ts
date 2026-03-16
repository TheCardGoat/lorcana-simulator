import type { CharacterCard } from "@tcg/lorcana-types";

export const yzmaScaryBeyondAllReason: CharacterCard = {
  id: "mCu",
  canonicalId: "ci_mCu",
  reprints: ["set2-060"],
  cardType: "character",
  name: "Yzma",
  version: "Scary Beyond All Reason",
  i18n: {
    en: {
      name: "Yzma",
      version: "Scary Beyond All Reason",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "CRUEL IRONY",
          description:
            "When you play this character, shuffle another chosen character card into their player's deck. That player draws 2 cards.",
        },
      ],
    },
    de: {
      name: "Isma",
      version: "Schreckensvision",
      text: "Gestaltwandel 4 IRONIE DES SCHICKSALS Wenn du diesen Charakter ausspielst, darfst du einen anderen Charakter deiner Wahl zurück in das zugehörige Deck mischen. Wer jenen Charakter im Spiel hatte, zieht 2 Karten.",
    },
    fr: {
      name: "Yzma",
      version: "Fait peur sans faire exprès",
      text: "Alter 4 IRONIE DU SORT Lorsque vous jouez ce personnage, vous pouvez choisir un autre personnage et le renvoyer dans la pioche de son propriétaire. Il mélange sa pioche puis pioche 2 cartes.",
    },
    it: {
      name: "Yzma",
      version: "Scary Beyond All Reason",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Yzma.) CRUEL IRONY When you play this character, shuffle another chosen character card into their player's deck. That player draws 2 cards.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "002",
  cardNumber: 60,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b687a800e99b4465a744086c0eb9c93f",
    tcgPlayer: 527739,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "CRUEL IRONY",
      description:
        "When you play this character, shuffle another chosen character card into their player's deck. That player draws 2 cards.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      id: "1c0-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4",
    },
    {
      id: "1c0-2",
      effect: {
        amount: 2,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "CRUEL IRONY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CRUEL IRONY When you play this character, shuffle another chosen character card into their player's deck. That player draws 2 cards.",
    },
  ],
};
