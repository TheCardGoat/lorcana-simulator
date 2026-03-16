import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomBucketBrigade: CharacterCard = {
  id: "Ors",
  canonicalId: "ci_Ors",
  reprints: ["set1-047"],
  cardType: "character",
  name: "Magic Broom",
  version: "Bucket Brigade",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Bucket Brigade",
      text: [
        {
          title: "SWEEP",
          description:
            "When you play this character, you may shuffle a card from any discard into its player's deck.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Wasser marsch!",
      text: [
        {
          title: "FEGEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte deiner Wahl aus einem Ablagestapel zurück in das zugehörige Deck mischen.",
        },
      ],
    },
    fr: {
      name: "BALAIS MAGIQUES",
      version: "Armés de seaux",
      text: [
        {
          title: "BALAYER",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez remélanger une carte de la défausse de n'importe quel joueur dans sa pioche.",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Brigata del Secchio",
      text: [
        {
          title: "SPAZZARE",
          description:
            "Quando giochi questo personaggio, puoi rimescolare una carta dagli scarti di un qualsiasi giocatore nel suo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "001",
  cardNumber: 47,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingImplementation: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_95ecf1d59f004e4399a2c61e280dfd13",
    tcgPlayer: 493477,
  },
  text: [
    {
      title: "SWEEP",
      description:
        "When you play this character, you may shuffle a card from any discard into its player's deck.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "zyc-1",
      text: "**SWEEP** When you play this character, you may shuffle a card from any discard into its player",
      type: "action",
    },
  ],
};
