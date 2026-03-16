import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinHeroicOutlaw: CharacterCard = {
  id: "D7K",
  canonicalId: "ci_wrC",
  reprints: ["set1-104"],
  cardType: "character",
  name: "Aladdin",
  version: "Heroic Outlaw",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Heroic Outlaw",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "DARING EXPLOIT",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you gain 2 lore and each opponent loses 2 lore.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Heldenhafter Bandit",
      text: "Gestaltwandel 5 DREISTE HELDENTAT Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden und alle gegnerischen Mitspielenden verlieren je 2.",
    },
    fr: {
      name: "ALADDIN",
      version: "Hors-la-loi héroïque",
      text: "Alter 5 EXPLOIT AUDACIEUX Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous gagnez 2 éclats de Lore et chaque adversaire en perd 2.",
    },
    it: {
      name: "Aladdin",
      version: "Heroic Outlaw",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Aladdin.) DARING EXPLOIT During your turn, whenever this character banishes another character in a challenge, you gain 2 lore and each opponent loses 2 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 104,
  rarity: "common",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_7c621010e3e6471d9916eee4bcd0b11d",
    tcgPlayer: 510157,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "DARING EXPLOIT",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you gain 2 lore and each opponent loses 2 lore.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "c0t-1",
      text: "**Shift** 5 _(You may pay 5 {I} to play this on top of one of your characters named Aladdin.)_\n**DARING EXPLOIT** During your turn, whenever this\rcharacter banishes another character in a challenge, you gain 2 lore and each opponent loses 2 lore.",
      type: "action",
    },
  ],
};
