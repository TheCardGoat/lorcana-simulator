import type { CharacterCard } from "@tcg/lorcana-types";

export const almaMadrigalFamilyMatriarch: CharacterCard = {
  id: "AOO",
  canonicalId: "ci_AOO",
  reprints: ["set4-002"],
  cardType: "character",
  name: "Alma Madrigal",
  version: "Family Matriarch",
  i18n: {
    en: {
      name: "Alma Madrigal",
      version: "Family Matriarch",
      text: [
        {
          title: "TO THE TABLE",
          description:
            "When you play this character, you may search your deck for a Madrigal character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
        },
      ],
    },
    de: {
      name: "Alma Madrigal",
      version: "Familienoberhaupt",
      text: [
        {
          title: "SETZT EUCH BITTE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du dein Deck nach einem Madrigal durchsuchen und diesen allen Mitspielenden zeigen. Mische danach dein Deck und lege die gewählte Karte als oberste Karte auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Alma Madrigal",
      version: "Matriarche de la famille",
      text: [
        {
          title: "À TABLE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez chercher un personnage Madrigal dans votre deck. Si vous le faites, révélez-le, mélangez votre deck puis placez ce personnage au-dessus de votre deck.",
        },
      ],
    },
    it: {
      name: "Alma Madrigal",
      version: "Matriarca della Famiglia",
      text: [
        {
          title: "TUTTI A TAVOLA",
          description:
            "Quando giochi questo personaggio, puoi cercare un personaggio Madrigal nel tuo mazzo e rivelare quella carta a tutti i giocatori. Rimescola il tuo mazzo e metti quella carta in cima ad esso.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 2,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a853bb92fbe7486ea510a97f6a8494e2",
    tcgPlayer: 550553,
  },
  text: [
    {
      title: "TO THE TABLE",
      description:
        "When you play this character, you may search your deck for a Madrigal character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          putInto: "hand",
          shuffle: true,
          type: "search-deck",
        },
        type: "optional",
      },
      id: "6uc-1",
      name: "TO THE TABLE",
      text: "TO THE TABLE When you play this character, you may search your deck for a Madrigal character card and reveal that card to all players. Shuffle your deck and put that card on top of it.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
