import type { CharacterCard } from "@tcg/lorcana-types";

export const roquefortLockExpert: CharacterCard = {
  id: "P7n",
  canonicalId: "ci_P7n",
  reprints: ["set8-172"],
  cardType: "character",
  name: "Roquefort",
  version: "Lock Expert",
  i18n: {
    en: {
      name: "Roquefort",
      version: "Lock Expert",
      text: [
        {
          title: "SAFEKEEPING",
          description:
            "Whenever this character quests, you may put chosen item into its player's inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Roquefort",
      version: "Experte für Schlösser",
      text: [
        {
          title: "SICHERE VERWAHRUNG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Gegenstand deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Roquefort",
      version: "Expert en serrures",
      text: [
        {
          title: "GARDER EN SÉCURITÉ",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un objet et le placer dans la réserve d'encre de son propriétaire, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Groviera",
      version: "Esperto di Serrature",
      text: [
        {
          title: "METTERE AL SICURO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi aggiungere un oggetto a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Aristocats",
  set: "008",
  cardNumber: 172,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d2291465ec4640f585a653be4290e2ac",
    tcgPlayer: 631675,
  },
  text: [
    {
      title: "SAFEKEEPING",
      description:
        "Whenever this character quests, you may put chosen item into its player's inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [],
};
