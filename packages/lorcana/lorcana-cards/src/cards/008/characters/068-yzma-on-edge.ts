import type { CharacterCard } from "@tcg/lorcana-types";

export const yzmaOnEdge: CharacterCard = {
  id: "GYU",
  canonicalId: "ci_GYU",
  reprints: ["set8-068"],
  cardType: "character",
  name: "Yzma",
  version: "On Edge",
  i18n: {
    en: {
      name: "Yzma",
      version: "On Edge",
      text: [
        {
          title: "WHY DO WE EVEN HAVE THAT LEVER?",
          description:
            "When you play this character, if you have a card named Pull the Lever! in your discard, you may search your deck for a card named Wrong Lever! and reveal that card to all players. Put that card into your hand and shuffle your deck.",
        },
      ],
    },
    de: {
      name: "Isma",
      version: "Am Rande",
      text: [
        {
          title: "WARUM HABEN WIR DIESEN HEBEL ÜBERHAUPT?",
          description:
            "Wenn du diesen Charakter ausspielst und wenn du eine Zieh-den-Hebel!-Karte in deinem Ablagestapel hast, darfst du dein Deck nach einer Das-war-der-Falsche!-Karte durchsuchen und diese allen Mitspielenden zeigen. Nimm die Karte auf deine Hand und mische danach dein Deck.",
        },
      ],
    },
    fr: {
      name: "Yzma",
      version: "Au bord du gouffre",
      text: [
        {
          title: "MAIS POURQUOI EST-CE QU'ON A CRÉÉ CE LEVIER?",
          description:
            "Lorsque vous jouez ce personnage, si vous avez une carte nommée Abaisse le levier! dans votre défausse, vous pouvez chercher dans votre pioche une carte nommée Pas ce levier-là! et révéler cette carte à tous les joueurs. Placez la carte révélée dans votre main puis mélangez votre pioche.",
        },
      ],
    },
    it: {
      name: "Yzma",
      version: "Nervosa",
      text: [
        {
          title: "MA PERCHÉ DOBBIAMO AVERE DUE LEVE?",
          description:
            "Quando giochi questo personaggio, se hai una carta chiamata Abbassa la Leva! nei tuoi scarti, puoi cercare nel tuo mazzo una carta chiamata L'Altra Leva! e rivelare quella carta a tutti i giocatori. Aggiungi quella carta alla tua mano e rimescola il tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst", "emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 68,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_b19fb19a289f4cf5a223278de7b2b2e0",
    tcgPlayer: 631681,
  },
  text: [
    {
      title: "WHY DO WE EVEN HAVE THAT LEVER?",
      description:
        "When you play this character, if you have a card named Pull the Lever! in your discard, you may search your deck for a card named Wrong Lever! and reveal that card to all players. Put that card into your hand and shuffle your deck.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "594-1",
      text: "WHY DO WE EVEN HAVE THAT LEVER? When you play this character, if you have a card named Pull the Lever! in your discard, you may search your deck for a card named Wrong Lever! and reveal that card to all players. Put that card into your hand and shuffle your deck.",
      name: "WHY DO WE EVEN HAVE THAT LEVER?",
      condition: {
        cardName: "Pull the Lever!",
        controller: "you",
        hasCards: true,
        type: "zone",
        zone: "discard",
      },
      effect: {
        effect: {
          cardName: "Wrong Lever!",
          putInto: "hand",
          reveal: true,
          shuffle: true,
          type: "search-deck",
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
