import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookCaptainOfTheJollyRoger: CharacterCard = {
  id: "svs",
  canonicalId: "ci_0AT",
  reprints: ["set1-173", "set9-190"],
  cardType: "character",
  name: "Captain Hook",
  version: "Captain of the Jolly Roger",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Captain of the Jolly Roger",
      text: [
        {
          title: "DOUBLE THE POWDER!",
          description:
            "When you play this character, you may return an action card named Fire the Cannons! from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "Kapitän der Jolly Roger",
      text: [
        {
          title: "DOPPELTE LADUNG!",
          description:
            'Wenn du diesen Charakter ausspielst, darfst du 1 "Feuert die Kanonen!"-Aktionskarte aus deinem Ablagestapel zurück auf deine Hand nehmen.',
        },
      ],
    },
    fr: {
      name: "CAPITAINE CROCHET",
      version: "Capitaine du Jolly Roger",
      text: [
        {
          title: "DOUBLEZ LES CHARGES!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez reprendre en main une carte action ALLUMEZ LES MÊCHES! de votre défausse.",
        },
      ],
    },
    it: {
      name: "Captain Hook",
      version: "Captain of the Jolly Roger",
      text: [
        {
          title: "DOUBLE THE POWDER!",
          description:
            "When you play this character, you may return an action card named Fire the Cannons! from your discard to your hand.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 173,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_79c990fe5bf14f4bbd075b6f80ad4290",
    tcgPlayer: 650123,
  },
  text: [
    {
      title: "DOUBLE THE POWDER!",
      description:
        "When you play this character, you may return an action card named Fire the Cannons! from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      id: "1d2-1",
      text: "DOUBLE THE POWDER! When you play this character, you may return an action card named Fire the Cannons! from your discard to your hand.",
      name: "DOUBLE THE POWDER!",
      effect: {
        effect: {
          cardName: "Fire the Cannons!",
          cardType: "action",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
