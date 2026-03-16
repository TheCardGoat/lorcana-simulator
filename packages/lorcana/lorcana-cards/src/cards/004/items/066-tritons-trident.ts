import type { ItemCard } from "@tcg/lorcana-types";

export const tritonsTrident: ItemCard = {
  id: "xKb",
  canonicalId: "ci_xKb",
  reprints: ["set4-066"],
  cardType: "item",
  name: "Triton's Trident",
  i18n: {
    en: {
      name: "Triton's Trident",
      text: [
        {
          title: "SYMBOL OF POWER",
          description:
            "Banish this item — Chosen character gets +1 {S} this turn for each card in your hand.",
        },
      ],
    },
    de: {
      name: "Tritons Dreizack",
      text: [
        {
          title: "SYMBOL DER MACHT",
          description:
            "Verbanne diesen Gegenstand — Gib einem Charakter deiner Wahl in diesem Zug +1 für jede Karte auf deiner Hand.",
        },
      ],
    },
    fr: {
      name: "Trident de Triton",
      text: [
        {
          title: "SYMBOLE DE POUVOIR",
          description:
            "Bannissez cet objet — Choisissez un personnage qui gagne +1 par carte dans votre main pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Il Tridente di Tritone",
      text: [
        {
          title: "SIMBOLO DI POTERE",
          description:
            "Esilia questo oggetto — Un personaggio a tua scelta riceve +1 per questo turno per ogni carta che hai in mano.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 66,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_57067560f7f0499da43dd94731e85552",
    tcgPlayer: 543911,
  },
  text: [
    {
      title: "SYMBOL OF POWER",
      description:
        "Banish this item — Chosen character gets +1 {S} this turn for each card in your hand.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        duration: "this-turn",
        modifier: {
          type: "cards-in-hand",
          controller: "you",
        },
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "l9u-1",
      name: "SYMBOL OF POWER",
      text: "SYMBOL OF POWER Banish this item — Chosen character gets +1 {S} this turn for each card in your hand.",
      type: "activated",
    },
  ],
};
