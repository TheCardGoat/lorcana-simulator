import type { CharacterCard } from "@tcg/lorcana-types";

export const rajahGhostlyTiger: CharacterCard = {
  id: "yQ2",
  canonicalId: "ci_yQ2",
  reprints: ["set7-062"],
  cardType: "character",
  name: "Rajah",
  version: "Ghostly Tiger",
  i18n: {
    en: {
      name: "Rajah",
      version: "Ghostly Tiger",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
      ],
    },
    de: {
      name: "Radsha",
      version: "Geisterhafter Tiger",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.)",
        },
      ],
    },
    fr: {
      name: "Rajah",
      version: "Tigre fantomatique",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.)",
        },
      ],
    },
    it: {
      name: "Rajah",
      version: "Tigre Spettrale",
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
  set: "007",
  cardNumber: 62,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_85bc31bc75a34ebcbcfc164e701ae6ef",
    tcgPlayer: 618172,
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
      id: "1ba-1",
      keyword: "Vanish",
      type: "keyword",
      text: "Vanish",
    },
  ],
};
