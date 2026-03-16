import type { CharacterCard } from "@tcg/lorcana-types";

export const genieWonderfulTrickster: CharacterCard = {
  id: "o38",
  canonicalId: "ci_o38",
  reprints: ["set6-061"],
  cardType: "character",
  name: "Genie",
  version: "Wonderful Trickster",
  i18n: {
    en: {
      name: "Genie",
      version: "Wonderful Trickster",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "YOUR REWARD AWAITS",
          description: "Whenever you play a card, draw a card.",
        },
        {
          title: "FORBIDDEN TREASURE",
          description:
            "At the end of your turn, put all the cards in your hand on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Wunderbarer Zauberkünstler",
      text: "Gestaltwandel 5 DEINE BELOHNUNG WARTET Jedes Mal, wenn du eine Karte ausspielst, ziehe 1 Karte. VERBOTENER SCHATZ Am Ende deines Zuges, lege alle Karten aus deiner Hand in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Génie",
      version: "Farceur merveilleux",
      text: "Alter 5 TA RÉCOMPENSE T'ATTEND Chaque fois que vous jouez une carte, piochez une carte. TRÉSOR INTERDIT À la fin de votre tour, placez toutes les cartes de votre main sous votre pioche dans l'ordre de votre choix.",
    },
    it: {
      name: "Genio",
      version: "Incredibile Prestigiatore",
      text: "Trasformazione 5 IL TUO PREMIO TI ATTENDE Ogni volta che giochi una carta, pesca una carta. TESORO PROIBITO Alla fine del tuo turno, metti tutte le carte nella tua mano in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 61,
  rarity: "legendary",
  cost: 7,
  strength: 4,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5cbbabaf0d9f4ad58c942174904a1d8f",
    tcgPlayer: 588084,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "YOUR REWARD AWAITS",
      description: "Whenever you play a card, draw a card.",
    },
    {
      title: "FORBIDDEN TREASURE",
      description:
        "At the end of your turn, put all the cards in your hand on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1yx-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "1yx-2",
      name: "YOUR REWARD AWAITS",
      text: "YOUR REWARD AWAITS Whenever you play a card, draw a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "card",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        target: {
          cardTypes: ["card"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "put-on-bottom",
      },
      id: "1yx-3",
      text: "FORBIDDEN TREASURE At the end of your turn, put all the cards in your hand on the bottom of your deck in any order.",
      type: "action",
    },
  ],
};
