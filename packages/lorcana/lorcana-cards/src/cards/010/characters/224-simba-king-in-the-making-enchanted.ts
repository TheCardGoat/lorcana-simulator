import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaKingInTheMakingEnchanted: CharacterCard = {
  id: "1Ed",
  canonicalId: "ci_IlR",
  reprints: ["set10-020"],
  cardType: "character",
  name: "Simba",
  version: "King in the Making",
  i18n: {
    en: {
      name: "Simba",
      version: "King in the Making",
      text: [
        {
          title: "Boost 3 {I}",
        },
        {
          title: "TIMELY ALLIANCE",
          description:
            "Whenever you put a card under this character, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Auf dem Weg zum König",
      text: "Stärken 3 RECHTZEITIGES BÜNDNIS Jedes Mal, wenn du eine Karte unter diesen Charakter legst, darfst du die oberste Karte deines Decks aufdecken. Falls sie eine Charakterkarte ist, darfst du sie kostenlos und erschöpft ausspielen. Falls nicht, lege sie unter dein Deck.",
    },
    fr: {
      name: "Simba",
      version: "Roi en devenir",
      text: "Boost 3 ALLIANCE OPPORTUNE Chaque fois que vous placez une carte sous ce personnage, vous pouvez révéler la carte du dessus de votre pioche. S'il s'agit d'une carte Personnage, vous pouvez la jouer gratuitement, épuisée. Sinon, placez-la sous votre pioche.",
    },
    it: {
      name: "Simba",
      version: "Futuro Re",
      text: "Potenziamento 3 ALLEANZA TEMPESTIVA Ogni volta che metti una carta sotto a questo personaggio, puoi rivelare la prima carta del tuo mazzo. Se è una carta personaggio, puoi giocare quel personaggio gratis ed entra in gioco impegnato. Altrimenti, mettila in fondo al tuo mazzo.",
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "010",
  cardNumber: 224,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_54bfc0bd37f44871a4ef50193d58ca2c",
    tcgPlayer: 658449,
  },
  text: [
    {
      title: "Boost 3 {I}",
    },
    {
      title: "TIMELY ALLIANCE",
      description:
        "Whenever you put a card under this character, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Whisper"],
  abilities: [
    {
      id: "dbt-1",
      keyword: "Boost",
      text: "Boost 3 {I}",
      type: "keyword",
      value: 3,
    },
    {
      effect: {
        condition: {
          expression: "it's a character card",
          type: "if",
        },
        then: {
          restriction: "enters-play-exerted",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "dbt-2",
      name: "TIMELY ALLIANCE",
      text: "TIMELY ALLIANCE Whenever you put a card under this character, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
