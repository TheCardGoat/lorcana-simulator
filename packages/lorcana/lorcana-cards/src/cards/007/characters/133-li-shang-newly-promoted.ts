import type { CharacterCard } from "@tcg/lorcana-types";

export const liShangNewlyPromoted: CharacterCard = {
  id: "8NZ",
  canonicalId: "ci_8NZ",
  reprints: ["set7-133"],
  cardType: "character",
  name: "Li Shang",
  version: "Newly Promoted",
  i18n: {
    en: {
      name: "Li Shang",
      version: "Newly Promoted",
      text: [
        {
          title: "I WON'T LET YOU DOWN",
          description: "This character can challenge ready characters.",
        },
        {
          title: "BIG RESPONSIBILITY",
          description: "While this character is damaged, he gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Li Shang",
      version: "Frisch befördert",
      text: [
        {
          title: "DARAUF KÖNNT IHR EUCH VERLASSEN",
          description: "Dieser Charakter kann bereite Charaktere herausfordern.",
        },
        {
          title: "SEHR VIEL VERANTWORTUNG",
          description: "Solange dieser Charakter beschädigt ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Li Shang",
      version: "Nouvellement promu",
      text: [
        {
          title: "JE FERAI TOUT CE QUI EST EN MON POUVOIR",
          description: "Ce personnage peut défier des personnages redressés.",
        },
        {
          title: "UNE ÉNORME RESPONSABILITÉ",
          description: "Tant que ce personnage a au moins un dommage, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Li Shang",
      version: "Appena Promosso",
      text: [
        {
          title: "NON TI DELUDERÒ",
          description: "Questo personaggio può sfidare i personaggi preparati.",
        },
        {
          title: "ENORME RESPONSABILITÀ",
          description: "Mentre questo personaggio ha danno, riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Mulan",
  set: "007",
  cardNumber: 133,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_82fe7f4aeec649bbba476dddb838a620",
    tcgPlayer: 619479,
  },
  text: [
    {
      title: "I WON'T LET YOU DOWN",
      description: "This character can challenge ready characters.",
    },
    {
      title: "BIG RESPONSIBILITY",
      description: "While this character is damaged, he gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Captain"],
  abilities: [
    {
      effect: {
        ability: "can-challenge-ready",
        target: "SELF",
        type: "grant-ability",
      },
      id: "1s1-1",
      name: "I WON'T LET YOU DOWN",
      text: "I WON'T LET YOU DOWN This character can challenge ready characters.",
      type: "static",
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1s1-2",
      text: "BIG RESPONSIBILITY While this character is damaged, he gets +2 {S}.",
      type: "static",
    },
  ],
};
