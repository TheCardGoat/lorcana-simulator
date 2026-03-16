import type { CharacterCard } from "@tcg/lorcana-types";

export const geniePowersUnleashed: CharacterCard = {
  id: "Mpt",
  canonicalId: "ci_Mpt",
  reprints: ["set1-076"],
  cardType: "character",
  name: "Genie",
  version: "Powers Unleashed",
  i18n: {
    en: {
      name: "Genie",
      version: "Powers Unleashed",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "Evasive",
        },
        {
          title: "PHENOMENAL COSMIC POWER!",
          description:
            "Whenever this character quests, you may play an action with cost 5 or less for free.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Entfesselte Energie",
      text: "Gestaltwandel 6 Wendig KOSMISCHE KRÄFTE! Jedes Mal, wenn dieser Charakter erkundet, darfst du eine Aktion, die 5 oder weniger kostet, kostenlos ausspielen.",
    },
    fr: {
      name: "Génie",
      version: "Déchaîne ses pouvoirs",
      text: "Alter 6 Insaisissable POUVOIR COSMIQUE PHÉNOMÉNAL! Lorsque ce personnage est envoyé à l'aventure, vous pouvez jouer gratuitement une carte action coûtant 5 ou moins.",
    },
    it: {
      name: "Genie",
      version: "Powers Unleashed",
      text: [
        {
          title: "Shift 6",
          description:
            "(You may pay 6 to play this on top of one of your characters named Genie.) Evasive (Only characters with Evasive can challenge this character.) PHENOMENAL COSMIC POWER! Whenever this character quests, you may play an action with cost 5 or less for free.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 76,
  rarity: "rare",
  cost: 8,
  strength: 3,
  willpower: 5,
  lore: 3,
  inkable: false,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_976b70e13c194a6f8b955d7ea5307bbc",
    tcgPlayer: 508766,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "Evasive",
    },
    {
      title: "PHENOMENAL COSMIC POWER!",
      description:
        "Whenever this character quests, you may play an action with cost 5 or less for free.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 5,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "dgz-1",
      text: "**Shift** 6 (_You may pay 6 {I} to play this on top of one of your characters named Genie._)\n\n**Evasive** _(Only characters with Evasive can challenge this character.)_\n\n**PHENOMENAL COSMIC POWER** Whenever this character quests, you may play an action with cost 5 or less for free.",
      type: "action",
    },
  ],
};
