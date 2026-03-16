import type { ActionCard } from "@tcg/lorcana-types";

export const fantasticalAndMagical: ActionCard = {
  id: "XxM",
  canonicalId: "ci_ABM",
  reprints: ["set8-079"],
  cardType: "action",
  name: "Fantastical and Magical",
  i18n: {
    en: {
      name: "Fantastical and Magical",
      text: [
        {
          title: "Sing Together 9",
          description:
            "(Any number of your or your teammates' characters with total cost 9 or more may {E} to sing this song for free.)",
        },
        {
          title: "For each character that sang this song, draw a card and gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Fantastisch und auch magisch",
      text: "Gemeinsam singen 9 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 9 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Für jeden Charakter, der dieses Lied gesungen hat, ziehe 1 Karte und sammle 1 Legende.",
    },
    fr: {
      name: "Miraculeux et merveilleux",
      text: [
        {
          title: "À",
          description:
            "l'unisson 9 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 9 ou plus pour chanter cette chanson gratuitement.) Pour chaque personnage ayant chanté cette chanson, piochez une carte et gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Fantastico e Magico",
      text: [
        {
          title: "Cantare Insieme 9",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 9 o superiore può per cantare questa canzone gratis.) Per ogni personaggio che ha cantato questa canzone, pesca una carta e ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 79,
  rarity: "rare",
  cost: 9,
  inkable: false,
  externalIds: {
    lorcast: "crd_a728498e9f554bb2b5e4fd82595ed11e",
    tcgPlayer: 631975,
  },
  text: [
    {
      title: "Sing Together 9",
      description:
        "(Any number of your or your teammates' characters with total cost 9 or more may {E} to sing this song for free.)",
    },
    {
      title: "For each character that sang this song, draw a card and gain 1 lore.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Sing Together 9 For each character that sang this song, draw a card and gain 1 lore.",
      effect: {
        type: "for-each",
        counter: {
          thisTurn: true,
          type: "characters-that-sang",
        },
        effect: {
          type: "sequence",
          steps: [
            {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            {
              amount: 1,
              target: "CONTROLLER",
              type: "gain-lore",
            },
          ],
        },
      },
      id: "XxM-1",
    },
  ],
};
