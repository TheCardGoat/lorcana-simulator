import type { CharacterCard } from "@tcg/lorcana-types";

export const jetsamOpportunisticEel: CharacterCard = {
  id: "5xx",
  canonicalId: "ci_5xx",
  reprints: ["set10-077"],
  cardType: "character",
  name: "Jetsam",
  version: "Opportunistic Eel",
  i18n: {
    en: {
      name: "Jetsam",
      version: "Opportunistic Eel",
      text: [
        {
          title: "AMBUSH FROM THE DEEP",
          description:
            "When you play this character, deal 3 damage to chosen opposing damaged character.",
        },
      ],
    },
    de: {
      name: "Meerschaum",
      version: "Opportunistischer Aal",
      text: [
        {
          title: "ÜBERFALL AUS DER TIEFE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem gegnerischen beschädigten Charakter deiner Wahl 3 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Jetsam",
      version: "Anguille opportuniste",
      text: [
        {
          title: "EMBUSCADE DES PROFONDEURS",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse avec au moins un dommage et infligez-lui 3 dommages.",
        },
      ],
    },
    it: {
      name: "Jetsam",
      version: "Murena Opportunista",
      text: [
        {
          title: "AGGUATO DALLE PROFONDITÀ",
          description:
            "Quando giochi questo personaggio, infliggi 3 danni a un personaggio avversario danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "010",
  cardNumber: 77,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9228d591151a4ba0a1e577d19d9e38f9",
    tcgPlayer: 659462,
  },
  text: [
    {
      title: "AMBUSH FROM THE DEEP",
      description:
        "When you play this character, deal 3 damage to chosen opposing damaged character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 3,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1vu-1",
      name: "AMBUSH FROM THE DEEP",
      text: "AMBUSH FROM THE DEEP When you play this character, deal 3 damage to chosen opposing damaged character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
