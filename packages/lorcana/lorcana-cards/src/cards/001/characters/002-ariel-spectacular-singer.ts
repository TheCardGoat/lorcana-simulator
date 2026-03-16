import type { CharacterCard } from "@tcg/lorcana-types";

export const arielSpectacularSinger: CharacterCard = {
  id: "Z4N",
  canonicalId: "ci_Z4N",
  reprints: ["set1-002"],
  cardType: "character",
  name: "Ariel",
  version: "Spectacular Singer",
  i18n: {
    en: {
      name: "Ariel",
      version: "Spectacular Singer",
      text: [
        {
          title: "Singer 5",
        },
        {
          title: "MUSICAL DEBUT",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Spektakuläre Sängerin",
      text: [
        {
          title: "Singen 5",
          description:
            "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.) MUSIKALISCHES DEBÜT Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Liedkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "ARIEL",
      version: "Chanteuse exceptionnelle",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.) DÉBUTS MUSICAUX Lorsque vous jouez ce personnage, regardez les 4 premières cartes de votre pioche. Vous pouvez révéler une carte chanson parmi elles et l'ajouter à votre main. Remettez les autres sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Ariel",
      version: "Spectacular Singer",
      text: [
        {
          title: "Singer 5",
          description:
            "(This character counts as cost 5 to sing songs.) MUSICAL DEBUT When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 2,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_be92bba983424f2f9546f237e65ce357",
    tcgPlayer: 504451,
  },
  text: [
    {
      title: "Singer 5",
    },
    {
      title: "MUSICAL DEBUT",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1k6-1",
      keyword: "Singer",
      text: "Singer 5",
      type: "keyword",
      value: 5,
    },
    {
      effect: {
        amount: 4,
        destinations: [
          {
            filter: {
              type: "song",
            },
            max: 1,
            min: 0,
            reveal: true,
            zone: "hand",
          },
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-bottom",
          },
        ],
        type: "scry",
      },
      id: "1k6-2",
      name: "MUSICAL DEBUT",
      text: "MUSICAL DEBUT When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
