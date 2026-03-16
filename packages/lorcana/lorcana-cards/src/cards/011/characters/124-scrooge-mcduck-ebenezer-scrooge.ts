import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckEbenezerScrooge: CharacterCard = {
  id: "3lL",
  canonicalId: "ci_3lL",
  reprints: ["set11-124"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Ebenezer Scrooge",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "Ebenezer Scrooge",
      text: [
        {
          title: "PAYMENT DUE",
          description:
            "Whenever this character quests, each opponent loses 1 lore. Draw a card for each 1 lore lost this way.",
        },
        {
          title: "FORECLOSURE",
          description: "At the end of your turn, if an opponent has 0 lore, you gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Ebenezer Scrooge",
      text: [
        {
          title: "FÄLLIGE ZAHLUNG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, verlieren alle gegnerischen Mitspielenden je 1 Legende. Ziehe 1 Karte für jede auf diese Weise verlorene Legende.",
        },
        {
          title: "ZWANGSVOLLSTRECKUNG",
          description:
            "Am Ende deines Zuges, wenn mindestens eine gegnerische Person 0 Legenden hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Ebenezer Scrooge",
      text: [
        {
          title: "ÉCHÉANCE DE PAIEMENT",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, chaque adversaire perd 1 éclat de Lore. Piochez une carte pour chaque éclat de Lore ainsi perdu.",
        },
        {
          title: "SAISIE À",
          description:
            "la fin de votre tour, si un adversaire a 0 éclat de Lore, vous gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Ebenezer Scrooge",
      text: [
        {
          title: "RATA DA PAGARE",
          description:
            "Ogni volta che questo personaggio va all'avventura, ogni avversario perde 1 leggenda. Pesca una carta per ogni singola leggenda persa in questo modo.",
        },
        {
          title: "PIGNORAMENTO",
          description:
            "Alla fine del tuo turno, se un avversario ha 0 leggenda, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 124,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a06d887649d146a89f4c56939b02ad13",
    tcgPlayer: 676214,
  },
  text: [
    {
      title: "PAYMENT DUE",
      description:
        "Whenever this character quests, each opponent loses 1 lore. Draw a card for each 1 lore lost this way.",
    },
    {
      title: "FORECLOSURE",
      description: "At the end of your turn, if an opponent has 0 lore, you gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "12w-1",
      effect: {
        steps: [
          {
            amount: 1,
            target: "EACH_OPPONENT",
            type: "lose-lore",
          },
          {
            type: "for-each",
            counter: {
              type: "lore-lost",
            },
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
          },
        ],
        type: "sequence",
      },
      name: "PAYMENT DUE",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "PAYMENT DUE Whenever this character quests, each opponent loses 1 lore. Draw a card for each 1 lore lost this way.",
    },
    {
      id: "12w-2",
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "opponent",
            filters: [
              {
                type: "lore",
                comparison: "eq",
                value: 0,
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
      text: "FORECLOSURE At the end of your turn, if an opponent has 0 lore, you gain 1 lore.",
    },
  ],
};
