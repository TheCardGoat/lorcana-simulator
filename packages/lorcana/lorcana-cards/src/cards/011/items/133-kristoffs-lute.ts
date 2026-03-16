import type { ItemCard } from "@tcg/lorcana-types";

export const kristoffsLute: ItemCard = {
  id: "NgK",
  canonicalId: "ci_NgK",
  reprints: ["set11-133"],
  cardType: "item",
  name: "Kristoff's Lute",
  i18n: {
    en: {
      name: "Kristoff's Lute",
      text: [
        {
          title: "MOMENT OF INSPIRATION",
          description:
            "{E}, 2 {I} — Reveal the top card of your deck. You may play it as if it were in your hand. Otherwise, put it in your discard.",
        },
      ],
    },
    de: {
      name: "Kristoffs Laute",
      text: [
        {
          title: "MOMENT DER INSPIRATION, 2",
          description:
            "— Decke die oberste Karte deines Decks auf. Du darfst sie ausspielen, als wäre sie auf deiner Hand. Wenn du dies nicht tust, lege die Karte auf deinen Ablagestapel.",
        },
      ],
    },
    fr: {
      name: "Luth de Kristoff",
      text: [
        {
          title: "MOMENT D'INSPIRATION, 2",
          description:
            "— Révélez la carte du dessus de votre pioche. Vous pouvez la jouer comme si elle était dans votre main. Sinon, placez-la dans votre défausse.",
        },
      ],
    },
    it: {
      name: "Liuto di Kristoff",
      text: [
        {
          title: "MOMENTO DI ISPIRAZIONE, 2",
          description:
            "— Rivela la prima carta del tuo mazzo. Puoi giocarla come se fosse nella tua mano. Altrimenti, mettila nei tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 133,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_ec94f5c4a31b40c99f5b421ac7dd3acf",
    tcgPlayer: 675510,
  },
  text: [
    {
      title: "MOMENT OF INSPIRATION",
      description:
        "{E}, 2 {I} — Reveal the top card of your deck. You may play it as if it were in your hand. Otherwise, put it in your discard.",
    },
  ],
  abilities: [
    {
      id: "ycf-1",
      name: "MOMENT OF INSPIRATION",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "or",
            chooser: "CONTROLLER",
            options: [
              {
                type: "play-card",
                from: "revealed",
                target: "CONTROLLER",
              },
              {
                type: "mill",
                amount: 1,
                target: "CONTROLLER",
              },
            ],
          },
        ],
      },
      type: "activated",
      text: "MOMENT OF INSPIRATION {E}, 2 {I} - Reveal the top card of your deck. You may play it as if it were in your hand. Otherwise, put it in your discard.",
    },
  ],
};
