import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarStrikingIllusionist: CharacterCard = {
  id: "4un",
  canonicalId: "ci_7x1",
  reprints: ["set3-042"],
  cardType: "character",
  name: "Jafar",
  version: "Striking Illusionist",
  i18n: {
    en: {
      name: "Jafar",
      version: "Striking Illusionist",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "Evasive",
        },
        {
          title: "POWER BEYOND MEASURE",
          description:
            "During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Verblüffender Illusionist",
      text: "Gestaltwandel 5 Wendig GRENZENLOSE MACHT Solange dieser Charakter während deines Zuges erschöpft ist, sammelst du jedes mal 1 Legende, wenn du eine Karte ziehst.",
    },
    fr: {
      name: "Jafar",
      version: "Illusionniste ensorcelant",
      text: "Alter 5 Insaisissable POUVOIR SANS LIMITE Tant que ce personnage est épuisé, gagnez 1 éclat de Lore pour chaque carte que vous piochez durant votre tour.",
    },
    it: {
      name: "Jafar",
      version: "Strabiliante Illusionista",
      text: "Trasformazione 5 Sfuggente POTERE OLTRE OGNI LIMITE Durante il tuo turno, mentre questo personaggio è impegnato, ottieni 1 leggenda ogni volta che peschi una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 42,
  rarity: "legendary",
  cost: 7,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3ecab24376cb4cd5989309e000f797c1",
    tcgPlayer: 539158,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Evasive",
    },
    {
      title: "POWER BEYOND MEASURE",
      description:
        "During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1nu-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      id: "1nu-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1nu-3",
      text: "POWER BEYOND MEASURE During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.",
      condition: {
        target: "SELF",
        type: "exerted",
      },
      trigger: {
        event: "draw",
        on: "YOU",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
