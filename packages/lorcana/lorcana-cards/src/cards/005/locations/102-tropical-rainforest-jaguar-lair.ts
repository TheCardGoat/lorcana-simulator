import type { LocationCard } from "@tcg/lorcana-types";

export const tropicalRainforestJaguarLair: LocationCard = {
  id: "PvR",
  canonicalId: "ci_PvR",
  reprints: ["set5-102"],
  cardType: "location",
  name: "Tropical Rainforest",
  version: "Jaguar Lair",
  i18n: {
    en: {
      name: "Tropical Rainforest",
      version: "Jaguar Lair",
      text: [
        {
          title: "SNACK TIME",
          description:
            "Opposing damaged characters gain Reckless. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Tropischer Regenwald",
      version: "Jaguar-Lager",
      text: [
        {
          title: "SNACK-ZEIT",
          description:
            "Beschädigte gegnerische Charaktere erhalten Impulsiv. (Sie können nicht erkunden und müssen herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Forêt tropicale",
      version: "Repaire des jaguars",
      text: [
        {
          title: "L'HEURE DU CASSE-CROÛTE",
          description:
            "Les personnages adverses ayant au moins un dommage sur eux gagnent Combattant. (Ces personnages ne peuvent pas être envoyés à l'aventure et doivent défier à chaque tour s'ils le peuvent.)",
        },
      ],
    },
    it: {
      name: "Foresta Tropicale",
      version: "Tana dei Giaguari",
      text: [
        {
          title: "ORA DELLA MERENDA I",
          description:
            "personaggi danneggiati avversari ottengono Attaccabrighe. (Non possono andare all'avventura e devono sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 102,
  rarity: "uncommon",
  cost: 3,
  willpower: 6,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_85d29b6399cc45b696b6f1e9abe19910",
    tcgPlayer: 560240,
  },
  text: [
    {
      title: "SNACK TIME",
      description:
        "Opposing damaged characters gain Reckless. (They can't quest and must challenge if able.)",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Reckless",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "damaged",
            },
          ],
        },
        type: "gain-keyword",
      },
      id: "n0b-1",
      name: "SNACK TIME",
      text: "SNACK TIME Opposing damaged characters gain Reckless.",
      type: "static",
    },
  ],
};
