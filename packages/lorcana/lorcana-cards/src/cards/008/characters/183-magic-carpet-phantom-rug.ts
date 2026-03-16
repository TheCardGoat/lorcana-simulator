import type { CharacterCard } from "@tcg/lorcana-types";

export const magicCarpetPhantomRug: CharacterCard = {
  id: "a00",
  canonicalId: "ci_a00",
  reprints: ["set8-183"],
  cardType: "character",
  name: "Magic Carpet",
  version: "Phantom Rug",
  i18n: {
    en: {
      name: "Magic Carpet",
      version: "Phantom Rug",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
        {
          title: "SPECTRAL FORCE",
          description:
            "Your other Illusion characters gain Challenger +1. (They get +1 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Fliegender Teppich",
      version: "Phantomteppich",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.) SPEKTRALE KRAFT Deine anderen Illusionen erhalten Herausfordern +1. (Während sie herausfordern, erhalten sie +1.)",
        },
      ],
    },
    fr: {
      name: "Tapis Volant",
      version: "Apparition tapissière",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.) FORCE SPECTRALE Vos autres personnages Illusion gagnent Offensif +1. (Lorsqu'ils défient, ces personnages gagnent +1.)",
        },
      ],
    },
    it: {
      name: "Tappeto Magico",
      version: "Zerbino Fantasma",
      text: [
        {
          title: "Svanire",
          description:
            "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.) FORZA SPETTRALE I tuoi altri personaggi Illusione ottengono Sfidante +1. (Ricevono +1 mentre stanno sfidando.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 183,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bbeb5ead52854a1d869e7e449dc6aee7",
    tcgPlayer: 631472,
  },
  text: [
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
    {
      title: "SPECTRAL FORCE",
      description:
        "Your other Illusion characters gain Challenger +1. (They get +1 {S} while challenging.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Illusion"],
  abilities: [
    {
      id: "3wd-1",
      keyword: "Vanish",
      text: "Vanish",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Challenger",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "3wd-2",
      name: "SPECTRAL FORCE Your other Illusion",
      text: "SPECTRAL FORCE Your other Illusion characters gain Challenger +1.",
      type: "static",
    },
  ],
};
