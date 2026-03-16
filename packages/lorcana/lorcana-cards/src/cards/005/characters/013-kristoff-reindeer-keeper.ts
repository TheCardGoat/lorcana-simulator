import type { CharacterCard } from "@tcg/lorcana-types";

export const kristoffReindeerKeeper: CharacterCard = {
  id: "AZZ",
  canonicalId: "ci_AZZ",
  reprints: ["set5-013"],
  cardType: "character",
  name: "Kristoff",
  version: "Reindeer Keeper",
  i18n: {
    en: {
      name: "Kristoff",
      version: "Reindeer Keeper",
      text: [
        {
          title: "SONG OF THE HERD",
          description:
            "For each song card in your discard, you pay 1 {I} less to play this character.",
        },
        {
          title: "Bodyguard",
        },
      ],
    },
    de: {
      name: "Kristoff",
      version: "Rentier Hüter",
      text: [
        {
          title: "GESANG DER HERDE",
          description:
            "Für jede Liedkarte in deinem Ablagestapel, zahlst du 1 weniger, um diesen Charakter auszuspielen. Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Kristoff",
      version: "Garde-rennes",
      text: [
        {
          title: "CHANT DU TROUPEAU",
          description:
            "Jouer ce personnage vous coûte 1 de moins par carte Chanson dans votre défausse. Rempart (Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Kristoff",
      version: "Custode delle Renne",
      text: [
        {
          title: "CANZONE DEL BRANCO",
          description:
            "Per ogni carta canzone nei tuoi scarti, paga 1 in meno per giocare questo personaggio. Guardiano",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 13,
  rarity: "rare",
  cost: 9,
  strength: 3,
  willpower: 7,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_6cba76453f834205a7edf1e8222907c7",
    tcgPlayer: 555689,
  },
  text: [
    {
      title: "SONG OF THE HERD",
      description: "For each song card in your discard, you pay 1 {I} less to play this character.",
    },
    {
      title: "Bodyguard",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1qs-1",
      text: "SONG OF THE HERD For each song card in your discard, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      id: "1qs-2",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
