import type { ItemCard } from "@tcg/lorcana-types";

export const atlanteanCrystal: ItemCard = {
  id: "ReY",
  canonicalId: "ci_ReY",
  reprints: ["set8-180"],
  cardType: "item",
  name: "Atlantean Crystal",
  i18n: {
    en: {
      name: "Atlantean Crystal",
      text: [
        {
          title: "SHIELDING LIGHT",
          description:
            "{E}, 2 {I} — Chosen character gains Resist +2 and Support until the start of your next turn. (Damage dealt to them is reduced by 2. Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Atlantischer Kristall",
      text: [
        {
          title: "SCHÜTZENDES LICHT,",
          description:
            "2 — Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2 und Unterstützen. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2. Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Cristal atlante",
      text: [
        {
          title: "LUMIÈRE PROTECTRICE,",
          description:
            "2 — Choisissez un personnage qui gagne Résistance +2 et Soutien jusqu'au début de votre prochain tour. (Les dommages qui lui sont infligés sont réduits de 2. Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez ajouter sa à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
      ],
    },
    it: {
      name: "Cristallo Atlantidese",
      text: [
        {
          title: "LUCE PROTETTIVA, 2",
          description:
            "— Un personaggio a tua scelta ottiene Resistere +2 e Aiutante fino all'inizio del tuo prossimo turno. (Il danno che gli viene inflitto è ridotto di 2. Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Atlantis",
  set: "008",
  cardNumber: 180,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a6c7778d84d249c8be2863e3fb67678b",
    tcgPlayer: 631685,
  },
  text: [
    {
      title: "SHIELDING LIGHT",
      description:
        "{E}, 2 {I} — Chosen character gains Resist +2 and Support until the start of your next turn. (Damage dealt to them is reduced by 2. Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "gain-keyword",
            keyword: "Resist",
            value: 2,
            duration: "until-start-of-next-turn",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
          },
          {
            type: "gain-keyword",
            keyword: "Support",
            duration: "until-start-of-next-turn",
            target: {
              ref: "previous-target",
            },
          },
        ],
      },
      id: "1y7-1",
      name: "SHIELDING LIGHT",
      text: "SHIELDING LIGHT {E}, 2 {I} — Chosen character gains Resist +2 and Support until the start of your next turn.",
      type: "activated",
    },
  ],
};
