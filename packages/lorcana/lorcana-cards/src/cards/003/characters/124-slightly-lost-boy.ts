import type { CharacterCard } from "@tcg/lorcana-types";

export const slightlyLostBoy: CharacterCard = {
  id: "pa7",
  canonicalId: "ci_pa7",
  reprints: ["set3-124"],
  cardType: "character",
  name: "Slightly",
  version: "Lost Boy",
  i18n: {
    en: {
      name: "Slightly",
      version: "Lost Boy",
      text: [
        {
          title: "THE FOX",
          description:
            "If you have a character named Peter Pan in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "Evasive",
        },
      ],
    },
    de: {
      name: "Schlauli",
      version: "Verwunschenes Kind",
      text: [
        {
          title: "DER FUCHS",
          description:
            "Wenn du einen Peter-Pan-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Wendig",
        },
      ],
    },
    fr: {
      name: "La Plume",
      version: "Enfant perdu",
      text: [
        {
          title: "LE RENARD",
          description:
            "Si vous avez un personnage Peter Pan en jeu, jouer ce personnage vous coûte 1 de moins. Insaisissable",
        },
      ],
    },
    it: {
      name: "Slightly",
      version: "Bimbo Sperduto",
      text: [
        {
          title: "LA VOLPE",
          description:
            "Se hai in gioco un personaggio chiamato Peter Pan, paga 1 in meno per giocare questo personaggio. Sfuggente",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 124,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3893e351132b4fc28df9093b721f4f28",
    tcgPlayer: 537948,
  },
  text: [
    {
      title: "THE FOX",
      description:
        "If you have a character named Peter Pan in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Peter Pan",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "1pb-1",
      text: "THE FOX If you have a character named Peter Pan in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      id: "1pb-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
  ],
};
