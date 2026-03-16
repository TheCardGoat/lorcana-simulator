import type { ItemCard } from "@tcg/lorcana-types";

export const musketeerTabard: ItemCard = {
  id: "Srb",
  canonicalId: "ci_Srb",
  reprints: ["set1-203"],
  cardType: "item",
  name: "Musketeer Tabard",
  i18n: {
    en: {
      name: "Musketeer Tabard",
      text: [
        {
          title: "ALL FOR ONE AND ONE FOR ALL",
          description:
            "Whenever one of your characters with Bodyguard is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Wappenrock der Musketiere",
      text: [
        {
          title: "ALLE FÜR EINEN UND EINER FÜR ALLE",
          description:
            "Jedes Mal, wenn einer deiner Charaktere mit Beschützen verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "TABARD DE MOUSQUETAIRE",
      text: [
        {
          title: "UN POUR TOUS, TOUS POUR UN",
          description:
            "Chaque fois qu'un de vos personnages avec Rempart est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Musketeer Tabard",
      text: [
        {
          title: "ALL FOR ONE AND ONE FOR ALL",
          description:
            "Whenever one of your characters with Bodyguard is banished, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "001",
  cardNumber: 203,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_540aa5414bc94516a563bab640ced601",
    tcgPlayer: 505951,
  },
  text: [
    {
      title: "ALL FOR ONE AND ONE FOR ALL",
      description:
        "Whenever one of your characters with Bodyguard is banished, you may draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "8a5-1",
      name: "ALL FOR ONE AND ONE FOR ALL",
      text: "ALL FOR ONE AND ONE FOR ALL Whenever one of your characters with Bodyguard is banished, you may draw a card.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
