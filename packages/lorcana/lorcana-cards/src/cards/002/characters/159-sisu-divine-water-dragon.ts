import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuDivineWaterDragon: CharacterCard = {
  id: "GZk",
  canonicalId: "ci_mTe",
  reprints: ["set2-159"],
  cardType: "character",
  name: "Sisu",
  version: "Divine Water Dragon",
  i18n: {
    en: {
      name: "Sisu",
      version: "Divine Water Dragon",
      text: [
        {
          title: "I TRUST YOU",
          description:
            "Whenever this character quests, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Sisu",
      version: "Göttlicher Wasserdrache",
      text: [
        {
          title: "ICH VERTRAUE DIR",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, schaue dir die obersten 2 Karten deines Decks an. Du darfst 1 davon auf deine Hand nehmen. Lege den Rest in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Sisu",
      version: "Dragon d'eau divin",
      text: [
        {
          title: "J'AI CONFIANCE EN TOI",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, regardez les 2 premières cartes de votre pioche, vous pouvez ajouter l'une d'elles à votre main. Remettez le reste sous votre pioche dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Sisu",
      version: "Divine Water Dragon",
      text: [
        {
          title: "I TRUST YOU",
          description:
            "Whenever this character quests, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 159,
  rarity: "legendary",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f9edf9a591974716b2d7f02764f93737",
    tcgPlayer: 528112,
  },
  text: [
    {
      title: "I TRUST YOU",
      description:
        "Whenever this character quests, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "rwp-1",
      name: "I TRUST YOU",
      text: "I TRUST YOU Whenever this character quests, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
