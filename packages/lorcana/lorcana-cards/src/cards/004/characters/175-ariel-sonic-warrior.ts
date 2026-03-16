import type { CharacterCard } from "@tcg/lorcana-types";

export const arielSonicWarrior: CharacterCard = {
  id: "S0Z",
  canonicalId: "ci_8ZB",
  reprints: ["set4-175", "set9-195"],
  cardType: "character",
  name: "Ariel",
  version: "Sonic Warrior",
  i18n: {
    en: {
      name: "Ariel",
      version: "Sonic Warrior",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "AMPLIFIED VOICE",
          description:
            "Whenever you play a song, you may pay 2 {I} to deal 3 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Schall-Kriegerin",
      text: "Gestaltwandel 4 VERSTÄRKTE STIMME Jedes Mal, wenn du ein Lied ausspielst, darfst du 2 bezahlen, um einem Charakter deiner Wahl 3 Schaden zuzufügen.",
    },
    fr: {
      name: "Ariel",
      version: "Guerrière sonique",
      text: "Alter 4 VOIX AMPLIFIÉE Chaque fois que vous jouez une chanson, vous pouvez payer 2 pour choisir un personnage et lui infliger 3 dommages.",
    },
    it: {
      name: "Ariel",
      version: "Guerriera Sonica",
      text: "Trasformazione 4 VOCE AMPLIFICATA Ogni volta che giochi una canzone, puoi pagare 2 per infliggere 3 danni a un personaggio a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 175,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8744600f576e484fa2e93cec672eba2f",
    tcgPlayer: 650128,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "AMPLIFIED VOICE",
      description:
        "Whenever you play a song, you may pay 2 {I} to deal 3 damage to chosen character.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "tfb-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "tfb-2",
      name: "AMPLIFIED VOICE",
      text: "AMPLIFIED VOICE Whenever you play a song, you may pay 2 {I} to deal 3 damage to chosen character.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
