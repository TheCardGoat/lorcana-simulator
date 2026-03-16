import type { CharacterCard } from "@tcg/lorcana-types";

export const meekoSkittishScrounger: CharacterCard = {
  id: "9zz",
  canonicalId: "ci_9zz",
  reprints: ["set11-046"],
  cardType: "character",
  name: "Meeko",
  version: "Skittish Scrounger",
  i18n: {
    en: {
      name: "Meeko",
      version: "Skittish Scrounger",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "BOTTOMLESS PIT",
          description:
            "At the end of your turn, if this character is exerted, choose and discard a card or banish him.",
        },
      ],
    },
    de: {
      name: "Meeko",
      version: "Sprunghafter Schnorrer",
      text: "Wendig NIMMERSATT Am Ende deines Zuges, falls dieser Charakter erschöpft ist, wähle eine Karte aus deiner Hand und wirf sie ab oder verbanne diesen Charakter.",
    },
    fr: {
      name: "Meeko",
      version: "Pique-assiette craintif",
      text: "Insaisissable VENTRE À QUATRE PATTES À la fin de votre tour, si ce personnage est épuisé, défaussez une carte ou bannissez-le.",
    },
    it: {
      name: "Meeko",
      version: "Scroccone Irrequieto",
      text: "Sfuggente POZZO SENZA FONDO Alla fine del tuo turno, se questo personaggio è impegnato, scegli e scarta una carta o esilialo.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 46,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5be7a45f5453485dbebcd37b436210d9",
    tcgPlayer: 674701,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "BOTTOMLESS PIT",
      description:
        "At the end of your turn, if this character is exerted, choose and discard a card or banish him.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "157-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "157-2",
      name: "BOTTOMLESS PIT",
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "source",
            filters: [
              {
                type: "exerted",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "or",
          optionLabels: ["choose and discard a card", "banish him"],
          options: [
            {
              amount: 1,
              chosen: true,
              from: "hand",
              target: "CONTROLLER",
              type: "discard",
            },
            {
              target: "SELF",
              type: "banish",
            },
          ],
        },
        type: "conditional",
      },
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
      text: "BOTTOMLESS PIT At the end of your turn, if this character is exerted, choose and discard a card or banish him.",
    },
  ],
};
