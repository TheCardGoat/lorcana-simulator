import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomSwiftCleaner: CharacterCard = {
  id: "sUV",
  canonicalId: "ci_sUV",
  reprints: ["set3-045"],
  cardType: "character",
  name: "Magic Broom",
  version: "Swift Cleaner",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Swift Cleaner",
      text: [
        {
          title: "Rush",
        },
        {
          title: "CLEAN THIS, CLEAN THAT",
          description:
            "When you play this character, you may shuffle all Broom cards from your discard into your deck.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Rasanter Saubermacher",
      text: "Rasant REINIGE DIES, PUTZE DAS Wenn du diesen Charakter ausspielst, darfst du alle Besen aus deinem Ablagestapel zurück in dein Deck mischen.",
    },
    fr: {
      name: "Balais magiques",
      version: "Nettoyeur rapide",
      text: "Charge NETTOIE CECI, NETTOIE CELA Lorsque vous jouez ce personnage, vous pouvez remélanger toutes les cartes Balai de votre défausse dans votre pioche.",
    },
    it: {
      name: "Scopa Magica",
      version: "Pulitore Rapido",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) PULISCI QUESTO, PULISCI QUELLO Quando giochi questo personaggio, puoi rimescolare nel tuo mazzo tutte le carte Scopa presenti nei tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 45,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9b1e3b67709f41c58130599854495ff5",
    tcgPlayer: 539070,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "CLEAN THIS, CLEAN THAT",
      description:
        "When you play this character, you may shuffle all Broom cards from your discard into your deck.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "114-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          intoDeck: "owner",
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "shuffle-into-deck",
        },
        type: "optional",
      },
      id: "114-2",
      text: "CLEAN THIS, CLEAN THAT When you play this character, you may shuffle all Broom cards from your discard into your deck.",
      type: "action",
    },
  ],
};
