import type { CharacterCard } from "@tcg/lorcana-types";

export const drFacilierFortuneTeller: CharacterCard = {
  id: "WRE",
  canonicalId: "ci_WRE",
  reprints: ["set2-079"],
  cardType: "character",
  name: "Dr. Facilier",
  version: "Fortune Teller",
  i18n: {
    en: {
      name: "Dr. Facilier",
      version: "Fortune Teller",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "YOU'RE IN MY WORLD",
          description:
            "Whenever this character quests, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
    de: {
      name: "Dr. Facilier",
      version: "Wahrsager",
      text: "Wendig IHR SEID IN MEINER WELT Jedes Mal, wenn dieser Charakter erkundet, wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht erkunden.",
    },
    fr: {
      name: "Dr. Facilier",
      version: "Lit dans les cartes",
      text: "Insaisissable MON ROYAUME VOUS TEND LES BRAS Lorsque ce personnage est envoyé à l'aventure, choisissez un personnage adverse. Il ne peut pas être envoyé à l'aventure durant son prochain tour.",
    },
    it: {
      name: "Dr. Facilier",
      version: "Fortune Teller",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) YOU'RE IN MY WORLD Whenever this character quests, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Princess and the Frog",
  set: "002",
  cardNumber: 79,
  rarity: "common",
  cost: 7,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_d544feae1c8b4accae8e8f3d185380c4",
    tcgPlayer: 527745,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "YOU'RE IN MY WORLD",
      description:
        "Whenever this character quests, chosen opposing character can't quest during their next turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      id: "h8r-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "h8r-2",
      name: "YOU'RE IN MY WORLD",
      text: "YOU'RE IN MY WORLD Whenever this character quests, chosen opposing character can't quest during their next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
