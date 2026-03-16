import type { ActionCard } from "@tcg/lorcana-types";

export const wrongLeverEnchanted: ActionCard = {
  id: "Um9",
  canonicalId: "ci_M7a",
  reprints: ["set8-116"],
  cardType: "action",
  name: "Wrong Lever!",
  i18n: {
    en: {
      name: "Wrong Lever!",
      text: "Choose one:\n- Return chosen character to their player's hand.\n- Put a card named Pull the Lever! from your discard on the bottom of your deck to put chosen character on the bottom of their player's deck.",
    },
    de: {
      name: "Das war der Falsche!",
      text: "Wähle eine Möglichkeit aus: • Schicke einen Charakter deiner Wahl auf die zugehörige Hand zurück. • Lege eine Zieh-den-Hebel!-Karte aus deinem Ablagestapel unter dein Deck, um einen Charakter deiner Wahl unter das zugehörige Deck zu legen.",
    },
    fr: {
      name: "Pas ce levier-là !",
      text: "Choisissez entre: • Choisissez un personnage et renvoyez-le dans la main de son propriétaire. • Placez une carte nommée Abaisse le levier! de votre défausse sous votre pioche pour choisir un personnage et le placer sous la pioche de son propriétaire.",
    },
    it: {
      name: "L'Altra Leva!",
      text: "Scegli uno: • Fai riprendere in mano al suo giocatore un personaggio a tua scelta. • Metti una carta chiamata Abbassa la Leva! dai tuoi scarti in fondo al tuo mazzo per mettere un personaggio a tua scelta in fondo al mazzo del suo giocatore.",
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 216,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_a209d31e37bc44e78b2f56cf474bde5d",
    tcgPlayer: 631988,
  },
  text: "Choose one:\n- Return chosen character to their player's hand.\n- Put a card named Pull the Lever! from your discard on the bottom of your deck to put chosen character on the bottom of their player's deck.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "return-to-hand",
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "sequence",
            steps: [
              {
                type: "put-on-bottom",
                target: {
                  selector: "all",
                  count: "all",
                  owner: "you",
                  zones: ["discard"],
                  cardTypes: ["action"],
                  filter: [
                    {
                      type: "has-name",
                      name: "Pull the Lever!",
                    },
                  ],
                },
              },
              {
                type: "conditional",
                condition: {
                  type: "if-you-do",
                },
                then: {
                  type: "put-on-bottom",
                  target: {
                    selector: "chosen",
                    count: 1,
                    owner: "any",
                    zones: ["play"],
                    cardTypes: ["character"],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
