import type { ActionCard } from "@tcg/lorcana-types";

export const iveGotADream: ActionCard = {
  id: "aTe",
  canonicalId: "ci_aTe",
  reprints: ["set3-129"],
  cardType: "action",
  name: "I've Got a Dream",
  i18n: {
    en: {
      name: "I've Got a Dream",
      text: "Ready chosen character of yours at a location. They can't quest for the rest of this turn. Gain lore equal to that location's {L}.",
    },
    de: {
      name: "Ich hab 'nen Traum",
      text: "Mache einen deiner Charaktere an einem Ort bereit. Er kann in diesem Zug nicht mehr erkunden. Sammle so viele Legenden, wie der -Wert dieses Ortes beträgt.",
    },
    fr: {
      name: "Moi, j'ai un rêve",
      text: "Choisissez l'un de vos personnages sur un lieu et redressez-le, il ne peut pas être envoyé à l'aventure pour le reste de ce tour. Gagnez un nombre d'éclats de Lore égal à la de ce lieu.",
    },
    it: {
      name: "Un Sogno C'È",
      text: "(Un personaggio con costo 2 o superiore può per giocare questa canzone gratis.) Prepara un tuo personaggio a tua scelta che si trovi in un luogo. Non può andare all'avventura per il resto di questo turno. Ottieni leggenda pari al di quel luogo.",
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "003",
  cardNumber: 129,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_980a374d3ce34527868e0f78b48f63c6",
    tcgPlayer: 531825,
  },
  text: "Ready chosen character of yours at a location. They can't quest for the rest of this turn. Gain lore equal to that location's {L}.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "ready",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "at-location",
                },
              ],
            },
          },
          {
            type: "restriction",
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              ref: "previous-target",
            },
          },
          {
            type: "gain-lore",
            target: "CARD_OWNER",
            amount: {
              type: "target-location-attribute",
              attribute: "lore",
            },
          },
        ],
      },
    },
  ],
};
