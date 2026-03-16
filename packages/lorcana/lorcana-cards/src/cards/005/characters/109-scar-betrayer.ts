import type { CharacterCard } from "@tcg/lorcana-types";

export const scarBetrayer: CharacterCard = {
  id: "MEi",
  canonicalId: "ci_MEi",
  reprints: ["set5-109"],
  cardType: "character",
  name: "Scar",
  version: "Betrayer",
  i18n: {
    en: {
      name: "Scar",
      version: "Betrayer",
      text: [
        {
          title: "LONG LIVE THE KING",
          description:
            "When you play this character, you may banish chosen character named Mufasa.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Verräter",
      text: [
        {
          title: "LANG LEBE DER KÖNIG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Mufasa-Charakter deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Scar",
      version: "Traître",
      text: [
        {
          title: "LONGUE VIE AU ROI",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage Mufasa et le bannir.",
        },
      ],
    },
    it: {
      name: "Scar",
      version: "Traditore",
      text: [
        {
          title: "LUNGA VITA AL RE",
          description:
            "Quando giochi questo personaggio, puoi esiliare un personaggio chiamato Mufasa a tua scelta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 109,
  rarity: "uncommon",
  cost: 5,
  strength: 6,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0e2b19d48e8447f19582feef97a52725",
    tcgPlayer: 561962,
  },
  text: [
    {
      title: "LONG LIVE THE KING",
      description: "When you play this character, you may banish chosen character named Mufasa.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "1rc-1",
      name: "LONG LIVE THE KING",
      text: "LONG LIVE THE KING When you play this character, you may banish chosen character named Mufasa.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
