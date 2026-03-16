import type { CharacterCard } from "@tcg/lorcana-types";

export const dawsonPuzzlingSleuth: CharacterCard = {
  id: "RK6",
  canonicalId: "ci_RK6",
  reprints: ["set7-161"],
  cardType: "character",
  name: "Dawson",
  version: "Puzzling Sleuth",
  i18n: {
    en: {
      name: "Dawson",
      version: "Puzzling Sleuth",
      text: [
        {
          title: "BE SENSIBLE",
          description:
            "Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Dr. David Wasdenn",
      version: "Grübelnder Detektiv",
      text: [
        {
          title: "SEI VERNÜNFTIG",
          description:
            "Einmal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, schaue dir die oberste Karte deines Decks an. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Dawson",
      version: "Détective énigmatique",
      text: [
        {
          title: "FAIRE PREUVE DE DISCERNEMENT",
          description:
            "Une seule fois durant votre tour, lorsqu'une carte est placée dans votre réserve d'encre, regardez la carte du dessus de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Topson",
      version: "Investigatore Perplesso",
      text: [
        {
          title: "SIA RAGIONEVOLE",
          description:
            "Una volta durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, guarda la prima carta del tuo mazzo. Puoi metterla in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "007",
  cardNumber: 161,
  rarity: "rare",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_9fcd1bf3255d48ecb5f16b78512c01bb",
    tcgPlayer: 619499,
  },
  text: [
    {
      title: "BE SENSIBLE",
      description:
        "Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Detective"],
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
      id: "1t5-1",
      name: "BE SENSIBLE Once",
      text: "BE SENSIBLE Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
