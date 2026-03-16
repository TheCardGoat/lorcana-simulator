import type { CharacterCard } from "@tcg/lorcana-types";

export const belleInventiveEngineer: CharacterCard = {
  id: "1AR",
  canonicalId: "ci_xtR",
  reprints: ["set1-141", "set9-156"],
  cardType: "character",
  name: "Belle",
  version: "Inventive Engineer",
  i18n: {
    en: {
      name: "Belle",
      version: "Inventive Engineer",
      text: [
        {
          title: "TINKER",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next item you play this turn.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Ideenreiche Ingenieurin",
      text: [
        {
          title: "TÜFTELN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für den nächsten Gegenstand, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "BELLE",
      version: "Inventrice",
      text: [
        {
          title: "BRICOLEUSE",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, le prochain objet que vous jouez durant ce tour coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Belle",
      version: "Ingegnera Creativa",
      text: [
        {
          title: "INVENTRICE",
          description:
            "Ogni volta che questo personaggio va all'avventura, paga 1 in meno per giocare il tuo prossimo oggetto per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 156,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b77ec6c391cd4ccaa1b1e01ca897502d",
    tcgPlayer: 650091,
  },
  text: [
    {
      title: "TINKER",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next item you play this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess", "Inventor"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "11d-1",
      name: "TINKER",
      text: "TINKER Whenever this character quests, you pay 1 {I} less for the next item you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
