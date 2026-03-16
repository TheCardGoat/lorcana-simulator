import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseDrumMajor: CharacterCard = {
  id: "p71",
  canonicalId: "ci_p71",
  reprints: ["set5-015"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Drum Major",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Drum Major",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "PARADE ORDER",
          description:
            "When you play this character, if you used Shift to play her, you may search your deck for a character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Tambourmajorin",
      text: "Gestaltwandel 4 REIHENFOLGE DER PARADE Falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, darfst du dein Deck nach einer Charakterkarte durchsuchen und diese allen Mitspielenden zeigen. Mische danach dein Deck und lege die gewählte Karte als oberste Karte auf dein Deck.",
    },
    fr: {
      name: "Minnie",
      version: "Tambour-major",
      text: "Alter 4 CHEFFE DE LA FANFARE Si vous jouez ce personnage en utilisant sa capacité Alter, vous pouvez chercher une carte Personnage dans votre pioche et la révéler à tous les joueurs. Mélangez votre pioche puis placez la carte révélée sur le dessus.",
    },
    it: {
      name: "Minni",
      version: "Capobanda",
      text: "Trasformazione 4 ORDINE DI MARCIA Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, puoi cercare una carta personaggio nel tuo mazzo e rivelare quella carta a tutti i giocatori. Rimescola il tuo mazzo e metti quella carta in cima ad esso.",
    },
  },
  inkType: ["amber"],
  set: "005",
  cardNumber: 15,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9b72fe4e823b447fbdd927b3dae1342a",
    tcgPlayer: 561600,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "PARADE ORDER",
      description:
        "When you play this character, if you used Shift to play her, you may search your deck for a character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "o0p-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you used Shift to play her",
          type: "if",
        },
        then: {
          cardType: "character",
          putInto: "hand",
          shuffle: true,
          type: "search-deck",
        },
        type: "conditional",
      },
      id: "o0p-2",
      name: "PARADE ORDER",
      text: "PARADE ORDER When you play this character, if you used Shift to play her, you may search your deck for a character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
