import type { ItemCard } from "@tcg/lorcana-types";

export const mysticalRose: ItemCard = {
  id: "BsF",
  canonicalId: "ci_BsF",
  reprints: ["set4-064"],
  cardType: "item",
  name: "Mystical Rose",
  i18n: {
    en: {
      name: "Mystical Rose",
      text: [
        {
          title: "DISPEL THE ENTANGLEMENT",
          description:
            "Banish this item — Chosen character named Beast gets +2 {L} this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Geheimnisvolle Rose",
      text: [
        {
          title: "DIE VERSTRICKUNG",
          description:
            "AUFLÖSEN Verbanne diesen Gegenstand — Gib einem Biest-Charakter deiner Wahl in diesem Zug +2. Wenn du einen Belle-Charakter im Spiel hast, verschiebe bis zu 3 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Rose mystique",
      text: [
        {
          title: "DISSIPER L'ENVOUTEMENT",
          description:
            "Bannissez cet objet — Choisissez un personnage La Bête qui gagne +2 pour le reste de ce tour. Si vous avez un personnage Belle en jeu, choisissez un personnage et déplacez jusqu'à 3 de ses jetons Dommage sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Rosa Incantata",
      text: [
        {
          title: "SCIOGLIERE IL GROVIGLIO",
          description:
            "Esilia questo oggetto — Un personaggio a tua scelta chiamato La Bestia riceve +2 per questo turno. Se hai in gioco un personaggio chiamato Belle, sposta fino a 3 segnalini danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 64,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1f22214638bd46d089a6751e57dfd829",
    tcgPlayer: 547683,
  },
  text: [
    {
      title: "DISPEL THE ENTANGLEMENT",
      description:
        "Banish this item — Chosen character named Beast gets +2 {L} this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.",
    },
  ],
  abilities: [
    {
      id: "1il-1",
      text: "DISPEL THE ENTANGLEMENT Banish this item — Chosen character named Beast gets +2 {L} this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.",
      name: "DISPEL THE ENTANGLEMENT",
      cost: {
        banishSelf: true,
      },
      effect: {
        steps: [
          {
            duration: "this-turn",
            modifier: 2,
            stat: "lore",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-name",
                  name: "Beast",
                },
              ],
            },
            type: "modify-stat",
          },
          {
            condition: {
              type: "has-named-character",
              name: "Belle",
              controller: "you",
            },
            then: {
              type: "move-damage",
              amount: 3,
              from: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
                filter: [
                  {
                    type: "damaged",
                  },
                ],
              },
              to: {
                selector: "chosen",
                count: 1,
                owner: "opponent",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "conditional",
          },
        ],
        type: "sequence",
      },
      type: "activated",
    },
  ],
};
