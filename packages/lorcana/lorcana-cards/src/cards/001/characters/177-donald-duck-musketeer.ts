import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckMusketeer: CharacterCard = {
  id: "8Ze",
  canonicalId: "ci_8Ze",
  reprints: ["set1-177"],
  cardType: "character",
  name: "Donald Duck",
  version: "Musketeer",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "STAY ALERT!",
          description:
            "During your turn, your Musketeer characters gain Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) STAY ALERT! During your turn, your Musketeer characters gain Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    fr: {
      name: "Donald Duck",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) STAY ALERT! During your turn, your Musketeer characters gain Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    it: {
      name: "Donald Duck",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) STAY ALERT! During your turn, your Musketeer characters gain Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "001",
  cardNumber: 177,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_e854c2e94f504118b3618ae2eb10a195",
    tcgPlayer: 508907,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "STAY ALERT!",
      description:
        "During your turn, your Musketeer characters gain Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      id: "1te-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1te-2",
      name: "STAY ALERT!",
      text: "STAY ALERT! During your turn, your Musketeer characters gain Evasive.",
      type: "static",
    },
  ],
};
