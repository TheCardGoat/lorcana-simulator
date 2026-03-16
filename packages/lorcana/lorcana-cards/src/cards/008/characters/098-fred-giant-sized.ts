import type { CharacterCard } from "@tcg/lorcana-types";

export const fredGiantsized: CharacterCard = {
  id: "Hxd",
  canonicalId: "ci_Hxd",
  reprints: ["set8-098"],
  cardType: "character",
  name: "Fred",
  version: "Giant-Sized",
  i18n: {
    en: {
      name: "Fred",
      version: "Giant-Sized",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "I LIKE WHERE THIS IS HEADING",
          description:
            "Whenever this character quests, reveal cards from the top of your deck until you reveal a Floodborn character card. Put that card into your hand and shuffle the rest into your deck.",
        },
      ],
    },
    de: {
      name: "Fred",
      version: "Riesengroß",
      text: "Gestaltwandel 5 JETZT WIRD'S TOTAL KRASS Jedes Mal, wenn dieser Charakter erkundet, decke so lange die oberste Karte deines Decks auf, bis du eine Flutgestalt-Charakterkarte aufdeckst. Nimm jene auf deine Hand und mische die restlichen aufgedeckten Karten in dein Deck.",
    },
    fr: {
      name: "Fred",
      version: "Version géante",
      text: "Alter 5 J'ADORE, ÇA S'ANNONCE BIEN Chaque fois que ce personnage est envoyé à l'aventure, révélez des cartes du dessus de votre pioche jusqu'à révéler une carte Personnage Floodborn. Mettez cette carte dans votre main et mélangez les autres cartes révélées dans votre pioche.",
    },
    it: {
      name: "Fred",
      version: "Gigantesco",
      text: "Trasformazione 5 LA COSA SI FA INTERESSANTE Ogni volta che questo personaggio va all'avventura, rivela carte dalla cima del tuo mazzo finché non riveli una carta personaggio Imbevuto. Aggiungi quella carta alla tua mano e rimescola il resto nel tuo mazzo.",
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 98,
  rarity: "rare",
  cost: 7,
  strength: 5,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_c4073b6ba72a428e9e213027b112d48f",
    tcgPlayer: 632710,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "I LIKE WHERE THIS IS HEADING",
      description:
        "Whenever this character quests, reveal cards from the top of your deck until you reveal a Floodborn character card. Put that card into your hand and shuffle the rest into your deck.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1d3-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        intoDeck: "owner",
        target: "CHOSEN_CHARACTER",
        type: "shuffle-into-deck",
      },
      id: "1d3-2",
      name: "I LIKE WHERE THIS IS HEADING",
      text: "I LIKE WHERE THIS IS HEADING Whenever this character quests, reveal cards from the top of your deck until you reveal a Floodborn character card. Put that card into your hand and shuffle the rest into your deck.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
