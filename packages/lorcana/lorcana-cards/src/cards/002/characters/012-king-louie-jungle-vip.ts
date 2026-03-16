import type { CharacterCard } from "@tcg/lorcana-types";

export const kingLouieJungleVip: CharacterCard = {
  id: "184",
  canonicalId: "ci_184",
  reprints: ["set2-012"],
  cardType: "character",
  name: "King Louie",
  version: "Jungle VIP",
  i18n: {
    en: {
      name: "King Louie",
      version: "Jungle VIP",
      text: [
        {
          title: "LAY IT ON THE LINE",
          description:
            "Whenever another character is banished, you may remove up to 2 damage from this character.",
        },
      ],
    },
    de: {
      name: "King Louie",
      version: "Der größte Klettermax",
      text: [
        {
          title: "DAMIT DU MICH NOCH BESSER KENNENLERNST",
          description:
            "Jedes Mal, wenn ein anderer Charakter verbannt wird, darfst du bis zu 2 Schaden von diesem Charakter entfernen.",
        },
      ],
    },
    fr: {
      name: "Roi Louie",
      version: "La jungle est à ses pieds",
      text: [
        {
          title: "JE M'EN OCCUPE",
          description:
            "Lorsqu'un autre personnage est banni, vous pouvez retirer jusqu'à 2 jetons Dommage de ce personnage.",
        },
      ],
    },
    it: {
      name: "King Louie",
      version: "Jungle VIP",
      text: [
        {
          title: "LAY IT ON THE LINE",
          description:
            "Whenever another character is banished, you may remove up to 2 damage from this character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Jungle Book",
  set: "002",
  cardNumber: 12,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5a9c44f3e0884493b853e0a1c8b1fca6",
    tcgPlayer: 527613,
  },
  text: [
    {
      title: "LAY IT ON THE LINE",
      description:
        "Whenever another character is banished, you may remove up to 2 damage from this character.",
    },
  ],
  classifications: ["Storyborn", "King"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: "SELF",
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "3ec-1",
      name: "LAY IT ON THE LINE",
      text: "LAY IT ON THE LINE Whenever another character is banished, you may remove up to 2 damage from this character.",
      trigger: {
        event: "banish",
        on: "OTHER_CHARACTERS",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
