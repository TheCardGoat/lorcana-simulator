import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckCoinCollector: CharacterCard = {
  id: "i7B",
  canonicalId: "ci_i7B",
  reprints: ["set8-037"],
  cardType: "character",
  name: "Donald Duck",
  version: "Coin Collector",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Coin Collector",
      text: [
        {
          title: "HERE, PIGGY, PIGGY",
          description:
            "For each item named The Nephews' Piggy Bank you have in play, you pay 2 {I} less to play this character.",
        },
        {
          title: "MONEY EVERYWHERE",
          description:
            'When you play this character, your other characters gain "{E} — Draw a card" this turn.',
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Münzsammler",
      text: [
        {
          title: "WO IST DAS SCHWEINCHEN?",
          description:
            "Für jeden Das-Sparschwein-der-Neffen-Gegenstand, den du im Spiel hast, zahlst du 2 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "ÜBERALL GELD",
          description:
            'Wenn du diesen Charakter ausspielst, erhalten deine anderen Charaktere in diesem Zug: " — Ziehe 1 Karte."',
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Collectionneur de pièces",
      text: [
        {
          title: "PAR ICI, PETIT COCHON",
          description:
            "Jouer ce personnage vous coûte 2 de moins pour chaque objet nommé La tirelire des neveux que vous avez en jeu.",
        },
        {
          title: "DE L'ARGENT PARTOUT",
          description:
            'Lorsque vous jouez ce personnage, vos autres personnages gagnent " — Piochez une carte." pour le reste de ce tour.',
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Collezionista di Monete",
      text: [
        {
          title: "QUI, MAIALINO",
          description:
            "Per ogni oggetto chiamato Salvadanaio dei Nipoti che hai in gioco, paga 2 in meno per giocare questo personaggio.",
        },
        {
          title: "SOLDI OVUNQUE",
          description:
            'Quando giochi questo personaggio, i tuoi altri personaggi ottengono " — Pesca una carta" per questo turno.',
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "008",
  cardNumber: 37,
  rarity: "common",
  cost: 8,
  strength: 4,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fef2291c6e394415a529772dcda9e9b0",
    tcgPlayer: 631334,
  },
  text: [
    {
      title: "HERE, PIGGY, PIGGY",
      description:
        "For each item named The Nephews' Piggy Bank you have in play, you pay 2 {I} less to play this character.",
    },
    {
      title: "MONEY EVERYWHERE",
      description:
        'When you play this character, your other characters gain "{E} — Draw a card" this turn.',
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [],
};
