import type { CharacterCard } from "@tcg/lorcana-types";

export const sourBillSurlyHenchman: CharacterCard = {
  id: "IpU",
  canonicalId: "ci_IpU",
  reprints: ["set6-147"],
  cardType: "character",
  name: "Sour Bill",
  version: "Surly Henchman",
  i18n: {
    en: {
      name: "Sour Bill",
      version: "Surly Henchman",
      text: [
        {
          title: "UNPALATABLE",
          description:
            "When you play this character, chosen opposing character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Saurer Drops",
      version: "Mürrischer Handlanger",
      text: [
        {
          title: "UNGENIESSBAR",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -2.",
        },
      ],
    },
    fr: {
      name: "Aigre Bill",
      version: "Acolyte maussade",
      text: [
        {
          title: "INDIGESTE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Aspro Bill",
      version: "Braccio Destro Scorbutico",
      text: [
        {
          title: "IMMANGIABILE",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 147,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e547f6533974321a1eb89579e98cac0",
    tcgPlayer: 591983,
  },
  text: [
    {
      title: "UNPALATABLE",
      description: "When you play this character, chosen opposing character gets -2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1f5-1",
      name: "UNPALATABLE",
      text: "UNPALATABLE When you play this character, chosen opposing character gets -2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
