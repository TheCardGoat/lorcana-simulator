import type { CharacterCard } from "@tcg/lorcana-types";

export const dumboNinthWonderOfTheUniverse: CharacterCard = {
  id: "JlP",
  canonicalId: "ci_hTe",
  reprints: ["set9-045"],
  cardType: "character",
  name: "Dumbo",
  version: "Ninth Wonder of the Universe",
  i18n: {
    en: {
      name: "Dumbo",
      version: "Ninth Wonder of the Universe",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "BREAKING RECORDS",
          description: "{E}, 1 {I} — Draw a card and gain 1 lore.",
        },
        {
          title: "MAKING HISTORY",
          description:
            'Your other characters with Evasive gain "{E}, 1 {I} — Draw a card and gain 1 lore."',
        },
      ],
    },
    de: {
      name: "Dumbo",
      version: "Das neunte Weltwunder",
      text: 'Wendig REKORDE BRECHEN, 1 — Ziehe 1 Karte und sammle 1 Legende. GESCHICHTE SCHREIBEN Deine anderen Charaktere mit Wendig erhalten ", 1 — Ziehe 1 Karte und sammle 1 Legende".',
    },
    fr: {
      name: "Dumbo",
      version: "Neuvième merveille du monde",
      text: "Insaisissable BATTANT DES RECORDS, 1 — Piochez une carte et gagnez 1 éclat de Lore. LA UNE DE TOUS LES JOURNAUX Vos autres personnages avec Insaisissable gagnent «, 1 — Piochez une carte. Gagnez 1 éclat de Lore. »",
    },
    it: {
      name: "Dumbo",
      version: "Nona Meraviglia dell'Universo",
      text: 'Sfuggente SUPERARE I RECORD, 1 — Pesca una carta e ottieni 1 leggenda. PASSERAI ALLA STORIA I tuoi altri personaggi con Sfuggente ottengono ", 1 — Pesca una carta e ottieni 1 leggenda".',
    },
  },
  inkType: ["amethyst"],
  franchise: "Dumbo",
  set: "009",
  cardNumber: 45,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_aa13ad9fe176464bac51e72c45dd6914",
    tcgPlayer: 651119,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "BREAKING RECORDS",
      description: "{E}, 1 {I} — Draw a card and gain 1 lore.",
    },
    {
      title: "MAKING HISTORY",
      description:
        'Your other characters with Evasive gain "{E}, 1 {I} — Draw a card and gain 1 lore."',
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "181-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "181-2",
      text: "BREAKING RECORDS {E}, 1 {I} – Draw a card and gain 1 lore.",
      type: "action",
    },
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "181-3",
      text: 'MAKING HISTORY Your other characters with Evasive gain "{E}, 1 {I} – Draw a card and gain 1 lore."',
      type: "action",
    },
  ],
};
