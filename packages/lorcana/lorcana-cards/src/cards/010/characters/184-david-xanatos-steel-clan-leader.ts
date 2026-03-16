import type { CharacterCard } from "@tcg/lorcana-types";

export const davidXanatosSteelClanLeader: CharacterCard = {
  id: "FZS",
  canonicalId: "ci_FZS",
  reprints: ["set10-184"],
  cardType: "character",
  name: "David Xanatos",
  version: "Steel Clan Leader",
  i18n: {
    en: {
      name: "David Xanatos",
      version: "Steel Clan Leader",
      text: [
        {
          title: "MINOR INCONVENIENCE",
          description:
            "When you play this character, you may choose and discard a card to deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "David Xanatos",
      version: "Stahl-Clan-Anführer",
      text: [
        {
          title: "KLEINE UNANNEHMLICHKEIT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du eine Karte von deiner Hand auswählen und abwerfen, um einem Charakter deiner Wahl 2 Schaden zuzufügen.",
        },
      ],
    },
    fr: {
      name: "David Xanatos",
      version: "Leader du Clan d'Acier",
      text: [
        {
          title: "PETIT DÉSAGRÉMENT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez défausser une carte pour choisir un personnage et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "David Xanatos",
      version: "Leader del Clan d'Acciaio",
      text: [
        {
          title: "PICCOLO INCONVENIENTE",
          description:
            "Quando giochi questo personaggio, puoi scegliere e scartare una carta per infliggere 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 184,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_af2df57fb8c4408f9bf4e1358f6cac30",
    tcgPlayer: 658502,
  },
  text: [
    {
      title: "MINOR INCONVENIENCE",
      description:
        "When you play this character, you may choose and discard a card to deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
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
      id: "xa7-1",
      name: "MINOR INCONVENIENCE",
      text: "MINOR INCONVENIENCE When you play this character, you may choose and discard a card to deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
