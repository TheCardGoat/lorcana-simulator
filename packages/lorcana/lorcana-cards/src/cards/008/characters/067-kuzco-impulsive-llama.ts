import type { CharacterCard } from "@tcg/lorcana-types";

export const kuzcoImpulsiveLlama: CharacterCard = {
  id: "uQg",
  canonicalId: "ci_7bS",
  reprints: ["set8-067"],
  cardType: "character",
  name: "Kuzco",
  version: "Impulsive Llama",
  i18n: {
    en: {
      name: "Kuzco",
      version: "Impulsive Llama",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "WHAT DOES THIS DO?",
          description:
            "When you play this character, each opponent chooses one of their characters and puts that card on the bottom of their deck. Then, each opponent may draw a card.",
        },
      ],
    },
    de: {
      name: "Kusco",
      version: "Impulsives Lama",
      text: "Gestaltwandel 4 WAS MACHT DER HIER? Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je einen ihrer Charaktere und legen ihn unter ihr Deck. Dann dürfen alle gegnerischen Mitspielenden je 1 Karte ziehen.",
    },
    fr: {
      name: "Kuzco",
      version: "Lama impétueux",
      text: "Alter 4 QU'EST-CE QUE ÇA FAIT? Lorsque vous jouez ce personnage, chaque adversaire choisit l'un de ses personnages et le place sous sa pioche. Ensuite, chaque adversaire peut piocher une carte.",
    },
    it: {
      name: "Kuzco",
      version: "Lama Impulsivo",
      text: "Trasformazione 4 COSA FA QUESTA? Quando giochi questo personaggio, ogni avversario sceglie uno dei suoi personaggi e mette quella carta in fondo al suo mazzo. Poi, ogni avversario può pescare una carta.",
    },
  },
  inkType: ["amethyst", "emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 67,
  rarity: "rare",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7f8ab8154a444fb69a3eed9c7647b623",
    tcgPlayer: 632245,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "WHAT DOES THIS DO?",
      description:
        "When you play this character, each opponent chooses one of their characters and puts that card on the bottom of their deck. Then, each opponent may draw a card.",
    },
  ],
  classifications: ["Floodborn", "King"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1p1-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 1,
            target: "EACH_OPPONENT",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "1p1-2",
      name: "WHAT DOES THIS DO?",
      text: "WHAT DOES THIS DO? When you play this character, each opponent chooses one of their characters and puts that card on the bottom of their deck. Then, each opponent may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
