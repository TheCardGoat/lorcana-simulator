import type { CharacterCard } from "@tcg/lorcana-types";

export const mrSmeeBumblingMate: CharacterCard = {
  id: "7M2",
  canonicalId: "ci_7M2",
  reprints: ["set3-184"],
  cardType: "character",
  name: "Mr. Smee",
  version: "Bumbling Mate",
  i18n: {
    en: {
      name: "Mr. Smee",
      version: "Bumbling Mate",
      text: [
        {
          title: "OH DEAR, DEAR, DEAR",
          description:
            "At the end of your turn, if this character is exerted and you don't have a Captain character in play, deal 1 damage to this character.",
        },
      ],
    },
    de: {
      name: "Herr Smee",
      version: "Stümperhafter Offizier",
      text: [
        {
          title: "OJE, KÄPT'N",
          description:
            "Am Ende deines Zuges, wenn dieser Charakter erschöpft ist und du keinen Kapitän oder keine Kapitänin im Spiel hast, füge diesem Charakter 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Monsieur Mouche",
      version: "Matelos empoté",
      text: [
        {
          title: "OH LA LA LA LA À",
          description:
            "la fin de votre tour, si ce personnage est épuisé et que vous n'avez aucun personnage Capitaine en jeu, infligez-lui 1 dommage.",
        },
      ],
    },
    it: {
      name: "Spugna",
      version: "Goffo Nostromo",
      text: [
        {
          title: "OH CARO, CARO CAPITAN UNCINO",
          description:
            "Alla fine del tuo turno, se questo personaggio è impegnato e non hai un personaggio Capitano in gioco, infliggi 1 danno a questo personaggio.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 184,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c608166f5ffb4bb195af64fb501902cb",
    tcgPlayer: 539111,
  },
  text: [
    {
      title: "OH DEAR, DEAR, DEAR",
      description:
        "At the end of your turn, if this character is exerted and you don't have a Captain character in play, deal 1 damage to this character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        condition: {
          type: "and",
          conditions: [
            {
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
            {
              type: "not",
              condition: {
                type: "target-query",
                query: {
                  selector: "all",
                  owner: "you",
                  zones: ["play"],
                  cardType: "character",
                  filters: [
                    {
                      type: "has-classification",
                      classification: "Captain",
                    },
                  ],
                },
                comparison: {
                  operator: "gte",
                  value: 1,
                },
              },
            },
          ],
        },
        then: {
          amount: 1,
          target: "SELF",
          type: "deal-damage",
        },
        type: "conditional",
      },
      id: "16t-1",
      name: "OH DEAR, DEAR, DEAR",
      text: "OH DEAR, DEAR, DEAR At the end of your turn, if this character is exerted and you don't have a Captain character in play, deal 1 damage to this character.",
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
