import type { CharacterCard } from "@tcg/lorcana-types";

export const bambiEtherealFawn: CharacterCard = {
  id: "Ab7",
  canonicalId: "ci_Ab7",
  reprints: ["set11-024"],
  cardType: "character",
  name: "Bambi",
  version: "Ethereal Fawn",
  i18n: {
    en: {
      name: "Bambi",
      version: "Ethereal Fawn",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "COME SEE!",
          description:
            "During your turn, whenever this character exerts, reveal a number of cards from the top of your deck equal to the number of cards under him. Put all revealed character cards into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Bambi",
      version: "Ätherisches Kitz",
      text: "Stärken 2 KOMM HER UND SCHAU! Jedes Mal, wenn dieser Charakter in deinem Zug erschöpft wird, decke so viele Karten von deinem Deck auf wie die Anzahl an Karten unter diesem Charakter. Nimm alle aufgedeckten Charakterkarten davon auf deine Hand. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Bambi",
      version: "Faon éthéré",
      text: "Boost 2 VENEZ VOIR! Durant votre tour, chaque fois que ce personnage est épuisé, révélez autant de cartes du dessus de votre pioche qu'il y a de cartes sous lui. Ajoutez à votre main toutes les cartes Personnage ainsi révélées. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Bambi",
      version: "Cerbiatto Etereo",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) VIENI A VEDERE! Durante il tuo turno, ogni volta che questo personaggio viene impegnato, rivela un numero di carte dalla cima del tuo mazzo pari al numero di carte sotto di esso. Aggiungi tutte le carte personaggio rivelate alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Bambi",
  set: "011",
  cardNumber: 24,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_33a165a8153e4ba587d52961bca86f79",
    tcgPlayer: 676190,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "COME SEE!",
      description:
        "During your turn, whenever this character exerts, reveal a number of cards from the top of your deck equal to the number of cards under him. Put all revealed character cards into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Whisper"],
  abilities: [
    {
      id: "1ye-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "1ye-2",
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "put-on-bottom",
      },
      name: "COME SEE!",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "COME SEE! During your turn, whenever this character exerts, reveal a number of cards from the top of your deck equal to the number of cards under him. Put all revealed character cards into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
};
