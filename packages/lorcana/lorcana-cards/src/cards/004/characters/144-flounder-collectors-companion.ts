import type { CharacterCard } from "@tcg/lorcana-types";

export const flounderCollectorsCompanion: CharacterCard = {
  id: "xbo",
  canonicalId: "ci_xbo",
  reprints: ["set4-144"],
  cardType: "character",
  name: "Flounder",
  version: "Collector’s Companion",
  i18n: {
    en: {
      name: "Flounder",
      version: "Collector’s Companion",
      text: [
        {
          title: "Support",
        },
        {
          title: "I'M NOT A GUPPY",
          description:
            "If you have a character named Ariel in play, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Fabius",
      version: "Begleiter der Sammlerin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) ICH BIN KEINE KAULQUAPPE Wenn du einen Arielle-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
    },
    fr: {
      name: "Polochon",
      version: "Compagnon de la collectionneuse",
      text: "Soutien JE NE SUIS PAS UN POISSON-LUNE Si vous avez un personnage Ariel en jeu, jouer ce personnage coûte 1 de moins.",
    },
    it: {
      name: "Flounder",
      version: "Compagno della Collezionista",
      text: "Aiutante NON SONO UN PESCE ROSSO Se hai in gioco un personaggio chiamato Ariel, paga 1 in meno per giocare questo personaggio.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 144,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e5268062a91d46d1b89bd272a3f8c043",
    tcgPlayer: 547687,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "I'M NOT A GUPPY",
      description:
        "If you have a character named Ariel in play, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1n4-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Ariel",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "1n4-2",
      text: "I'M NOT A GUPPY If you have a character named Ariel in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
  ],
};
