import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaIceSurfer: CharacterCard = {
  id: "zCK",
  canonicalId: "ci_zCK",
  reprints: ["set1-109"],
  cardType: "character",
  name: "Elsa",
  version: "Ice Surfer",
  i18n: {
    en: {
      name: "Elsa",
      version: "Ice Surfer",
      text: [
        {
          title: "THAT'S NO BLIZZARD",
          description:
            "Whenever you play a character named Anna, ready this character. This character can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Eissurferin",
      text: [
        {
          title: "DAS IST KEIN SCHNEESTURM",
          description:
            "Jedes Mal, wenn du einen Anna-Charakter ausspielst, mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "ELSA",
      version: "Surfeuse des glaces",
      text: [
        {
          title: "ÇA N'EST PAS UN BLIZZARD",
          description:
            "Lorsque vous jouez un personnage Anna, redressez ce personnage. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Surfista sul Ghiaccio",
      text: [
        {
          title: "QUELLA NON È UNA TEMPESTA",
          description:
            "Ogni volta che giochi un personaggio chiamato Anna, prepara questo personaggio. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 109,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4dff89f588a5466097978e9889eef559",
    tcgPlayer: 507482,
  },
  text: [
    {
      title: "THAT'S NO BLIZZARD",
      description:
        "Whenever you play a character named Anna, ready this character. This character can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "zCK-1",
      name: "THAT'S NO BLIZZARD",
      text: "THAT'S NO BLIZZARD Whenever you play a character named Anna, ready this character. This character can't quest for the rest of this turn.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "trigger-subject",
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Anna",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "sequence",
          steps: [
            {
              type: "ready",
              target: "SELF",
            },
            {
              type: "restriction",
              duration: "this-turn",
              restriction: "cant-quest",
              target: "SELF",
            },
          ],
        },
      },
    },
  ],
};
