import type { ActionCard } from "@tcg/lorcana-types";

export const heffalumpsAndWoozles: ActionCard = {
  id: "Iby",
  canonicalId: "ci_Iby",
  reprints: ["set6-095"],
  cardType: "action",
  name: "Heffalumps and Woozles",
  i18n: {
    en: {
      name: "Heffalumps and Woozles",
      text: "Chosen opposing character can't quest during their next turn. Draw a card.",
    },
    de: {
      name: "Heffalumps und Wusel",
      text: "Ein gegnerischer Charakter deiner Wahl kann in seinem nächsten Zug nicht erkunden. Ziehe 1 Karte.",
    },
    fr: {
      name: "Éfélants et Nouifs",
      text: "Choisissez un personnage adverse qui ne peut pas être envoyé à l'aventure durant son prochain tour. Piochez une carte.",
    },
    it: {
      name: "Efelanti e Noddole",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio avversario a tua scelta non può andare all'avventura durante il suo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 95,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b87dd2f01e364f679975158dd2637a6d",
    tcgPlayer: 587355,
  },
  text: "Chosen opposing character can't quest during their next turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "next-turn",
            restriction: "cant-quest",
            target: {
              selector: "chosen",
              count: {
                upTo: 1,
              },
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "restriction",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "10y-1",
      text: "Chosen opposing character can't quest during their next turn. Draw a card.",
      type: "action",
    },
  ],
};
