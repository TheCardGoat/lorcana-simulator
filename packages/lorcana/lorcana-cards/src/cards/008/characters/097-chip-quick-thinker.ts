import type { CharacterCard } from "@tcg/lorcana-types";

export const chipQuickThinker: CharacterCard = {
  id: "oOq",
  canonicalId: "ci_oOq",
  reprints: ["set8-097"],
  cardType: "character",
  name: "Chip",
  version: "Quick Thinker",
  i18n: {
    en: {
      name: "Chip",
      version: "Quick Thinker",
      text: [
        {
          title: "I'LL HANDLE THIS",
          description: "When you play this character, chosen opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Chip",
      version: "Schnelldenker",
      text: [
        {
          title: "ICH KÜMMERE MICH DARUM",
          description:
            "Wenn du diesen Charakter ausspielst, wählt eine gegnerische Person deiner Wahl 1 Karte aus ihrer Hand und wirft sie ab.",
        },
      ],
    },
    fr: {
      name: "Tic",
      version: "Vif d'esprit",
      text: [
        {
          title: "JE M'EN OCCUPE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un adversaire qui défausse une carte.",
        },
      ],
    },
    it: {
      name: "Cip",
      version: "Pronto all'Azione",
      text: [
        {
          title: "CI PENSO IO",
          description:
            "Quando giochi questo personaggio, un avversario a tua scelta sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Rescue Rangers",
  set: "008",
  cardNumber: 97,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_51597c28f0b444a6a4cf319ff579c839",
    tcgPlayer: 631346,
  },
  text: [
    {
      title: "I'LL HANDLE THIS",
      description: "When you play this character, chosen opponent chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1aq-1",
      text: "I’LL HANDLE THIS When you play this character, chosen opponent chooses and discards a card.",
      type: "action",
    },
  ],
};
