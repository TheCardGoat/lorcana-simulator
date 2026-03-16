import type { ActionCard } from "@tcg/lorcana-types";

export const divebomb: ActionCard = {
  id: "lb1",
  canonicalId: "ci_lb1",
  reprints: ["set3-128"],
  cardType: "action",
  name: "Divebomb",
  i18n: {
    en: {
      name: "Divebomb",
      text: "Banish one of your characters with Reckless to banish chosen character with less {S} than that character.",
    },
    de: {
      name: "Sturzbomber",
      text: "Verbanne einen deiner Charaktere mit Impulsiv, um einen Charakter deiner Wahl, mit einer geringeren als der verbannte Charakter, zu verbannen.",
    },
    fr: {
      name: "Bombardement en piqué !",
      text: "Bannissez l'un de vos personnages avec Combattant puis choisissez un personnage ayant moins de que lui et bannissez-le.",
    },
    it: {
      name: "In Picchiata",
      text: "Esilia uno dei tuoi personaggi con Attaccabrighe per esiliare un personaggio a tua scelta con meno del tuo personaggio.",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 128,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_a4bd827fb4c6497fba686f38a21448ee",
    tcgPlayer: 537755,
  },
  text: "Banish one of your characters with Reckless to banish chosen character with less {S} than that character.",
  abilities: [
    {
      type: "action",
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-keyword",
                  keyword: "Reckless",
                },
              ],
            },
            type: "banish",
          },
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              requireDifferentTargets: true,
              filter: [
                {
                  type: "strength-comparison",
                  comparison: "less",
                  value: "target",
                  compareWithParentsTarget: true,
                },
              ],
            },
            type: "banish",
          },
        ],
        type: "sequence",
      },
    },
  ],
};
