import type { CharacterCard } from "@tcg/lorcana-types";

export const magicCarpetFlyingRug: CharacterCard = {
  id: "oLg",
  canonicalId: "ci_oLg",
  reprints: ["set3-047"],
  cardType: "character",
  name: "Magic Carpet",
  version: "Flying Rug",
  i18n: {
    en: {
      name: "Magic Carpet",
      version: "Flying Rug",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "FIND THE WAY",
          description: "{E} — Move a character of yours to a location for free.",
        },
      ],
    },
    de: {
      name: "Fliegender Teppich",
      version: "Überflieger",
      text: "Wendig FINDE DEN WEG — Wähle einen deiner Charaktere und bewege ihn kostenlos zu einem Ort.",
    },
    fr: {
      name: "Tapis volant",
      version: "Carpette magique",
      text: "Insaisissable TROUVE LE CHEMIN — Déplacez gratuitement l'un de vos personnages sur un lieu.",
    },
    it: {
      name: "Tappeto Magico",
      version: "Scendiletto Volante",
      text: "Sfuggente TROVARE LA VIA — Sposta gratuitamente un tuo personaggio in un luogo a tua scelta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 47,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_308bd5ecd73f4d26af79fb786fab2eea",
    tcgPlayer: 539072,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "FIND THE WAY",
      description: "{E} — Move a character of yours to a location for free.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
