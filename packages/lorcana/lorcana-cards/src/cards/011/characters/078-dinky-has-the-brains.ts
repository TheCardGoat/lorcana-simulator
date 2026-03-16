import type { CharacterCard } from "@tcg/lorcana-types";

export const dinkyHasTheBrains: CharacterCard = {
  id: "m5J",
  canonicalId: "ci_m5J",
  reprints: ["set11-078"],
  cardType: "character",
  name: "Dinky",
  version: "Has the Brains",
  i18n: {
    en: {
      name: "Dinky",
      version: "Has the Brains",
      text: [
        {
          title: "GET HIM!",
          description:
            "When you play this character, each opponent chooses one of their characters and deals 1 damage to them.",
        },
      ],
    },
    de: {
      name: "Dinky",
      version: "Der mit dem Verstand",
      text: [
        {
          title: "SCHNAPP IHN!",
          description:
            "Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je einen ihrer Charaktere und fügen diesem 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Dinky",
      version: "A le cerveau",
      text: [
        {
          title: "ATTRAPE-LE!",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire choisit l'un de ses personnages et lui inflige 1 dommage.",
        },
      ],
    },
    it: {
      name: "Cippi",
      version: "Quello con il Cervello",
      text: [
        {
          title: "PRENDILO!",
          description:
            "Quando giochi questo personaggio, ogni avversario sceglie uno dei suoi personaggi e gli infligge 1 danno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 78,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0fc3d71d5b8e4fb08b5c9108cbd3e28a",
    tcgPlayer: 676199,
  },
  text: [
    {
      title: "GET HIM!",
      description:
        "When you play this character, each opponent chooses one of their characters and deals 1 damage to them.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "lv7-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      name: "GET HIM!",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GET HIM! When you play this character, each opponent chooses one of their characters and deals 1 damage to them.",
    },
  ],
};
