import type { CharacterCard } from "@tcg/lorcana-types";

export const mufasaBetrayedLeader: CharacterCard = {
  id: "dcy",
  canonicalId: "ci_dcy",
  reprints: ["set2-014"],
  cardType: "character",
  name: "Mufasa",
  version: "Betrayed Leader",
  i18n: {
    en: {
      name: "Mufasa",
      version: "Betrayed Leader",
      text: [
        {
          title: "THE SUN WILL SET",
          description:
            "When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Mufasa",
      version: "Verratener Anführer",
      text: [
        {
          title: "EINES TAGES GEHT DIE SONNE UNTER",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du die oberste Karte deines Decks aufdecken. Falls sie eine Charakterkarte ist, darfst du sie kostenlos und erschöpft ausspielen. Falls nicht, lege sie zurück auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Mufasa",
      version: "Roi trahi",
      text: [
        {
          title: "LE SOLEIL ÉTEINDRA SUR MOI SA LUMIÈRE",
          description:
            "Lorsque ce personnage est banni, vous pouvez révéler la première carte de votre pioche. S'il s'agit d'un personnage, vous pouvez le jouer gratuitement. Il entre en jeu épuisé. Sinon, remettez-la sur le dessus de votre pioche.",
        },
      ],
    },
    it: {
      name: "Mufasa",
      version: "Betrayed Leader",
      text: [
        {
          title: "THE SUN WILL SET",
          description:
            "When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "002",
  cardNumber: 14,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_00dc125290b34527b59cec4901ec94f9",
    tcgPlayer: 527263,
  },
  text: [
    {
      title: "THE SUN WILL SET",
      description:
        "When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Storyborn", "King", "Mentor"],
  abilities: [
    {
      effect: {
        steps: [
          {
            target: "CONTROLLER",
            type: "reveal-top-card",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "revealed-first",
                filters: [
                  {
                    type: "card-type",
                    value: "character",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            // eslint-disable-next-line unicorn/no-thenable
            then: {
              effect: {
                cost: "free",
                from: "revealed",
                entersExerted: true,
                target: "CONTROLLER",
                type: "play-card",
              },
              type: "optional",
            },
            else: {
              source: "revealed",
              type: "put-on-top",
            },
          },
        ],
        type: "sequence",
      },
      id: "6k5-1",
      name: "THE SUN WILL SET",
      text: "THE SUN WILL SET When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
