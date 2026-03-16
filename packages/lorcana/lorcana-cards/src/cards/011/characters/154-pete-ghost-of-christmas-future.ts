import type { CharacterCard } from "@tcg/lorcana-types";

export const peteGhostOfChristmasFuture: CharacterCard = {
  id: "0RS",
  canonicalId: "ci_0RS",
  reprints: ["set11-154"],
  cardType: "character",
  name: "Pete",
  version: "Ghost of Christmas Future",
  i18n: {
    en: {
      name: "Pete",
      version: "Ghost of Christmas Future",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "FOREBODING GLANCE",
          description:
            "Whenever this character quests, look at a number of cards from the top of your deck equal to the number of cards under him. Put one into your hand and put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Geist der künftigen Weihnacht",
      text: "Stärken 1 BLICK IN DIE ZUKUNFT Jedes Mal, wenn dieser Charakter erkundet, schaue dir so viele Karten oben von deinem Deck an wie die Anzahl an Karten unter diesem Charakter. Nimm 1 davon auf deine Hand und lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Pat",
      version: "Fantôme du Noël futur",
      text: "Boost 1 REGARD MENAÇANT Chaque fois que ce personnage est envoyé à l'aventure, regardez autant de cartes du dessus de votre pioche qu'il y a de cartes sous lui. Ajoutez-en une à votre main et placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Gambadilegno",
      version: "Fantasma del Natale Futuro",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) SGUARDO PREMONITORE Ogni volta che questo personaggio va all'avventura, guarda un numero di carte dalla cima del tuo mazzo pari al numero di carte sotto a questo personaggio. Aggiungine una alla tua mano e metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 154,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cc4685ee359648a9b100d7a20c00ee5f",
    tcgPlayer: 672431,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "FOREBODING GLANCE",
      description:
        "Whenever this character quests, look at a number of cards from the top of your deck equal to the number of cards under him. Put one into your hand and put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Ghost"],
  abilities: [
    {
      id: "12x-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "12x-2",
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "put-on-bottom",
      },
      name: "FOREBODING GLANCE",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "FOREBODING GLANCE Whenever this character quests, look at a number of cards from the top of your deck equal to the number of cards under him. Put one into your hand and put the rest on the bottom of your deck in any order.",
    },
  ],
};
