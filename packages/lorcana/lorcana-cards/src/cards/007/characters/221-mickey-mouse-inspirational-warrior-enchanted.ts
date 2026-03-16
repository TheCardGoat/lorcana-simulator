import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseInspirationalWarriorEnchanted: CharacterCard = {
  id: "Ss2",
  canonicalId: "ci_mDz",
  reprints: ["set7-200"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Inspirational Warrior",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Inspirational Warrior",
      text: [
        {
          title: "STIRRING SPIRIT",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may play a character for free.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Inspirierender Krieger",
      text: [
        {
          title: "MITREISSENDER GEIST",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einen Charakter kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Combattant exaltant",
      text: [
        {
          title: "INSPIRE LES FOULES",
          description:
            "Durant votre tour, chaque fois que ce personnage en bannit un autre via un défi, vous pouvez jouer un personnage gratuitement.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Guerriero Ispiratore",
      text: [
        {
          title: "SCUOTERE L'ANIMO",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi giocare un personaggio gratis.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "007",
  cardNumber: 221,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ec8ba95c2c20470ab00ef4f03c8db8ee",
    tcgPlayer: 619749,
  },
  text: [
    {
      title: "STIRRING SPIRIT",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may play a character for free.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "vri-1",
      name: "STIRRING SPIRIT",
      text: "STIRRING SPIRIT During your turn, whenever this character banishes another character in a challenge, you may play a character for free.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
