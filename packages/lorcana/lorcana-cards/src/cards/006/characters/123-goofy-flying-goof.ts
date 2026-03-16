import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyFlyingGoof: CharacterCard = {
  id: "GQo",
  canonicalId: "ci_GQo",
  reprints: ["set6-123"],
  cardType: "character",
  name: "Goofy",
  version: "Flying Goof",
  i18n: {
    en: {
      name: "Goofy",
      version: "Flying Goof",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Evasive",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Fliegender Goof",
      text: "Rasant Wendig",
    },
    fr: {
      name: "Dingo",
      version: "Gaffeur volant",
      text: "Charge Insaisissable",
    },
    it: {
      name: "Pippo",
      version: "Pasticcione Volante",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) Sfuggente",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "006",
  cardNumber: 123,
  rarity: "rare",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_bb6785f344ac4b43812ed03ffe3793af",
    tcgPlayer: 593008,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1i6-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1i6-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
