import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoGiantSpectralParrot: CharacterCard = {
  id: "vao",
  canonicalId: "ci_vao",
  reprints: ["set7-049"],
  cardType: "character",
  name: "Iago",
  version: "Giant Spectral Parrot",
  i18n: {
    en: {
      name: "Iago",
      version: "Giant Spectral Parrot",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
      ],
    },
    de: {
      name: "Jago",
      version: "Riesiger spektraler Papagei",
      text: [
        {
          title: "Wendig Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.)",
        },
      ],
    },
    fr: {
      name: "Iago",
      version: "Gigantesque perroquet spectral",
      text: [
        {
          title: "Insaisissable Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.)",
        },
      ],
    },
    it: {
      name: "Iago",
      version: "Pappagallo Spettrale Gigante",
      text: [
        {
          title: "Sfuggente Svanire",
          description: "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 49,
  rarity: "rare",
  cost: 4,
  strength: 4,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9510a7439adc4dc5b1f444e37334a32e",
    tcgPlayer: 618171,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Illusion"],
  abilities: [
    {
      id: "145-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "145-2",
      keyword: "Vanish",
      type: "keyword",
      text: "Vanish",
    },
  ],
};
