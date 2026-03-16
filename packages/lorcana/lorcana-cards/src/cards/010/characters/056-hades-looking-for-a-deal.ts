import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesLookingForADeal: CharacterCard = {
  id: "bDq",
  canonicalId: "ci_yoK",
  reprints: ["set10-056"],
  cardType: "character",
  name: "Hades",
  version: "Looking for a Deal",
  i18n: {
    en: {
      name: "Hades",
      version: "Looking for a Deal",
      text: [
        {
          title: "WHAT D'YA SAY?",
          description:
            "When you play this character, you may choose an opposing character. If you do, draw 2 cards unless that character's player puts that card on the bottom of their deck.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Möchte ein Geschäft abschließen",
      text: [
        {
          title: "NA, WAS SAGST DU?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen gegnerischen Charakter wählen. Wenn du dies tust, ziehe 2 Karten, außer die Person, die den gewählten Charakter im Spiel hat, legt ihn unter ihr Deck.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Cherchant un accord",
      text: [
        {
          title: "ON S'LA SERRE?",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse. Si vous le faites, piochez 2 cartes sauf si son propriétaire place cette carte sous sa pioche.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "In Cerca di un Affare",
      text: [
        {
          title: "UNA STRETTA DI MANO?",
          description:
            "Quando giochi questo personaggio, puoi scegliere un personaggio avversario. Se lo fai, pesca 2 carte a meno che il giocatore di quel personaggio non metta quella carta in fondo al suo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 56,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4656262d1cbc478aab92978dc7729663",
    tcgPlayer: 657889,
  },
  text: [
    {
      title: "WHAT D'YA SAY?",
      description:
        "When you play this character, you may choose an opposing character. If you do, draw 2 cards unless that character's player puts that card on the bottom of their deck.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        steps: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "qkg-1",
      name: "WHAT D'YA SAY?",
      text: "WHAT D'YA SAY? When you play this character, you may choose an opposing character. If you do, draw 2 cards unless that character’s player puts that card on the bottom of their deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
