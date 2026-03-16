import type { CharacterCard } from "@tcg/lorcana-types";

export const namaariResoluteDaughter: CharacterCard = {
  id: "2TR",
  canonicalId: "ci_fJp",
  reprints: ["set5-182"],
  cardType: "character",
  name: "Namaari",
  version: "Resolute Daughter",
  i18n: {
    en: {
      name: "Namaari",
      version: "Resolute Daughter",
      text: [
        {
          title: "I DON'T HAVE ANY OTHER CHOICE",
          description:
            "For each opposing character banished in a challenge this turn, you pay 2 {I} less to play this character.",
        },
        {
          title: "Resist +3",
        },
      ],
    },
    de: {
      name: "Namaari",
      version: "Entschlossene Tochter",
      text: [
        {
          title: "ICH HABE KEINE ANDERE WAHL",
          description:
            "Für jeden gegnerischen Charakter, der in diesem Zug durch eine Herausforderung verbannt wurde, zahlst du 2 weniger, um diesen Charakter auszuspielen. Robust +3 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 3.)",
        },
      ],
    },
    fr: {
      name: "Namaari",
      version: "Fille déterminée",
      text: [
        {
          title: "JE N'AI VRAIMENT PAS LE CHOIX",
          description:
            "Jouer ce personnage vous coûte 2 de moins pour chaque personnage adverse banni via un défi ce tour-ci. Résistance +3",
        },
      ],
    },
    it: {
      name: "Namaari",
      version: "Figlia Risoluta",
      text: [
        {
          title: "NON HO DAVVERO ALTRA SCELTA",
          description:
            "Per ogni personaggio avversario esiliato in una sfida in questo turno, paga 2 in meno per giocare questo personaggio. Resistere +3",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "005",
  cardNumber: 182,
  rarity: "rare",
  cost: 9,
  strength: 5,
  willpower: 5,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_7bc86960d8004c408340e121f634035b",
    tcgPlayer: 561972,
  },
  text: [
    {
      title: "I DON'T HAVE ANY OTHER CHOICE",
      description:
        "For each opposing character banished in a challenge this turn, you pay 2 {I} less to play this character.",
    },
    {
      title: "Resist +3",
    },
  ],
  classifications: ["Storyborn", "Villain", "Princess"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1t7-1",
      text: "I DON'T HAVE ANY OTHER CHOICE For each opposing character banished in a challenge this turn, you pay 2 {I} less to play this character.",
      type: "action",
    },
    {
      id: "1t7-2",
      keyword: "Resist",
      text: "Resist +3",
      type: "keyword",
      value: 3,
    },
  ],
};
