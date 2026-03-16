import type { CharacterCard } from "@tcg/lorcana-types";

export const pongoDeterminedFatherEnchanted: CharacterCard = {
  id: "0eJ",
  canonicalId: "ci_4Yx",
  reprints: ["set3-019", "set9-002"],
  cardType: "character",
  name: "Pongo",
  version: "Determined Father",
  i18n: {
    en: {
      name: "Pongo",
      version: "Determined Father",
      text: [
        {
          title: "TWILIGHT BARK",
          description:
            "Once during your turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Pongo",
      version: "Entschlossener Vater",
      text: [
        {
          title: "DÄMMERUNGSBELLEN",
          description:
            "Einmal pro Zug, darfst du 2 bezahlen, um die oberste Karte deines Decks aufzudecken. Falls sie eine Charakterkarte ist, nimm sie auf deine Hand. Falls nicht, lege sie unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Pongo",
      version: "Père persévérant",
      text: [
        {
          title: "ABOIEMENT DU SOIR",
          description:
            "Une fois par tour, vous pouvez payer 2 pour révéler la première carte de votre pioche. S'il s'agit d'une carte Personnage, ajoutez-la à votre main. Sinon, remettez-la sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Pongo",
      version: "Padre Determinato",
      text: [
        {
          title: "TELEGRAFO DEL CREPUSCOLO",
          description:
            "Una volta per turno, puoi pagare 2 per rivelare la prima carta del tuo mazzo. Se è una carta personaggio, aggiungila alla tua mano. Altrimenti, mettila in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "009",
  cardNumber: 223,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c233fd3627b24b02bd616aa62bbdc83a",
    tcgPlayer: 651110,
  },
  text: [
    {
      title: "TWILIGHT BARK",
      description:
        "Once during your turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
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
        then: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      id: "1ve-1",
      text: "TWILIGHT BARK Once during your turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.",
      type: "action",
    },
  ],
};
