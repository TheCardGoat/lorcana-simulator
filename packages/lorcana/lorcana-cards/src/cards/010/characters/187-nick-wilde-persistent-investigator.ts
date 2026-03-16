import type { CharacterCard } from "@tcg/lorcana-types";

export const nickWildePersistentInvestigator: CharacterCard = {
  id: "DbJ",
  canonicalId: "ci_YpV",
  reprints: ["set10-187"],
  cardType: "character",
  name: "Nick Wilde",
  version: "Persistent Investigator",
  i18n: {
    en: {
      name: "Nick Wilde",
      version: "Persistent Investigator",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "CASE CLOSED",
          description:
            "During your turn, whenever one of your Detective characters banishes another character in a challenge, draw a card.",
        },
      ],
    },
    de: {
      name: "Nick Wilde",
      version: "Hartnäckiger Ermittler",
      text: "Gestaltwandel 3 FALL ABGESCHLOSSEN Jedes Mal während deines Zuges, wenn einer deiner Detektive durch eine Herausforderung einen anderen Charakter verbannt, ziehe 1 Karte.",
    },
    fr: {
      name: "Nick Wilde",
      version: "Investigateur tenace",
      text: "Alter 3 AFFAIRE CLASSÉE Durant votre tour, chaque fois que l'un de vos personnages Détective bannit un autre personnage via un défi, piochez une carte.",
    },
    it: {
      name: "Nick Wilde",
      version: "Investigatore Ostinato",
      text: "Trasformazione 3 CASO RISOLTO Durante il tuo turno, ogni volta che uno dei tuoi personaggi Detective esilia un altro personaggio in una sfida, pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 187,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_8a558015ad0948f5be96f85dc60b3c76",
    tcgPlayer: 660030,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "CASE CLOSED",
      description:
        "During your turn, whenever one of your Detective characters banishes another character in a challenge, draw a card.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Detective"],
  abilities: [
    {
      id: "17t-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "17t-2",
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "CASE CLOSED",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "CASE CLOSED During your turn, whenever one of your Detective characters banishes another character in a challenge, draw a card.",
    },
  ],
};
