import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaLeaderOfHeart: CharacterCard = {
  id: "rSb",
  canonicalId: "ci_rSb",
  reprints: ["set2-123"],
  cardType: "character",
  name: "Raya",
  version: "Leader of Heart",
  i18n: {
    en: {
      name: "Raya",
      version: "Leader of Heart",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "CHAMPION OF KUMANDRA",
          description:
            "Whenever this character challenges a damaged character, she takes no damage from the challenge.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Anführerin von Herz",
      text: "Gestaltwandel 4 CHAMPION VON KUMANDRA Dieser Charakter erhält keinen Schaden durch Herausforderungen, während er einen beschädigten Charakter herausfordert.",
    },
    fr: {
      name: "Raya",
      version: "Cheffe des Terres de Cœur",
      text: "Alter 4 CHAMPIONNE DE KUMANDRA Ce personnage ne subit aucun dommage lorsque qu'il défie un personnage blessé.",
    },
    it: {
      name: "Raya",
      version: "Leader of Heart",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Raya.) CHAMPION OF KUMANDRA Whenever this character challenges a damaged character, she takes no damage from the challenge.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 123,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5b613c1368aa4c94a43c012f9a73394e",
    tcgPlayer: 527530,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "CHAMPION OF KUMANDRA",
      description:
        "Whenever this character challenges a damaged character, she takes no damage from the challenge.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      id: "7bt-1",
      keyword: "Shift",
      type: "keyword",
      cost: {
        ink: 4,
      },
      text: "Shift 4",
    },
    {
      id: "7bt-2",
      name: "CHAMPION OF KUMANDRA",
      text: "CHAMPION OF KUMANDRA Whenever this character challenges a damaged character, she takes no damage from the challenge.",
      type: "triggered",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
        defender: {
          filters: [
            {
              type: "damaged",
            },
          ],
        },
      },
      effect: {
        duration: "this-turn",
        replacement: {
          consumeOnApply: true,
          eventKinds: ["challenge-damage"],
          targetRef: "source",
          type: "prevent-damage",
        },
        type: "create-replacement-effect",
      },
    },
  ],
};
