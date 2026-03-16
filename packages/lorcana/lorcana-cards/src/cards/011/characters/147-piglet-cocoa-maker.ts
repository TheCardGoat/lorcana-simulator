import type { CharacterCard } from "@tcg/lorcana-types";

export const pigletCocoaMaker: CharacterCard = {
  id: "4rc",
  canonicalId: "ci_4rc",
  reprints: ["set11-147"],
  cardType: "character",
  name: "Piglet",
  version: "Cocoa Maker",
  i18n: {
    en: {
      name: "Piglet",
      version: "Cocoa Maker",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "SPECIAL RECIPE",
          description:
            "At the end of your turn, remove up to 2 damage from each of your characters.",
        },
      ],
    },
    de: {
      name: "Ferkel",
      version: "Kakaomacher",
      text: "Gestaltwandel 3 SPEZIALREZEPT Am Ende deines Zuges, entferne bis zu 2 Schaden von jedem deiner Charaktere.",
    },
    fr: {
      name: "Porcinet",
      version: "Fait du chocolat chaud",
      text: "Alter 3 RECETTE SPÉCIALE À la fin de votre tour, retirez jusqu'à 2 dommages de chacun de vos personnages.",
    },
    it: {
      name: "Pimpi",
      version: "Preparatore di Cioccolata Calda",
      text: "Trasformazione 3 RICETTA SPECIALE Alla fine del tuo turno, rimuovi fino a 2 danni da ogni tuo personaggio.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 147,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_be96288326484fd880acd268246cc300",
    tcgPlayer: 673741,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "SPECIAL RECIPE",
      description: "At the end of your turn, remove up to 2 damage from each of your characters.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "1iy-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "1iy-2",
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      text: "SPECIAL RECIPE At the end of your turn, remove up to 2 damage from each of your characters.",
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
