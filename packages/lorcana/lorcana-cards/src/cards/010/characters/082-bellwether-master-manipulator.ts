import type { CharacterCard } from "@tcg/lorcana-types";

export const bellwetherMasterManipulator: CharacterCard = {
  id: "bgf",
  canonicalId: "ci_bgf",
  reprints: ["set10-082"],
  cardType: "character",
  name: "Bellwether",
  version: "Master Manipulator",
  i18n: {
    en: {
      name: "Bellwether",
      version: "Master Manipulator",
      text: [
        {
          title: "VENDETTA",
          description:
            "When this character is challenged and banished, put 1 damage counter on each opposing character.",
        },
      ],
    },
    de: {
      name: "Bellwether",
      version: "Meisterhafte Manipulatorin",
      text: [
        {
          title: "VENDETTA",
          description:
            "Wenn dieser Charakter herausgefordert und verbannt wird, lege 1 Schadensmarker auf jeden gegnerischen Charakter.",
        },
      ],
    },
    fr: {
      name: "Bellwether",
      version: "Maîtresse en manipulation",
      text: [
        {
          title: "VENDETTA",
          description:
            "Lorsque ce personnage est défié et banni, placez 1 dommage sur chaque personnage adverse.",
        },
      ],
    },
    it: {
      name: "Bellwether",
      version: "Magistrale Manipolatrice",
      text: [
        {
          title: "VENDETTA",
          description:
            "Quando questo personaggio viene sfidato ed esiliato, metti 1 segnalino danno su ogni personaggio avversario.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 82,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5c98a0c3b0924e90bb20d53354594c02",
    tcgPlayer: 658342,
  },
  text: [
    {
      title: "VENDETTA",
      description:
        "When this character is challenged and banished, put 1 damage counter on each opposing character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "put-damage",
      },
      id: "x28-1",
      name: "VENDETTA",
      sourceZones: ["play", "discard"],
      text: "VENDETTA When this character is challenged and banished, put 1 damage counter on each opposing character.",
      trigger: {
        event: "challenged-and-banished",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
