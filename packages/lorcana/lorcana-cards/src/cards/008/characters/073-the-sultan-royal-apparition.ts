import type { CharacterCard } from "@tcg/lorcana-types";

export const theSultanRoyalApparition: CharacterCard = {
  id: "m6L",
  canonicalId: "ci_m6L",
  reprints: ["set8-073"],
  cardType: "character",
  name: "The Sultan",
  version: "Royal Apparition",
  i18n: {
    en: {
      name: "The Sultan",
      version: "Royal Apparition",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
        {
          title: "COMMANDING PRESENCE",
          description:
            "Whenever one of your Illusion characters quests, exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Der Sultan",
      version: "Königliche Erscheinung",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.) SOUVERÄNE PRÄSENZ Jedes Mal, wenn eine deiner Illusionen erkundet, erschöpfe einen gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Le Sultan",
      version: "Apparition royale",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.) PRÉSENCE IMPÉRIEUSE Chaque fois que l'un de vos personnages Illusion est envoyé à l'aventure, choisissez un personnage adverse et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Il Sultano",
      version: "Apparizione Reale",
      text: [
        {
          title: "Svanire",
          description:
            "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.) PRESENZA AUTOREVOLE Ogni volta che uno dei tuoi personaggi Illusione va all'avventura, impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 73,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_34f916796e6844d081bdebaa3f7df182",
    tcgPlayer: 633425,
  },
  text: [
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
    {
      title: "COMMANDING PRESENCE",
      description:
        "Whenever one of your Illusion characters quests, exert chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "King", "Illusion"],
  abilities: [
    {
      id: "nun-1",
      keyword: "Vanish",
      text: "Vanish",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "nun-2",
      name: "COMMANDING PRESENCE",
      text: "COMMANDING PRESENCE Whenever one of your Illusion characters quests, exert chosen opposing character.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
