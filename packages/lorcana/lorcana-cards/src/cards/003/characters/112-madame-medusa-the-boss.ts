import type { CharacterCard } from "@tcg/lorcana-types";

export const madameMedusaTheBoss: CharacterCard = {
  id: "ktd",
  canonicalId: "ci_ktd",
  reprints: ["set3-112"],
  cardType: "character",
  name: "Madame Medusa",
  version: "The Boss",
  i18n: {
    en: {
      name: "Madame Medusa",
      version: "The Boss",
      text: [
        {
          title: "THAT TERRIBLE WOMAN",
          description:
            "When you play this character, banish chosen opposing character with 3 {S} or less.",
        },
      ],
    },
    de: {
      name: "Madam Medusa",
      version: "Die Chefin",
      text: [
        {
          title: "DIESE FURCHTBARE FRAU",
          description:
            "Wenn du diesen Charakter ausspielst, verbanne einen gegnerischen Charakter deiner Wahl mit 3 oder weniger.",
        },
      ],
    },
    fr: {
      name: "Madame Médusa",
      version: "La patronne",
      text: [
        {
          title: "JE VOUS PULVÉRISE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse avec 3 ou moins et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Madame Medusa",
      version: "Il Boss",
      text: [
        {
          title: "QUELL'ORRIBILE DONNA",
          description:
            "Quando giochi questo personaggio, esilia un personaggio avversario a tua scelta con 3 o inferiore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Rescuers",
  set: "003",
  cardNumber: 112,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_62c656f20cba4c43a1ed1f7ebc2ca720",
    tcgPlayer: 539089,
  },
  text: [
    {
      title: "THAT TERRIBLE WOMAN",
      description:
        "When you play this character, banish chosen opposing character with 3 {S} or less.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "162-1",
      name: "THAT TERRIBLE WOMAN",
      text: "THAT TERRIBLE WOMAN When you play this character, banish chosen opposing character with 3 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
