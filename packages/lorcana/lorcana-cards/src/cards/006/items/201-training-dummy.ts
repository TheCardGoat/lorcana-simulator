import type { ItemCard } from "@tcg/lorcana-types";

export const trainingDummy: ItemCard = {
  id: "Y5U",
  canonicalId: "ci_Y5U",
  reprints: ["set6-201"],
  cardType: "item",
  name: "Training Dummy",
  i18n: {
    en: {
      name: "Training Dummy",
      text: [
        {
          title: "HANDLE WITH CARE",
          description:
            "{E}, 2 {I} — Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
        },
      ],
    },
    de: {
      name: "Übungspuppe",
      text: [
        {
          title: "HANDLE MIT VORSICHT, 2",
          description:
            "— Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Beschützen. (Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Mannequin d'entraînement",
      text: [
        {
          title: "NE SECOUE PAS TROP LA BELLE, 2",
          description:
            "— Choisissez un personnage qui gagne Rempart jusqu'au début de votre prochain tour. (Lorsqu'il vous défie, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Manichino da Allenamento",
      text: [
        {
          title: "TRATTARE CON CURA, 2",
          description:
            "— Un personaggio a tua scelta ottiene Guardiano fino all'inizio del tuo prossimo turno. (Un personaggio avversario che sfida uno dei tuoi personaggi deve sceglierne uno con Guardiano, se possibile.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "006",
  cardNumber: 201,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_513288f8ceec405e9b17fafcb0f5523a",
    tcgPlayer: 588158,
  },
  text: [
    {
      title: "HANDLE WITH CARE",
      description:
        "{E}, 2 {I} — Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Bodyguard",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "1dj-1",
      name: "HANDLE WITH CARE",
      text: "HANDLE WITH CARE {E}, 2 {I} — Chosen character gains Bodyguard until the start of your next turn.",
      type: "activated",
    },
  ],
};
