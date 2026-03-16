import type { CharacterCard } from "@tcg/lorcana-types";

export const fairyGodmotherMagicalBenefactor: CharacterCard = {
  id: "NZ3",
  canonicalId: "ci_NZ3",
  reprints: ["set10-192"],
  cardType: "character",
  name: "Fairy Godmother",
  version: "Magical Benefactor",
  i18n: {
    en: {
      name: "Fairy Godmother",
      version: "Magical Benefactor",
      text: [
        {
          title: "Boost 3 {I}",
        },
        {
          title: "STUNNING TRANSFORMATION",
          description:
            "Whenever you put a card under this character, you may banish chosen opposing character. If you do, their player may reveal the top card of their deck. If that card is a character or item card, they may play it for free. Otherwise, they put it on the bottom of their deck.",
        },
      ],
    },
    de: {
      name: "Gute Fee",
      version: "Magische Wohltäterin",
      text: "Stärken 3 BEEINDRUCKENDE VERWANDLUNG Jedes Mal, wenn du eine Karte unter diesen Charakter legst, darfst du einen gegnerischen Charakter deiner Wahl verbannen. Wenn du dies tust, darf die Person, die den Charakter im Spiel hatte, die oberste Karte ihres Decks aufdecken. Falls sie eine Charakterkarte oder eine Gegenstandskarte ist, darf sie kostenlos ausgespielt werden. Falls nicht, legt die Person sie unter ihr Deck.",
    },
    fr: {
      name: "La Bonne Fée",
      version: "Bienfaitrice magique",
      text: "Boost 3 TRANSFORMATION Chaque fois que vous placez une carte sous ce personnage, vous pouvez choisir un personnage adverse et le bannir. Si vous le faites, son propriétaire peut révéler la carte du dessus de sa pioche. S'il s'agit d'une carte Personnage ou Objet, il peut la jouer gratuitement. Sinon, il la replace sous sa pioche.",
    },
    it: {
      name: "Fata Smemorina",
      version: "Benefattrice Magica",
      text: [
        {
          title: "Potenziamento 3",
          description:
            "(Una volta durante il tuo turno, puoi pagare 3 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) TRASFORMAZIONE SBALORDITIVA Ogni volta che metti una carta sotto a questo personaggio, puoi esiliare un personaggio avversario a tua scelta. Se lo fai, il suo giocatore può rivelare la prima carta del suo mazzo. Se quella carta è una carta personaggio o oggetto, può giocarla gratis. Altrimenti, la mette in fondo al suo mazzo.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Cinderella",
  set: "010",
  cardNumber: 192,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_96d8b0484c8441f0a214eee856f60f35",
    tcgPlayer: 659414,
  },
  text: [
    {
      title: "Boost 3 {I}",
    },
    {
      title: "STUNNING TRANSFORMATION",
      description:
        "Whenever you put a card under this character, you may banish chosen opposing character. If you do, their player may reveal the top card of their deck. If that card is a character or item card, they may play it for free. Otherwise, they put it on the bottom of their deck.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy", "Sorcerer", "Whisper"],
  abilities: [
    {
      id: "45t-1",
      keyword: "Boost",
      type: "keyword",
      value: 3,
      text: "Boost 3 {I}",
    },
    {
      id: "45t-2",
      type: "triggered",
      trigger: {
        event: "ink",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        effect: {
          steps: [
            {
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "opponent",
                selector: "chosen",
                zones: ["play"],
              },
              type: "banish",
            },
            {
              condition: {
                type: "if-you-do",
              },
              then: {
                type: "look-at-cards",
                amount: 1,
                source: "deck",
                target: "OPPONENT",
              },
              type: "conditional",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      text: "STUNNING TRANSFORMATION Whenever you put a card under this character, you may banish chosen opposing character. If you do, their player may reveal the top card of their deck. If that card is a character or item card, they may play it for free. Otherwise, they put it on the bottom of their deck.",
      name: "STUNNING TRANSFORMATION",
    },
  ],
};
