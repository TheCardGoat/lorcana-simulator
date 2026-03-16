import type { CharacterCard } from "@tcg/lorcana-types";

export const palaceGuardSpectralSentry: CharacterCard = {
  id: "APE",
  canonicalId: "ci_APE",
  reprints: ["set8-045"],
  cardType: "character",
  name: "Palace Guard",
  version: "Spectral Sentry",
  i18n: {
    en: {
      name: "Palace Guard",
      version: "Spectral Sentry",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
      ],
    },
    de: {
      name: "Palastwache",
      version: "Spektraler Wächter",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.)",
        },
      ],
    },
    fr: {
      name: "Garde du palais",
      version: "Sentinelle spectrale",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.)",
        },
      ],
    },
    it: {
      name: "Guardia di Palazzo",
      version: "Sentinella Spettrale",
      text: [
        {
          title: "Svanire",
          description: "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 45,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d4c1ddfeea1142b192f7e289c5bb880d",
    tcgPlayer: 631336,
  },
  text: [
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Illusion"],
  abilities: [
    {
      id: "1v0-1",
      keyword: "Vanish",
      type: "keyword",
      text: "Vanish",
    },
  ],
};
