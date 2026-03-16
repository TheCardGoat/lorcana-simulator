import type { CharacterCard } from "@tcg/lorcana-types";

export const rafikiMysticalFighter: CharacterCard = {
  id: "MwD",
  canonicalId: "ci_s33",
  reprints: ["set3-054", "set9-036"],
  cardType: "character",
  name: "Rafiki",
  version: "Mystical Fighter",
  i18n: {
    en: {
      name: "Rafiki",
      version: "Mystical Fighter",
      text: [
        {
          title: "Challenger +3",
        },
        {
          title: "ANCIENT SKILLS",
          description:
            "Whenever he challenges a Hyena character, this character takes no damage from the challenge.",
        },
      ],
    },
    de: {
      name: "Rafiki",
      version: "Mystischer Kämpfer",
      text: "Herausfordern +3 URALTE KENNTNISSE Dieser Charakter erhält keinen Schaden durch Herausforderungen, während er eine Hyäne herausfordert.",
    },
    fr: {
      name: "Rafiki",
      version: "Combattant mystique",
      text: "Offensif +3 TALENT ANCESTRAL Lorsque ce personnage défie un personnage Hyène, il ne subit aucun dommage pour ce défi.",
    },
    it: {
      name: "Rafiki",
      version: "Combattente Mistico",
      text: "Sfidante +3 ANTICHE ABILITÀ Ogni volta che sfida un personaggio Iena, questo personaggio non subisce danni dalla sfida.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 36,
  rarity: "rare",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f0b125bab638401e834b91dc4577a894",
    tcgPlayer: 649983,
  },
  text: [
    {
      title: "Challenger +3",
    },
    {
      title: "ANCIENT SKILLS",
      description:
        "Whenever he challenges a Hyena character, this character takes no damage from the challenge.",
    },
  ],
  classifications: ["Dreamborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "w1t-1",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
    {
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
      id: "w1t-2",
      name: "ANCIENT SKILLS",
      text: "ANCIENT SKILLS Whenever he challenges a Hyena character, this character takes no damage from the challenge.",
      trigger: {
        defender: {
          filters: [
            {
              type: "has-classification",
              classification: "Hyena",
            },
          ],
        },
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
