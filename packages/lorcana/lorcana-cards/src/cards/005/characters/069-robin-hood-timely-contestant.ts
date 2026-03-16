import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodTimelyContestant: CharacterCard = {
  id: "LKY",
  canonicalId: "ci_LKY",
  reprints: ["set5-069"],
  cardType: "character",
  name: "Robin Hood",
  version: "Timely Contestant",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Timely Contestant",
      text: [
        {
          title: "TAG ME IN!",
          description:
            "For each 1 damage on opposing characters, you pay 1 {I} less to play this character.",
        },
        {
          title: "Ward",
        },
      ],
    },
    de: {
      name: "Robin Hood",
      version: "Rechtzeitiger Teilnehmer",
      text: [
        {
          title: "ICH BIN DRAN!",
          description:
            "Für jeden Schaden auf gegnerischen Charakteren, zahlst du 1 weniger, um diesen Charakter auszuspielen. Behütet",
        },
      ],
    },
    fr: {
      name: "Robin des Bois",
      version: "Candidat opportun",
      text: [
        {
          title: "J'ARRIVE!",
          description:
            "Jouer ce personnage vous coûte 1 de moins par dommage sur les personnages adverses. Hors d'atteinte",
        },
      ],
    },
    it: {
      name: "Robin Hood",
      version: "Concorrente Tempestivo",
      text: [
        {
          title: "MANDAMI IN CAMPO!",
          description:
            "Per ogni singolo danno sui personaggi avversari, paga 1 in meno per giocare questo personaggio. Protetto",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 69,
  rarity: "rare",
  cost: 9,
  strength: 6,
  willpower: 6,
  lore: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_e563c6bf2df446f5b77fbf41d3d3b30a",
    tcgPlayer: 557730,
  },
  text: [
    {
      title: "TAG ME IN!",
      description:
        "For each 1 damage on opposing characters, you pay 1 {I} less to play this character.",
    },
    {
      title: "Ward",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "jfv-1",
      text: "TAG ME IN! For each 1 damage on opposing characters, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      id: "jfv-2",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
  ],
};
