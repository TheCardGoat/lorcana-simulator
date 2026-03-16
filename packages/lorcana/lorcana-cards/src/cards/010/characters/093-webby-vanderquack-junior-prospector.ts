import type { CharacterCard } from "@tcg/lorcana-types";

export const webbyVanderquackJuniorProspector: CharacterCard = {
  id: "s7q",
  canonicalId: "ci_N9X",
  reprints: ["set10-093"],
  cardType: "character",
  name: "Webby Vanderquack",
  version: "Junior Prospector",
  i18n: {
    en: {
      name: "Webby Vanderquack",
      version: "Junior Prospector",
      text: [
        {
          title: "Shift 2 {I}",
        },
        {
          title: "Ward",
        },
        {
          title: "WORK SMARTER",
          description:
            "Whenever this character quests, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Nicky Vanderquack",
      version: "Junior-Schürferin",
      text: "Gestaltwandel 2 Behütet SCHLAUER ARBEITEN Jedes Mal, wenn dieser Charakter erkundet, falls mindestens eine gegnerische Person mehr Karten in ihrem Tintenvorrat hat als du, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
    },
    fr: {
      name: "Zaza",
      version: "Prospectrice junior",
      text: "Alter 2 Hors d'atteinte TRAVAIL MALIN Chaque fois que ce personnage est envoyé à l'aventure, si un adversaire a plus de cartes dans sa réserve d'encre que vous, vous pouvez placer la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Gaia Vanderquack",
      version: "Apprendista Cercatrice",
      text: "Trasformazione 2, Protetto LAVORARE MEGLIO Ogni volta che questo personaggio va all'avventura, se un avversario ha più carte nel suo calamaio di te, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 93,
  rarity: "legendary",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c607f55525894e1bbdb8121eed6bf886",
    tcgPlayer: 660173,
  },
  text: [
    {
      title: "Shift 2 {I}",
    },
    {
      title: "Ward",
    },
    {
      title: "WORK SMARTER",
      description:
        "Whenever this character quests, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "y1i-1",
      keyword: "Shift",
      text: "Shift 2 {I}",
      type: "keyword",
    },
    {
      id: "y1i-2",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "an opponent has more cards in their inkwell than you",
          type: "if",
        },
        then: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "y1i-3",
      name: "WORK SMARTER",
      text: "WORK SMARTER Whenever this character quests, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
