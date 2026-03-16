import type { CharacterCard } from "@tcg/lorcana-types";

export const clarabelleNewsReporter: CharacterCard = {
  id: "ykh",
  canonicalId: "ci_ykh",
  reprints: ["set7-153"],
  cardType: "character",
  name: "Clarabelle",
  version: "News Reporter",
  i18n: {
    en: {
      name: "Clarabelle",
      version: "News Reporter",
      text: [
        {
          title: "Support",
        },
        {
          title: "BREAKING STORY",
          description: "Your other characters with Support get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Klarabella",
      version: "Nachrichtenreporterin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) EILMELDUNG Deine anderen Charaktere mit Unterstützen erhalten +1.",
    },
    fr: {
      name: "Clarabelle",
      version: "Journaliste",
      text: "Soutien SCOOP Vos autres personnages avec Soutien gagnent +1.",
    },
    it: {
      name: "Clarabella",
      version: "Giornalista",
      text: "Aiutante NOTIZIA BOMBA I tuoi altri personaggi con Aiutante ricevono +1.",
    },
  },
  inkType: ["sapphire"],
  set: "007",
  cardNumber: 153,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0ae6751e22074e8fb6bfe871c4f44f3e",
    tcgPlayer: 618711,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "BREAKING STORY",
      description: "Your other characters with Support get +1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1r6-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "1r6-2",
      text: "BREAKING STORY Your other characters with Support get +1 {S}.",
      type: "action",
    },
  ],
};
