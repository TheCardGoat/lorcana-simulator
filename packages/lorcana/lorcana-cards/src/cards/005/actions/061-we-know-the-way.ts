import type { ActionCard } from "@tcg/lorcana-types";

export const weKnowTheWay: ActionCard = {
  id: "2Wp",
  canonicalId: "ci_2Wp",
  reprints: ["set5-061"],
  cardType: "action",
  name: "We Know the Way",
  i18n: {
    en: {
      name: "We Know the Way",
      text: "Shuffle chosen card from your discard into your deck. Reveal the top card of your deck. If it has the same name as the chosen card, you may play the revealed card for free. Otherwise, put it into your hand.",
    },
    de: {
      name: "Wir kennen den Weg",
      text: "Mische eine Karte deiner Wahl aus deinem Ablagestapel zurück in dein Deck. Decke die oberste Karte deines Decks auf. Falls sie den selben Namen hat, wie die gewählte Karte, darfst du sie kostenlos ausspielen. Falls nicht, nimm sie auf deine Hand.",
    },
    fr: {
      name: "L'explorateur",
      text: "Choisissez une carte de votre défausse et mélangez-la dans votre pioche. Révélez la carte du dessus de votre pioche. Si la carte révélée a le même nom que la carte choisie, vous pouvez la jouer gratuitement. Sinon, ajoutez-la à votre main.",
    },
    it: {
      name: "La Strada di Casa",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Rimescola nel tuo mazzo una carta a tua scelta dai tuoi scarti. Rivela la prima carta del tuo mazzo. Se ha lo stesso nome della carta scelta, puoi giocare la carta rivelata gratis. Altrimenti, aggiungila alla tua mano.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "005",
  cardNumber: 61,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_74fab45eaa32470b9ca3c830ab920f93",
    tcgPlayer: 560658,
  },
  text: "Shuffle chosen card from your discard into your deck. Reveal the top card of your deck. If it has the same name as the chosen card, you may play the revealed card for free. Otherwise, put it into your hand.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["discard"],
            },
            type: "shuffle-into-deck",
          },
          {
            target: "CONTROLLER",
            type: "reveal-top-card",
          },
          {
            condition: {
              type: "revealed-matches-chosen-name",
            },
            else: {
              type: "put-in-hand",
              source: "revealed",
              target: "CONTROLLER",
            },
            then: {
              type: "optional",
              effect: {
                type: "play-card",
                from: "revealed",
                cost: "free",
                target: "CONTROLLER",
              },
            },
            type: "conditional",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
