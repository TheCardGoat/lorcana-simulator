import type { CharacterCard } from "@tcg/lorcana-types";

export const abuIllusoryPachyderm: CharacterCard = {
  id: "Ath",
  canonicalId: "ci_Ath",
  reprints: ["set8-050"],
  cardType: "character",
  name: "Abu",
  version: "Illusory Pachyderm",
  i18n: {
    en: {
      name: "Abu",
      version: "Illusory Pachyderm",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
        {
          title: "GRASPING TRUNK",
          description:
            "Whenever this character quests, gain lore equal to the {L} of chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Abu",
      version: "Illusionärer Dickhäuter",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.) GREIFENDER RÜSSEL Jedes Mal, wenn dieser Charakter erkundet, darfst du einen gegnerischen Charakter auswählen. Sammle so viele Legenden, wie sein -Wert beträgt.",
        },
      ],
    },
    fr: {
      name: "Abu",
      version: "Apparition pachydermique",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.) TROMPE PRÉHENSILE chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse et gagnez autant d'éclats de Lore que son.",
        },
      ],
    },
    it: {
      name: "Abu",
      version: "Pachiderma Illusorio",
      text: [
        {
          title: "Svanire",
          description:
            "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.) PROBOSCIDE AFFERRANTE Ogni volta che questo personaggio va all'avventura, ottieni leggenda pari al di un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 50,
  rarity: "uncommon",
  cost: 6,
  strength: 3,
  willpower: 7,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_befc74dca10e458ba4a71a1f4ac05e7e",
    tcgPlayer: 631384,
  },
  text: [
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
    {
      title: "GRASPING TRUNK",
      description:
        "Whenever this character quests, gain lore equal to the {L} of chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Illusion"],
  abilities: [],
};
