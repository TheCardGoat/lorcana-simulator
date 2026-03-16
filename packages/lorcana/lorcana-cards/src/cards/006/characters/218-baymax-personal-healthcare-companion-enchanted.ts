import type { CharacterCard } from "@tcg/lorcana-types";

export const baymaxPersonalHealthcareCompanionEnchanted: CharacterCard = {
  id: "nr4",
  canonicalId: "ci_StD",
  reprints: ["set6-156"],
  cardType: "character",
  name: "Baymax",
  version: "Personal Healthcare Companion",
  i18n: {
    en: {
      name: "Baymax",
      version: "Personal Healthcare Companion",
      text: [
        {
          title: "FULLY CHARGED",
          description:
            "If you have an Inventor character in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "YOU SAID",
          description: "'OW' 2 {I} — Remove up to 1 damage from another chosen character.",
        },
      ],
    },
    de: {
      name: "Baymax",
      version: "Persönlicher Gesundheitsbegleiter",
      text: [
        {
          title: "VOLL AUFGELADEN",
          description:
            'Wenn du einen Erfinder im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. DU HAST "AU" GESAGT 2 — Entferne bis zu 1 Schaden von einem anderen Charakter deiner Wahl.',
        },
      ],
    },
    fr: {
      name: "Baymax",
      version: "Assistant de santé personnel",
      text: [
        {
          title: "CHARGE",
          description:
            "TERMINÉE Jouer ce personnage vous coûte 1 de moins si vous avez un personnage Inventeur en jeu. VOUS AVEZ DIT 'AÏE' 2 — Choisissez un autre personnage et retirez-lui jusqu'à 1 dommage.",
        },
      ],
    },
    it: {
      name: "Baymax",
      version: "Operatore Sanitario Personale",
      text: [
        {
          title: "COMPLETAMENTE RICARICATO",
          description:
            'Se hai in gioco un personaggio Inventore, paga 1 in meno per giocare questo personaggio. HAI ESCLAMATO "AHI" 2 — Rimuovi fino a 1 danno da un altro personaggio a tua scelta.',
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 218,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7a1524eb2f994287ab6de2e677431724",
    tcgPlayer: 591999,
  },
  text: [
    {
      title: "FULLY CHARGED",
      description:
        "If you have an Inventor character in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "YOU SAID",
      description: "'OW' 2 {I} — Remove up to 1 damage from another chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Robot"],
  abilities: [
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
                type: "has-classification",
                classification: "Inventor",
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
      id: "1p5-1",
      text: "FULLY CHARGED If you have an Inventor character in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "1p5-2",
      text: "YOU SAID 'OW' 2 {I} - Remove up to 1 damage from another chosen character.",
      type: "action",
    },
  ],
};
