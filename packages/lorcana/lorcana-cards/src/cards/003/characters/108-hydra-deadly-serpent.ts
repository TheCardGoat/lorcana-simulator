import type { CharacterCard } from "@tcg/lorcana-types";

export const hydraDeadlySerpent: CharacterCard = {
  id: "dZ8",
  canonicalId: "ci_dZ8",
  reprints: ["set3-108"],
  cardType: "character",
  name: "Hydra",
  version: "Deadly Serpent",
  i18n: {
    en: {
      name: "Hydra",
      version: "Deadly Serpent",
      text: [
        {
          title: "WATCH THE TEETH",
          description:
            "Whenever this character is dealt damage, deal that much damage to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Hydra",
      version: "Tödliche Schlange",
      text: [
        {
          title: "VORSICHT ZÄHNE!",
          description:
            "Jedes Mal, wenn diesem Charakter Schaden zugefügt wird, füge einem gegnerischen Charakter deiner Wahl genauso viel Schaden zu.",
        },
      ],
    },
    fr: {
      name: "L'Hydre",
      version: "Serpent mortel",
      text: [
        {
          title: "ATTENTION AUX DENTS",
          description:
            "Chaque fois que ce personnage subit des dommages, choisissez un personnage adverse et infligez-lui le même nombre de dommages.",
        },
      ],
    },
    it: {
      name: "Idra",
      version: "Serpente Letale",
      text: [
        {
          title: "ATTENTO AI DENTI",
          description:
            "Ogni volta che questo personaggio subisce danno, infliggine lo stesso ammontare a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 108,
  rarity: "legendary",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f9025821a35c4cea9fd04182f7db5896",
    tcgPlayer: 539088,
  },
  text: [
    {
      title: "WATCH THE TEETH",
      description:
        "Whenever this character is dealt damage, deal that much damage to chosen opposing character.",
    },
  ],
  classifications: ["Storyborn"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
