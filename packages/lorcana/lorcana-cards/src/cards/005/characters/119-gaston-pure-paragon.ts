import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonPureParagon: CharacterCard = {
  id: "JSc",
  canonicalId: "ci_JSc",
  reprints: ["set5-119"],
  cardType: "character",
  name: "Gaston",
  version: "Pure Paragon",
  i18n: {
    en: {
      name: "Gaston",
      version: "Pure Paragon",
      text: [
        {
          title: "A MAN AMONG MEN!",
          description:
            "For each damaged character you have in play, you pay 2 {I} less to play this character.",
        },
        {
          title: "Rush",
        },
      ],
    },
    de: {
      name: "Gaston",
      version: "Redlich, solid, tadellos",
      text: [
        {
          title: "DER MANN UNTER DEN MÄNNERN!",
          description:
            "Für jeden beschädigten Charakter den du im Spiel hast, zahlst du 2 weniger, um diesen Charakter auszuspielen. Rasant",
        },
      ],
    },
    fr: {
      name: "Gaston",
      version: "Du chic et de la prestance",
      text: [
        {
          title: "LE PLUS CLASSE, C'EST GASTON!",
          description:
            "Jouer ce personnage vous coûte 2 de moins pour chacun de vos personnages ayant au moins un dommage sur lui. Charge",
        },
      ],
    },
    it: {
      name: "Gaston",
      version: "Ganzo Più Ganzo",
      text: [
        {
          title: "L'UOMO PERFETTO!",
          description:
            "Per ogni personaggio danneggiato che hai in gioco, paga 2 in meno per giocare questo personaggio. Lesto (Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 119,
  rarity: "rare",
  cost: 9,
  strength: 10,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_63f4432a95d84d9dab23728cf715f31f",
    tcgPlayer: 560542,
  },
  text: [
    {
      title: "A MAN AMONG MEN!",
      description:
        "For each damaged character you have in play, you pay 2 {I} less to play this character.",
    },
    {
      title: "Rush",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "z5u-1",
      text: "A MAN AMONG MEN! For each damaged character you have in play, you pay 2 {I} less to play this character.",
      type: "action",
    },
    {
      id: "z5u-2",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
  ],
};
