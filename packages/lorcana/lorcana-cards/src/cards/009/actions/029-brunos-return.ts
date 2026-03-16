import type { ActionCard } from "@tcg/lorcana-types";

export const brunosReturn: ActionCard = {
  id: "c1X",
  canonicalId: "ci_RJP",
  reprints: ["set4-026", "set9-029"],
  cardType: "action",
  name: "Bruno's Return",
  i18n: {
    en: {
      name: "Bruno's Return",
      text: "Return a character card from your discard to your hand. You may remove up to 2 damage from chosen character.",
    },
    de: {
      name: "Brunos Rückkehr",
      text: "Nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand. Entferne danach bis zu 2 Schaden von einem Charakter deiner Wahl.",
    },
    fr: {
      name: "Retour de Bruno",
      text: "Reprenez en main une carte Personnage de votre défausse. Puis choisissez un personnage et retirez-lui jusqu'à 2 jetons Dommage.",
    },
    it: {
      name: "Il Ritorno di Bruno",
      text: "Riprendi in mano una carta personaggio dai tuoi scarti. Poi rimuovi fino a 2 danni da un personaggio a tua scelta.",
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 29,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_abc3f1da50d04f768b1181878b17f8da",
    tcgPlayer: 649976,
  },
  text: "Return a character card from your discard to your hand. You may remove up to 2 damage from chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "return-to-hand",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["discard"],
              cardTypes: ["character"],
            },
          },
          {
            type: "remove-damage",
            amount: 2,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
    },
  ],
};
