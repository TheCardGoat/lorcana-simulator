import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyMusketeerSwordsman: CharacterCard = {
  id: "PI2",
  canonicalId: "ci_PI2",
  reprints: ["set4-012"],
  cardType: "character",
  name: "Goofy",
  version: "Musketeer Swordsman",
  i18n: {
    en: {
      name: "Goofy",
      version: "Musketeer Swordsman",
      text: [
        {
          title: "EN GAWRSH!",
          description:
            "Whenever you play a character with Bodyguard, ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Musketier-Schwertkämpfer",
      text: [
        {
          title: "EN GAWRSH!",
          description:
            "Jedes Mal, wenn du einen Charakter mit Beschützen ausspielst, mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Dingo",
      version: "Mousquetaire épéiste",
      text: [
        {
          title: "EN GARDE, HYUCK!",
          description:
            "Chaque fois que vous jouez un personnage avec Rempart, redressez ce personnage-ci. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Pippo",
      version: "Spadaccino Moschettiere",
      text: [
        {
          title: "IN GWHARDIA!",
          description:
            "Ogni volta che giochi un personaggio con Guardiano, prepara questo personaggio. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 12,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_497f584c0a1d45e3aea9795cff7150df",
    tcgPlayer: 548549,
  },
  text: [
    {
      title: "EN GAWRSH!",
      description:
        "Whenever you play a character with Bodyguard, ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      effect: {
        steps: [
          {
            cardType: "character",
            from: "hand",
            type: "play-card",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1k3-1",
      name: "EN GAWRSH!",
      text: "EN GAWRSH! Whenever you play a character with Bodyguard, ready this character. He can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
