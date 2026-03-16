import type { ActionCard } from "@tcg/lorcana-types";

export const theIslandsIPulledFromTheSea: ActionCard = {
  id: "O9N",
  canonicalId: "ci_qzk",
  reprints: ["set6-130"],
  cardType: "action",
  name: "The Islands I Pulled from the Sea",
  i18n: {
    en: {
      name: "The Islands I Pulled from the Sea",
      text: "Search your deck for a location card, reveal that card to all players, and put it into your hand. Then, shuffle your deck.",
    },
    de: {
      name: "Diese Inseln zog ich aus dem Meer",
      text: "Durchsuche dein Deck nach einem Ort, zeige diesen allen Mitspielenden und nimm ihn auf deine Hand. Mische danach dein Deck.",
    },
    fr: {
      name: "Poser des îles sur l'océan",
      text: "Cherchez une carte Lieu dans votre pioche, révélez-la à tous les joueurs et placez-la dans votre main. Mélangez votre pioche.",
    },
    it: {
      name: "Maui li Ha Fatti in un Battibaleno",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Cerca nel tuo mazzo una carta luogo, rivela quella carta a tutti i giocatori e aggiungila alla tua mano. Poi rimescola il tuo mazzo.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 130,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_37f652aa15934d2b9bd7ad15eb18bbfb",
    tcgPlayer: 592000,
  },
  text: "Search your deck for a location card, reveal that card to all players, and put it into your hand. Then, shuffle your deck.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        cardType: "location",
        putInto: "hand",
        reveal: true,
        shuffle: true,
        type: "search-deck",
      },
      id: "pm0-1",
      text: "Search your deck for a location card, reveal that card to all players, and put it into your hand. Then, shuffle your deck.",
      type: "action",
    },
  ],
};
