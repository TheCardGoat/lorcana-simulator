import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaGuardianOfTheDragonGem: CharacterCard = {
  id: "ztE",
  canonicalId: "ci_ztE",
  reprints: ["set4-122"],
  cardType: "character",
  name: "Raya",
  version: "Guardian of the Dragon Gem",
  i18n: {
    en: {
      name: "Raya",
      version: "Guardian of the Dragon Gem",
      text: [
        {
          title: "WE HAVE TO COME TOGETHER",
          description:
            "When you play this character, ready chosen character of yours at a location. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Wächterin des Drachenjuwels",
      text: [
        {
          title: "WIR MÜSSEN UNS ZUSAMMENTUN",
          description:
            "Wenn du diesen Charakter ausspielst, mache einen deiner Charaktere an einem Ort bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Raya",
      version: "Gardienne de la Pierre de Dragon",
      text: [
        {
          title: "NOUS DEVONS NOUS RÉCONCILIER",
          description:
            "Lorsque vous jouez ce personnage, choisissez un de vos personnages sur un lieu et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Raya",
      version: "Guardiana della Gemma Drago",
      text: [
        {
          title: "DOBBIAMO UNIRE LE FORZE",
          description:
            "Quando giochi questo personaggio, prepara un tuo personaggio a tua scelta che si trova in un luogo. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 122,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_37a7ae2b078b415aab3dff267ca8c86d",
    tcgPlayer: 550599,
  },
  text: [
    {
      title: "WE HAVE TO COME TOGETHER",
      description:
        "When you play this character, ready chosen character of yours at a location. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1n3-1",
      name: "WE HAVE TO COME TOGETHER",
      text: "WE HAVE TO COME TOGETHER When you play this character, ready chosen character of yours at a location. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
