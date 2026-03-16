import type { CharacterCard } from "@tcg/lorcana-types";

export const megaraCaptivatingCynic: CharacterCard = {
  id: "2qv",
  canonicalId: "ci_2qv",
  reprints: ["set4-079"],
  cardType: "character",
  name: "Megara",
  version: "Captivating Cynic",
  i18n: {
    en: {
      name: "Megara",
      version: "Captivating Cynic",
      text: [
        {
          title: "SHADY DEAL",
          description:
            "When you play this character, choose and discard a card or banish this character.",
        },
      ],
    },
    de: {
      name: "Meg",
      version: "Hinreißende Zynikerin",
      text: [
        {
          title: "ZWIELICHTIGES GESCHÄFT",
          description:
            "Wenn du diesen Charakter ausspielst, wähle eine Karte aus deiner Hand und wirf sie ab oder verbanne diesen Charakter.",
        },
      ],
    },
    fr: {
      name: "Mégara",
      version: "Cynique captivante",
      text: [
        {
          title: "ACCORD LOUCHE",
          description:
            "Lorsque vous jouez ce personnage, bannissez-le ou défaussez-vous d'une carte.",
        },
      ],
    },
    it: {
      name: "Megara",
      version: "Cinica Affascinante",
      text: [
        {
          title: "PATTO LOSCO",
          description:
            "Quando giochi questo personaggio, scegli e scarta una carta o esilia questo personaggio.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 79,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_bb689737789640e98f540464691035a6",
    tcgPlayer: 549632,
  },
  text: [
    {
      title: "SHADY DEAL",
      description:
        "When you play this character, choose and discard a card or banish this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "or",
        optionLabels: ["choose and discard a card", "banish this character."],
        options: [
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
          {
            type: "banish",
            target: {
              selector: "self",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
    },
  ],
};
