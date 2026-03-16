import type { CharacterCard } from "@tcg/lorcana-types";

export const sheriffOfNottinghamBushelBritches: CharacterCard = {
  id: "ROz",
  canonicalId: "ci_ROz",
  reprints: ["set5-145"],
  cardType: "character",
  name: "Sheriff of Nottingham",
  version: "Bushel Britches",
  i18n: {
    en: {
      name: "Sheriff of Nottingham",
      version: "Bushel Britches",
      text: [
        {
          title: "EVERY LITTLE BIT HELPS",
          description: "For each item you have in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "Support",
        },
      ],
    },
    de: {
      name: "Sheriff von Nottingham",
      version: "Der alte Geldsack",
      text: [
        {
          title: "SCHON DAS KLEINSTE BISSCHEN HILFT",
          description:
            "Für jeden Gegenstand den du im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Shérif de Nottingham",
      version: "Immonde personnage",
      text: [
        {
          title: "Y A PAS DE P'TITES PIÈCES",
          description:
            "Jouer ce personnage vous coûte 1 de moins pour chaque objet que vous avez en jeu. Soutien",
        },
      ],
    },
    it: {
      name: "Sceriffo di Nottingham",
      version: "Vecchio Bracalone",
      text: [
        {
          title: "TUTTO FA, ANCHE SE È POCO",
          description:
            "Per ogni oggetto che hai in gioco, paga 1 in meno per giocare questo personaggio. Aiutante",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 145,
  rarity: "rare",
  cost: 9,
  strength: 5,
  willpower: 9,
  lore: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_f13c7ff8caa0471c9cea95ac9d2177c2",
    tcgPlayer: 561968,
  },
  text: [
    {
      title: "EVERY LITTLE BIT HELPS",
      description: "For each item you have in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "Support",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "133-1",
      text: "EVERY LITTLE BIT HELPS For each item you have in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      id: "133-2",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
  ],
};
