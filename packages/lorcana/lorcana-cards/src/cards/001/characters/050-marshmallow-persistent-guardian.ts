import type { CharacterCard } from "@tcg/lorcana-types";

export const marshmallowPersistentGuardian: CharacterCard = {
  id: "vE2",
  canonicalId: "ci_vE2",
  reprints: ["set1-050"],
  cardType: "character",
  name: "Marshmallow",
  version: "Persistent Guardian",
  i18n: {
    en: {
      name: "Marshmallow",
      version: "Persistent Guardian",
      text: [
        {
          title: "DURABLE",
          description:
            "When this character is banished in a challenge, you may return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Marshmallow",
      version: "Hartnäckiger Hüter",
      text: [
        {
          title: "LANGLEBIG",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, darfst du diese Karte zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "GUIMAUVE",
      version: "Gardien tenace",
      text: [
        {
          title: "NEIGE ÉTERNELLE",
          description:
            "Lorsque ce personnage est banni via un défi, vous pouvez reprendre cette carte en main.",
        },
      ],
    },
    it: {
      name: "Marshmallow",
      version: "Persistent Guardian",
      text: [
        {
          title: "DURABLE",
          description:
            "When this character is banished in a challenge, you may return this card to your hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 50,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_de3c296136f24c1a8bada1580861504c",
    tcgPlayer: 505955,
  },
  text: [
    {
      title: "DURABLE",
      description:
        "When this character is banished in a challenge, you may return this card to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      trigger: {
        event: "banish",
        on: "SELF",
        restrictions: [
          {
            type: "in-challenge",
          },
        ],
        timing: "when",
      },
      sourceZones: ["play", "discard"],
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            ref: "self",
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "it5-1",
      text: "**DURABLE** When this character is banished in a challenge, you may return this card to your hand.",
      type: "triggered",
    },
  ],
};
