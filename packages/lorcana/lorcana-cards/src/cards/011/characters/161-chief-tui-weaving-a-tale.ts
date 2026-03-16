import type { CharacterCard } from "@tcg/lorcana-types";

export const chiefTuiWeavingATale: CharacterCard = {
  id: "qN1",
  canonicalId: "ci_qN1",
  reprints: ["set11-161"],
  cardType: "character",
  name: "Chief Tui",
  version: "Weaving a Tale",
  i18n: {
    en: {
      name: "Chief Tui",
      version: "Weaving a Tale",
      text: [
        {
          title: "AND THEN...",
          description:
            "Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Tui",
      version: "Webt eine Geschichte",
      text: [
        {
          title: "UND DANN...",
          description:
            "Einmal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, schaue dir die oberste Karte deines Decks an. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Tui",
      version: "Brode une histoire",
      text: [
        {
          title: "ET ENSUITE...",
          description:
            "Une fois durant votre tour, lorsqu'une carte est placée dans votre réserve d'encre, regardez la carte du dessus de votre pioche. Placez-la sur ou sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Capo Tui",
      version: "Tessitore di Racconti",
      text: [
        {
          title: "E POI...",
          description:
            "Una volta durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, guarda la prima carta del tuo mazzo. Puoi metterla in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "011",
  cardNumber: 161,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1bd99dad44d341dda6d1f73ffb2bc529",
    tcgPlayer: 676227,
  },
  text: [
    {
      title: "AND THEN...",
      description:
        "Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "King"],
  abilities: [
    {
      id: "1om-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      type: "action",
      text: "AND THEN... Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.",
    },
  ],
};
