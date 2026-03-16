import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphBackSeatDriver: CharacterCard = {
  id: "mFI",
  canonicalId: "ci_mFI",
  reprints: ["set8-135"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Back Seat Driver",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Back Seat Driver",
      text: [
        {
          title: "CHARGED UP",
          description:
            "When you play this character, chosen Racer character gets +4 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Rücksitzfahrer",
      text: [
        {
          title: "AUFGELADEN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Rennfahrer deiner Wahl in diesem Zug +4.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "Copilote envahissant",
      text: [
        {
          title: "CHARGÉ À BLOC",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Pilote qui gagne +4 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Passeggero Invadente",
      text: [
        {
          title: "CARICO",
          description:
            "Quando giochi questo personaggio, un personaggio Pilota a tua scelta riceve +4 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 135,
  rarity: "rare",
  cost: 3,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9eeb0424b962449d8a91e3ff5487e96c",
    tcgPlayer: 631692,
  },
  text: [
    {
      title: "CHARGED UP",
      description: "When you play this character, chosen Racer character gets +4 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Racer"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 4,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1ce-1",
      name: "CHARGED UP",
      text: "CHARGED UP When you play this character, chosen Racer character gets +4 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
