import type { CharacterCard } from "@tcg/lorcana-types";

export const bernardBrandnewAgent: CharacterCard = {
  id: "oTM",
  canonicalId: "ci_oTM",
  reprints: ["set3-002"],
  cardType: "character",
  name: "Bernard",
  version: "Brand-New Agent",
  i18n: {
    en: {
      name: "Bernard",
      version: "Brand-New Agent",
      text: [
        {
          title: "I'LL CHECK IT OUT",
          description:
            "At the end of your turn, if this character is exerted, you may ready another chosen character of yours.",
        },
      ],
    },
    de: {
      name: "Bernard",
      version: "Frischgebackener Agent",
      text: [
        {
          title: "ICH SCHAU MICH MAL EIN BISSCHEN UM",
          description:
            "Am Ende deines Zuges, wenn dieser Charakter erschöpft ist, darfst du einen deiner anderen Charaktere wählen und bereit machen.",
        },
      ],
    },
    fr: {
      name: "Bernard",
      version: "Tout nouvel agent",
      text: [
        {
          title: "JE VAIS VOIR CE QU'IL EN EST À",
          description:
            "la fin de votre tour, si ce personnage est épuisé, vous pouvez choisir et redresser l'un de vos autres personnages.",
        },
      ],
    },
    it: {
      name: "Bernie",
      version: "Agente Novello",
      text: [
        {
          title: "VADO A ISPEZIONARE",
          description:
            "Alla fine del tuo turno, se questo personaggio è impegnato, puoi preparare uno dei tuoi altri personaggi a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Rescuers",
  set: "003",
  cardNumber: 2,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b00e336742ab4743850d9927c06c7c6e",
    tcgPlayer: 537218,
  },
  text: [
    {
      title: "I'LL CHECK IT OUT",
      description:
        "At the end of your turn, if this character is exerted, you may ready another chosen character of yours.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
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
          type: "ready",
        },
        type: "optional",
      },
      id: "15t-1",
      text: "I'LL CHECK IT OUT At the end of your turn, if this character is exerted, you may ready another chosen character of yours.",
      type: "action",
    },
  ],
};
