import type { CharacterCard } from "@tcg/lorcana-types";

export const hiroHamadaRoboticsProdigy: CharacterCard = {
  id: "YrC",
  canonicalId: "ci_YrC",
  reprints: ["set6-145"],
  cardType: "character",
  name: "Hiro Hamada",
  version: "Robotics Prodigy",
  i18n: {
    en: {
      name: "Hiro Hamada",
      version: "Robotics Prodigy",
      text: [
        {
          title: "SWEET TECH",
          description:
            "{2} {E} — Search your deck for an item card or a Robot character card and reveal it to all players. Shuffle your deck and put that card on top of it.",
        },
      ],
    },
    de: {
      name: "Hiro Hamada",
      version: "Wunderkind der Robotik",
      text: [
        {
          title: "COOLE ERFINDUNGEN, 2",
          description:
            "— Durchsuche dein Deck nach einer Gegenstandskarte oder einer Roboter-Charakterkarte und zeige diese allen Mitspielenden. Mische danach dein Deck und lege die gewählte Karte als oberste Karte auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Hiro Hamada",
      version: "Prodige de la robotique",
      text: [
        {
          title: "À LA POINTE DE LA TECHNOLOGIE,",
          description:
            "2 — Cherchez un personnage Robot ou un objet dans votre pioche et révélez cette carte à tous les joueurs. Mélangez votre pioche et placez cette carte au-dessus.",
        },
      ],
    },
    it: {
      name: "Hiro Hamada",
      version: "Prodigio della Robotica",
      text: [
        {
          title: "TECNOLOGIE FAVOLOSE, 2",
          description:
            "— Cerca nel tuo mazzo una carta oggetto o una carta personaggio Robot e rivelala a tutti i giocatori. Rimescola il tuo mazzo e metti quella carta in cima ad esso.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 145,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4aa4ce170d6840e393a1ffd6c44d96ee",
    tcgPlayer: 578190,
  },
  text: [
    {
      title: "SWEET TECH",
      description:
        "{2} {E} — Search your deck for an item card or a Robot character card and reveal it to all players. Shuffle your deck and put that card on top of it.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        putInto: "hand",
        shuffle: true,
        type: "search-deck",
      },
      id: "r87-1",
      text: "SWEET TECH {2} {E} - Search your deck for an item card or a Robot character card and reveal it to all players. Shuffle your deck and put that card on top of it.",
      type: "action",
    },
  ],
};
