import type { ItemCard } from "@tcg/lorcana-types";

export const theGlassSlipperEnchanted: ItemCard = {
  id: "DD1",
  canonicalId: "ci_GJb",
  reprints: ["set7-044"],
  cardType: "item",
  name: "The Glass Slipper",
  i18n: {
    en: {
      name: "The Glass Slipper",
      text: [
        {
          title: "PERFECT PAIR",
          description: "You may only have 2 copies of The Glass Slipper in your deck.",
        },
        {
          title: "SEARCH THE KINGDOM",
          description:
            "Banish this item, {E} one of your Prince characters — Search your deck for a Princess character card and reveal it to all players. Put that card into your hand and shuffle your deck.",
        },
      ],
    },
    de: {
      name: "Der gläserne Schuh",
      text: [
        {
          title: "PERFEKTES PAAR",
          description: "Dein Deck darf nur 2 Der-gläserne-Schuh-Karten enthalten.",
        },
        {
          title: "DURCHSUCHE DAS",
          description:
            "KÖNIGREICH Verbanne diesen Gegenstand, einen deiner Prinzen — Durchsuche dein Deck nach einer Prinzessinnen-Charakterkarte und zeige diese allen Mitspielenden. Nimm die Karte auf deine Hand und mische danach dein Deck.",
        },
      ],
    },
    fr: {
      name: "La Pantoufle de verre",
      text: [
        {
          title: "LA PAIRE PARFAITE",
          description:
            "Vous ne pouvez avoir au maximum que 2 exemplaires de La Pantoufle de Verre dans votre deck.",
        },
        {
          title: "CHERCHER DANS TOUT LE ROYAUME",
          description:
            "Bannissez cet objet, l'un de vos personnages Prince — Cherchez une carte Personnage Princesse dans votre deck et révélez-la à tous les joueurs. Placez la carte révélée dans votre main et mélangez votre pioche.",
        },
      ],
    },
    it: {
      name: "La Scarpetta di Cristallo",
      text: [
        {
          title: "PAIO PERFETTO",
          description: "Puoi avere solo 2 copie de La Scarpetta di Cristallo nel tuo mazzo.",
        },
        {
          title: "CERCATE IN TUTTO IL REGNO",
          description:
            "Esilia questo oggetto, uno dei tuoi personaggi Principe — Cerca una carta personaggio Principessa nel tuo mazzo e rivelala a tutti i giocatori. Aggiungi quella carta alla tua mano e rimescola il tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "007",
  cardNumber: 208,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_aa7db27471b142cfa97cd5ca3409669d",
    tcgPlayer: 619736,
  },
  missingImplementation: true,
  text: [
    {
      title: "PERFECT PAIR",
      description: "You may only have 2 copies of The Glass Slipper in your deck.",
    },
    {
      title: "SEARCH THE KINGDOM",
      description:
        "Banish this item, {E} one of your Prince characters — Search your deck for a Princess character card and reveal it to all players. Put that card into your hand and shuffle your deck.",
    },
  ],
  abilities: [
    {
      id: "j91-1",
      name: "SEARCH THE KINGDOM",
      type: "activated",
      cost: {
        banishSelf: true,
        exertCharacters: 1,
      },
      effect: {
        type: "search-deck",
        cardType: "character",
        classification: "Princess",
        putInto: "hand",
        reveal: true,
        shuffle: true,
      },
      text: "SEARCH THE KINGDOM Banish this item, {E} one of your Prince characters — Search your deck for a Princess character card and reveal it to all players. Put that card into your hand and shuffle your deck.",
    },
  ],
};
