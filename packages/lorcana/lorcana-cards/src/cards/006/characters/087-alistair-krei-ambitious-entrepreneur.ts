import type { CharacterCard } from "@tcg/lorcana-types";

export const alistairKreiAmbitiousEntrepreneur: CharacterCard = {
  id: "kZO",
  canonicalId: "ci_kZO",
  reprints: ["set6-087"],
  cardType: "character",
  name: "Alistair Krei",
  version: "Ambitious Entrepreneur",
  i18n: {
    en: {
      name: "Alistair Krei",
      version: "Ambitious Entrepreneur",
      text: [
        {
          title: "AN EYE FOR TECH",
          description:
            "When you play this character, if an opponent has an item in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Alistair Krei",
      version: "Ehrgeiziger Unternehmer",
      text: [
        {
          title: "EIN AUGE FÜR TECHNIK",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person einen Gegenstand im Spiel hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Alistair Krei",
      version: "Entrepreneur ambitieux",
      text: [
        {
          title: "L'ŒIL POUR LA TECHNOLOGIE",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a un objet en jeu, vous gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Alistair Krei",
      version: "Imprenditore Ambizioso",
      text: [
        {
          title: "OCCHIO PER LA TECNOLOGIA",
          description:
            "Quando giochi questo personaggio, se un avversario ha in gioco un oggetto, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 87,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c089296aad2d4e4c86c0225be686795b",
    tcgPlayer: 588368,
  },
  text: [
    {
      title: "AN EYE FOR TECH",
      description: "When you play this character, if an opponent has an item in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Inventor"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an opponent has an item in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "ppn-1",
      name: "AN EYE FOR TECH",
      text: "AN EYE FOR TECH When you play this character, if an opponent has an item in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
