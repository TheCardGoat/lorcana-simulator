import type { ItemCard } from "@tcg/lorcana-types";

export const televisionSet: ItemCard = {
  id: "I9h",
  canonicalId: "ci_I9h",
  reprints: ["set8-178"],
  cardType: "item",
  name: "Television Set",
  i18n: {
    en: {
      name: "Television Set",
      text: [
        {
          title: "IS IT ON YET?",
          description:
            "{E}, 1 {I} — Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Fernseher",
      text: [
        {
          title: "LÄUFT SIE SCHON?,",
          description:
            "1 — Schaue dir die oberste Karte deines Decks an. Falls sie eine Welpen-Charakterkarte ist, darfst du sie aufdecken und auf deine Hand nehmen. Falls nicht, lege sie unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Poste de télévision",
      text: [
        {
          title: "ÇA A COMMENCÉ?,",
          description:
            "1 — Regardez la carte du dessus de votre pioche. S'il s'agit d'une carte Personnage Chiot, vous pouvez la révéler et la prendre en main. Sinon, placez-la sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Televisore",
      text: [
        {
          title: "È GIÀ INIZIATO?,",
          description:
            "1 — Guarda la prima carta del tuo mazzo. Se è una carta personaggio Cucciolo, puoi rivelarla e aggiungerla alla tua mano. Altrimenti, mettila in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 178,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_133af5231e8e4e3798381e8a03b4ae09",
    tcgPlayer: 631686,
  },
  text: [
    {
      title: "IS IT ON YET?",
      description:
        "{E}, 1 {I} — Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "revealed-first",
                cardType: "character",
                filters: [
                  {
                    type: "has-classification",
                    classification: "Puppy",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "optional",
              chooser: "CONTROLLER",
              effect: {
                type: "put-in-hand",
                source: "revealed",
                target: "CONTROLLER",
              },
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
        ],
      },
      id: "pbp-1",
      name: "IS IT ON YET?",
      text: "IS IT ON YET? {E}, 1 {I} —  Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.",
      type: "activated",
    },
  ],
};
