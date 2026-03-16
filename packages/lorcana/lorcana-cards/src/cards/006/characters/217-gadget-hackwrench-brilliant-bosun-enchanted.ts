import type { CharacterCard } from "@tcg/lorcana-types";

export const gadgetHackwrenchBrilliantBosunEnchanted: CharacterCard = {
  id: "WXx",
  canonicalId: "ci_tKe",
  reprints: ["set6-140"],
  cardType: "character",
  name: "Gadget Hackwrench",
  version: "Brilliant Bosun",
  i18n: {
    en: {
      name: "Gadget Hackwrench",
      version: "Brilliant Bosun",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "MECHANICALLY SAVVY",
          description:
            "While you have 3 or more items in play, you pay 1 {I} less to play Inventor characters.",
        },
      ],
    },
    de: {
      name: "Trixi",
      version: "Geniale Bootsführerin",
      text: "Gestaltwandel 4 MECHANISCH VERSIERT Solange du mindestens 3 Gegenstände im Spiel hast, zahlst du 1 weniger, um Erfinder auszuspielen.",
    },
    fr: {
      name: "Gadget",
      version: "Bosco brillante",
      text: "Alter 4 MÉCANIQUEMENT FUTÉE Tant que vous avez 3 objets ou plus en jeu, jouer des personnages Inventeur vous coûte 1 de moins.",
    },
    it: {
      name: "Scheggia Hackwrench",
      version: "Brillante Nostroma",
      text: "Trasformazione 4 ESPERTA DI MECCANICA Mentre hai in gioco 3 o più oggetti, paga 1 in meno per giocare i personaggi Inventore.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 217,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae7e15af9559439ba734caac9aa567e5",
    tcgPlayer: 592038,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "MECHANICALLY SAVVY",
      description:
        "While you have 3 or more items in play, you pay 1 {I} less to play Inventor characters.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "35v-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        count: 3,
        type: "has-item-count",
      },
      effect: {
        amount: 1,
        cardType: "character",
        classification: "Inventor",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "35v-2",
      name: "MECHANICALLY SAVVY",
      text: "MECHANICALLY SAVVY While you have 3 or more items in play, you pay 1 {I} less to play Inventor characters.",
      type: "static",
    },
  ],
};
