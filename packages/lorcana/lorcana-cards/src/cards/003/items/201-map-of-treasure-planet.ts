import type { ItemCard } from "@tcg/lorcana-types";

export const mapOfTreasurePlanet: ItemCard = {
  id: "Bf0",
  canonicalId: "ci_Bf0",
  reprints: ["set3-201"],
  cardType: "item",
  name: "Map of Treasure Planet",
  i18n: {
    en: {
      name: "Map of Treasure Planet",
      text: [
        {
          title: "KEY TO THE PORTAL",
          description: "{E} — You pay 1 {I} less for the next location you play this turn.",
        },
        {
          title: "SHOW THE WAY",
          description: "You pay 1 {I} less to move your characters to a location.",
        },
      ],
    },
    de: {
      name: "Karte des Schatzplaneten",
      text: [
        {
          title: "SCHLÜSSEL FÜR DAS PORTAL",
          description:
            "— Du zahlst 1 weniger für den nächsten Ort, den du in diesem Zug ausspielst. ZEIGE DEN WEG HEREIN Du zahlst 1 weniger, um Charaktere zu einem Ort zu bewegen.",
        },
      ],
    },
    fr: {
      name: "Carte de la Planète au Trésor",
      text: [
        {
          title: "CLÉ DU PORTAIL",
          description:
            "— Le prochain lieu que vous jouez durant ce tour vous coûte 1 de moins. MONTRE LE CHEMIN Déplacer vos personnages sur des lieux vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Mappa del Pianeta del Tesoro",
      text: [
        {
          title: "CHIAVE DEL PORTALE",
          description:
            "— Paga 1 in meno per per giocare il tuo prossimo luogo per questo turno. MOSTRARE L'ENTRATA Paga 1 in meno per spostare i tuoi personaggi in un luogo.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 201,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_07d0c6cc94bc4eee9c5f12d78bc8a84c",
    tcgPlayer: 537395,
  },
  text: [
    {
      title: "KEY TO THE PORTAL",
      description: "{E} — You pay 1 {I} less for the next location you play this turn.",
    },
    {
      title: "SHOW THE WAY",
      description: "You pay 1 {I} less to move your characters to a location.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "7x0-1",
      text: "KEY TO THE PORTAL {E} — You pay 1 {I} less for the next location you play this turn.",
      type: "activated",
    },
    {
      effect: {
        character: "CHOSEN_CHARACTER_OF_YOURS",
        cost: "normal",
        type: "move-to-location",
      },
      id: "7x0-2",
      text: "SHOW THE WAY You pay 1 {I} less to move your characters to a location.",
      type: "action",
    },
  ],
};
