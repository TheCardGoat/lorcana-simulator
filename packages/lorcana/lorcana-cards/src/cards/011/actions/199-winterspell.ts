import type { ActionCard } from "@tcg/lorcana-types";

export const winterspell: ActionCard = {
  id: "5Yu",
  canonicalId: "ci_5Yu",
  reprints: ["set11-199"],
  cardType: "action",
  name: "Winterspell",
  i18n: {
    en: {
      name: "Winterspell",
      text: "Chosen location of yours can't be challenged until the start of your next turn. Draw a card.",
    },
    de: {
      name: "Winterzauber",
      text: "Wähle einen deiner Orte. Jener kann bis zu Beginn deines nächsten Zuges nicht herausgefordert werden. Ziehe 1 Karte.",
    },
    fr: {
      name: "Givresort",
      text: "Choisissez l'un de vos lieux qui ne peut pas être défié jusqu'au début de votre prochain tour. Piochez une carte.",
    },
    it: {
      name: "Incanto d'Inverno",
      text: "Un tuo luogo a tua scelta non può essere sfidato fino all'inizio del tuo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "011",
  cardNumber: 199,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e3ec107e64e498ca64d1a4de4e6abb9",
    tcgPlayer: 673357,
  },
  text: "Chosen location of yours can't be challenged until the start of your next turn. Draw a card.",
  abilities: [
    {
      id: "ok8-1",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "restriction",
            restriction: "cant-be-challenged",
            duration: "until-start-of-next-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["location"],
            },
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
      },
      type: "action",
      text: "Chosen location of yours can’t be challenged until the start of your next turn. Draw a card.",
    },
  ],
};
