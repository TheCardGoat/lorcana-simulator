import type { ItemCard } from "@tcg/lorcana-types";

export const robinsBow: ItemCard = {
  id: "Ezk",
  canonicalId: "ci_Ezk",
  reprints: ["set3-098"],
  cardType: "item",
  name: "Robin's Bow",
  i18n: {
    en: {
      name: "Robin's Bow",
      text: [
        {
          title: "FOREST'S GIFT",
          description: "{E} — Deal 1 damage to chosen damaged character or location.",
        },
        {
          title: "A BIT OF A LARK",
          description:
            "Whenever a character of yours named Robin Hood quests, you may ready this item.",
        },
      ],
    },
    de: {
      name: "Robins Bogen",
      text: [
        {
          title: "GESCHENK DES WALDES",
          description:
            "— Füge einem beschädigten Charakter oder Ort deiner Wahl 1 Schaden zu. ICH FAND DAS EBEN GANZ LUSTIG Jedes Mal, wenn einer deiner Robin-Hood-Charaktere erkundet, darfst du diesen Gegenstand bereit machen.",
        },
      ],
    },
    fr: {
      name: "Arc de Robin",
      text: [
        {
          title: "DON DE LA",
          description:
            "FORÊT — Choisissez un personnage blessé ou un lieu endommagé et infligez-lui 1 dommage. UNE BOUFFONNERIE Chaque fois que l'un de vos personnages Robin des Bois est envoyé à l'aventure, vous pouvez redresser cet objet.",
        },
      ],
    },
    it: {
      name: "Arco di Robin",
      text: [
        {
          title: "DONO DELLA FORESTA",
          description:
            "— Infliggi 1 danno a un personaggio o a un luogo già danneggiato a tua scelta. È STATA UNA SCIOCCHEZZUOLA Ogni volta che un tuo personaggio chiamato Robin Hood va all'avventura, puoi preparare questo oggetto.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 98,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_1784510055ec43e49b13b2837192c1d1",
    tcgPlayer: 537827,
  },
  text: [
    {
      title: "FOREST'S GIFT",
      description: "{E} — Deal 1 damage to chosen damaged character or location.",
    },
    {
      title: "A BIT OF A LARK",
      description:
        "Whenever a character of yours named Robin Hood quests, you may ready this item.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1mp-1",
      text: "FOREST'S GIFT {E} — Deal 1 damage to chosen damaged character or location.",
      type: "activated",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1mp-2",
      name: "A BIT OF A LARK",
      text: "A BIT OF A LARK Whenever a character of yours named Robin Hood quests, you may ready this item.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
