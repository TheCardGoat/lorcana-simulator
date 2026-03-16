import type { CharacterCard } from "@tcg/lorcana-types";

export const hermesHarriedMessenger: CharacterCard = {
  id: "RlF",
  canonicalId: "ci_RlF",
  reprints: ["set10-112"],
  cardType: "character",
  name: "Hermes",
  version: "Harried Messenger",
  i18n: {
    en: {
      name: "Hermes",
      version: "Harried Messenger",
      text: "Rush",
    },
    de: {
      name: "Hermes",
      version: "Gestresster Bote",
      text: "Rasant",
    },
    fr: {
      name: "Hermès",
      version: "Messager pressé",
      text: "Charge",
    },
    it: {
      name: "Hermes",
      version: "Messaggero Stressato",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 112,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_54dc293b739a4ed0afb598fa0484eaf6",
    tcgPlayer: 658878,
  },
  text: "Rush",
  classifications: ["Storyborn", "Deity"],
  abilities: [
    {
      id: "17j-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
