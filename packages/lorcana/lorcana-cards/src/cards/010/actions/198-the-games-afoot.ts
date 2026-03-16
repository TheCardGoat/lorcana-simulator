import type { ActionCard } from "@tcg/lorcana-types";

export const theGamesAfoot: ActionCard = {
  id: "FDs",
  canonicalId: "ci_FDs",
  reprints: ["set10-198"],
  cardType: "action",
  name: "The Game's Afoot!",
  i18n: {
    en: {
      name: "The Game's Afoot!",
      text: "Move up to 2 of your characters to the same location for free. That location gains Resist +2 until the start of your next turn. (Damage dealt to it is reduced by 2.)",
    },
    de: {
      name: "Das Spiel ist im Gang!",
      text: "Wähle bis zu 2 deiner Charaktere und bewege sie kostenlos zu demselben Ort. Der Ort erhält bis zu Beginn deines nächsten Zuges Robust +2. (Reduziere jeglichen Schaden, der ihm zugefügt wird, um 2.)",
    },
    fr: {
      name: "Un complot se prépare",
      text: "Déplacez gratuitement jusqu'à 2 de vos personnages sur le même lieu. Ce lieu gagne Résistance +2 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "È il Momento di Agire!",
      text: "Sposta fino a 2 dei tuoi personaggi nello stesso luogo, gratis. Quel luogo ottiene Resistere +2 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Great Mouse Detective",
  set: "010",
  cardNumber: 198,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dcc0cd9b218f4392bcf503bf27701202",
    tcgPlayer: 660361,
  },
  text: "Move up to 2 of your characters to the same location for free. That location gains Resist +2 until the start of your next turn. (Damage dealt to it is reduced by 2.)",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "move-to-location",
            cost: "free",
            character: {
              selector: "chosen",
              count: {
                upTo: 2,
              },
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            location: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["location"],
            },
          },
          {
            type: "gain-keyword",
            keyword: "Resist",
            value: 2,
            duration: "until-start-of-next-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["location"],
            },
          },
        ],
      },
    },
  ],
};
