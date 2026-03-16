import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiPersistentPresence: CharacterCard = {
  id: "ziG",
  canonicalId: "ci_aw8",
  reprints: ["set2-043", "set11-058"],
  cardType: "character",
  name: "HeiHei",
  version: "Persistent Presence",
  i18n: {
    en: {
      name: "HeiHei",
      version: "Persistent Presence",
      text: [
        {
          title: "HE'S BACK!",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
      ],
    },
    de: {
      name: "HeiHei",
      version: "Wiederkehrende Erscheinung",
      text: [
        {
          title: "ER IST ZURÜCK!",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Heihei",
      version: "Volatile tenace",
      text: [
        {
          title: "IL EST DE RETOUR",
          description: "Lorsque ce personnage est banni via un défi, renvoyez-le dans votre main.",
        },
      ],
    },
    it: {
      name: "Heihei",
      version: "Presenza Persistente",
      text: [
        {
          title: "È TORNATO!",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "002",
  cardNumber: 43,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_122d3f9ccb034f7d9e59245d311a7004",
    tcgPlayer: 675296,
  },
  text: [
    {
      title: "HE'S BACK!",
      description: "When this character is banished in a challenge, return this card to your hand.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      id: "1a9-1",
      effect: {
        target: "CONTROLLER",
        type: "return-from-discard",
      },
      name: "HE'S BACK!",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "HE'S BACK! When this character is banished in a challenge, return this card from your discard to your hand.",
    },
  ],
};
