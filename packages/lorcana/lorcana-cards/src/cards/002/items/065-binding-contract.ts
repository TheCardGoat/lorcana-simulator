import type { ItemCard } from "@tcg/lorcana-types";

export const bindingContract: ItemCard = {
  id: "DNe",
  canonicalId: "ci_DNe",
  reprints: ["set2-065"],
  cardType: "item",
  name: "Binding Contract",
  i18n: {
    en: {
      name: "Binding Contract",
      text: [
        {
          title: "FOR ALL ETERNITY",
          description: "{E}, {E} one of your characters — Exert chosen character.",
        },
      ],
    },
    de: {
      name: "Verbindlicher Vertrag",
      text: [
        {
          title: "IN ALLE EWIGKEIT,",
          description: "einen deiner Charaktere — Erschöpfe einen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Contrat irrévocable",
      text: [
        {
          title: "POUR TOUTE",
          description:
            "L'ÉTERNITÉ, l'un de vos personnages — Choisissez un personnage et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Binding Contract",
      text: [
        {
          title: "FOR ALL ETERNITY,",
          description: "one of your characters — Exert chosen character.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "002",
  cardNumber: 65,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_baa89f6923b94ff6a59e1957814a2645",
    tcgPlayer: 527740,
  },
  text: [
    {
      title: "FOR ALL ETERNITY",
      description: "{E}, {E} one of your characters — Exert chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        exertCharacters: 1,
      },
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "exert",
      },
      id: "1ri-1",
      name: "FOR ALL ETERNITY",
      text: "FOR ALL ETERNITY {E}, {E} one of your characters — Exert chosen character.",
      type: "activated",
    },
  ],
};
