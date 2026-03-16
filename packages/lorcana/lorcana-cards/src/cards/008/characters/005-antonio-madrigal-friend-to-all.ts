import type { CharacterCard } from "@tcg/lorcana-types";

export const antonioMadrigalFriendToAll: CharacterCard = {
  id: "07V",
  canonicalId: "ci_07V",
  reprints: ["set8-005"],
  cardType: "character",
  name: "Antonio Madrigal",
  version: "Friend to All",
  i18n: {
    en: {
      name: "Antonio Madrigal",
      version: "Friend to All",
      text: [
        {
          title: "OF COURSE THEY CAN COME",
          description:
            "Once during your turn, whenever one of your characters sings a song, you may search your deck for a character card with cost 3 or less and reveal that card to all players. Put that card into your hand and shuffle your deck.",
        },
      ],
    },
    de: {
      name: "Antonio Madrigal",
      version: "Freund von allen",
      text: [
        {
          title: "NATÜRLICH KÖNNEN SIE AUCH KOMMEN",
          description:
            "Einmal während deines Zuges, wenn einer deiner Charaktere ein Lied singt, darfst du dein Deck nach einer Charakterkarte durchsuchen, die 3 oder weniger kostet, und diese allen Mitspielenden zeigen. Nimm die Karte auf deine Hand und mische danach dein Deck.",
        },
      ],
    },
    fr: {
      name: "Antonio Madrigal",
      version: "Ami de tous",
      text: [
        {
          title: "BIEN SÛR QU'ILS PEUVENT VENIR",
          description:
            "Une fois durant votre tour, lorsque l'un de vos personnages chante une chanson, vous pouvez chercher dans votre pioche une carte Personnage coûtant 3 ou moins et la révéler à tous les joueurs. Placez la carte révélée dans votre main puis mélangez votre pioche.",
        },
      ],
    },
    it: {
      name: "Antonio Madrigal",
      version: "Amico di Tutti",
      text: [
        {
          title: "CERTO CHE POSSONO VENIRE",
          description:
            "Una volta durante il tuo turno, ogni volta che uno dei tuoi personaggi canta una canzone, puoi cercare una carta personaggio con costo 3 o inferiore nel tuo mazzo e rivelare quella carta a tutti i giocatori. Aggiungi quella carta alla tua mano e rimescola il tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 5,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2564aee724494e5f99b9688aad48753f",
    tcgPlayer: 631703,
  },
  text: [
    {
      title: "OF COURSE THEY CAN COME",
      description:
        "Once during your turn, whenever one of your characters sings a song, you may search your deck for a character card with cost 3 or less and reveal that card to all players. Put that card into your hand and shuffle your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          putInto: "hand",
          shuffle: true,
          type: "search-deck",
        },
        type: "optional",
      },
      id: "v9i-1",
      name: "OF COURSE THEY CAN COME Once",
      text: "OF COURSE THEY CAN COME Once during your turn, whenever one of your characters sings a song, you may search your deck for a character card with cost 3 or less and reveal that card to all players. Put that card into your hand and shuffle your deck.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
