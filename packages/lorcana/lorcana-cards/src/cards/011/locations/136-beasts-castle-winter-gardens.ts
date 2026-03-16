import type { LocationCard } from "@tcg/lorcana-types";

export const beastsCastleWinterGardens: LocationCard = {
  id: "xnX",
  canonicalId: "ci_xnX",
  reprints: ["set11-136"],
  cardType: "location",
  name: "Beast's Castle",
  version: "Winter Gardens",
  i18n: {
    en: {
      name: "Beast's Castle",
      version: "Winter Gardens",
      text: [
        {
          title: "SNOWBALL STANDOFF",
          description: "Whenever a character here challenges another character, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Das Schloss des Biests",
      version: "Wintergärten",
      text: [
        {
          title: "SCHNEEBALLSCHLACHT",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort einen anderen Charakter herausfordert, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Château de la Bête",
      version: "Jardins d'hiver",
      text: [
        {
          title: "DUEL DE BOULES DE NEIGE",
          description:
            "Chaque fois qu'un personnage sur ce lieu défie un autre personnage, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Il Castello della Bestia",
      version: "Giardini Invernali",
      text: [
        {
          title: "STALLO DI PALLE DI NEVE",
          description:
            "Ogni volta che un personaggio in questo luogo sfida un altro personaggio, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 136,
  rarity: "common",
  cost: 1,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_5f6b06befa5143649062b5ac4414d7ba",
    tcgPlayer: 675513,
  },
  text: [
    {
      title: "SNOWBALL STANDOFF",
      description: "Whenever a character here challenges another character, gain 1 lore.",
    },
  ],
  abilities: [
    {
      id: "vod-1",
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      name: "SNOWBALL STANDOFF",
      trigger: {
        event: "challenge",
        on: "CHARACTERS_HERE",
        timing: "whenever",
      },
      type: "triggered",
      text: "SNOWBALL STANDOFF Whenever a character here challenges another character, gain 1 lore.",
    },
  ],
};
