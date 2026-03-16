import type { LocationCard } from "@tcg/lorcana-types";

export const treasureMountainAzuriteSeaIslandEnchanted: LocationCard = {
  id: "7Zk",
  canonicalId: "ci_To9",
  reprints: ["set6-203"],
  cardType: "location",
  name: "Treasure Mountain",
  version: "Azurite Sea Island",
  i18n: {
    en: {
      name: "Treasure Mountain",
      version: "Azurite Sea Island",
      text: [
        {
          title: "SECRET WEAPON",
          description:
            "At the start of your turn, deal damage to chosen character or location equal to the number of characters here.",
        },
      ],
    },
    de: {
      name: "Der Schatzberg",
      version: "Insel im Azurblauen Meer",
      text: [
        {
          title: "GEHEIMWAFFE",
          description:
            "Zu Beginn deines Zuges, zähle deine Charaktere an diesem Ort. Füge einem Charakter oder einem Ort deiner Wahl dieselbe Anzahl Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Montagne au trésor",
      version: "Île de la mer Azurite",
      text: [
        {
          title: "ARME SECRÈTE",
          description:
            "Au début de votre tour, choisissez un personnage ou un lieu et infligez-lui autant de dommages qu'il y a de personnages sur ce lieu.",
        },
      ],
    },
    it: {
      name: "Montagna del Tesoro",
      version: "Isola del Mare di Azzurrite",
      text: [
        {
          title: "ARMA SEGRETA",
          description:
            "All'inizio del tuo turno, infliggi danno a un personaggio o a un luogo a tua scelta pari al numero di personaggi in questo luogo.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 222,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  willpower: 9,
  moveCost: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c343d1fc29f3491f95bb460c90e081a7",
    tcgPlayer: 593162,
  },
  text: [
    {
      title: "SECRET WEAPON",
      description:
        "At the start of your turn, deal damage to chosen character or location equal to the number of characters here.",
    },
  ],
  abilities: [
    {
      id: "7id-1",
      name: "SECRET WEAPON",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        amount: {
          type: "source-attribute",
          attribute: "chars-at-location",
        },
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character", "location"],
        },
        type: "deal-damage",
      },
      text: "SECRET WEAPON At the start of your turn, deal damage to chosen character or location equal to the number of characters here.",
      type: "triggered",
    },
  ],
};
