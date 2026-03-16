import type { ItemCard } from "@tcg/lorcana-types";

export const fortisphere: ItemCard = {
  id: "PSk",
  canonicalId: "ci_PSk",
  reprints: ["set4-200"],
  cardType: "item",
  name: "Fortisphere",
  i18n: {
    en: {
      name: "Fortisphere",
      text: [
        {
          title: "RESOURCEFUL",
          description: "When you play this item, you may draw a card.",
        },
        {
          title: "EXTRACT OF STEEL 1",
          description:
            "{I}, Banish this item — Chosen character of yours gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
        },
      ],
    },
    de: {
      name: "Fortisphäre",
      text: [
        {
          title: "EINFALLSREICH",
          description:
            "Wenn du diesen Gegenstand ausspielst, darfst du 1 Karte ziehen. EXTRAKT AUS STAHL 1, Verbanne diesen Gegenstand — Wähle einen deiner Charaktere, er erhält bis zu Beginn deines nächsten Zuges Beschützen. (Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Sphère d'endurance",
      text: [
        {
          title: "PLEINE DE RESSOURCE",
          description:
            "Lorsque vous jouez cet objet, vous pouvez piocher une carte. EXTRAIT D'ACIER 1, Bannissez cet objet — Choisissez un de vos personnages qui gagne Rempart jusqu'au début de votre prochain tour. (Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Fortisfera",
      text: [
        {
          title: "PIENA DI RISORSE",
          description:
            "Quando giochi questo oggetto, puoi pescare una carta. ESTRATTO DI ACCIAIO 1, esilia questo oggetto — Un tuo personaggio a tua scelta ottiene Guardiano fino all'inizio del tuo prossimo turno. (Un personaggio avversario che sfida uno dei tuoi personaggi deve sceglierne uno con Guardiano, se possibile.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "004",
  cardNumber: 200,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5359fd5a9e4f43568d3419a2cd737640",
    tcgPlayer: 550626,
  },
  text: [
    {
      title: "RESOURCEFUL",
      description: "When you play this item, you may draw a card.",
    },
    {
      title: "EXTRACT OF STEEL 1",
      description:
        "{I}, Banish this item — Chosen character of yours gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "s5n-1",
      name: "RESOURCEFUL",
      text: "RESOURCEFUL When you play this item, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        keyword: "Bodyguard",
        duration: "until-start-of-next-turn",
        target: "CHOSEN_CHARACTER_OF_YOURS",
        type: "gain-keyword",
      },
      id: "s5n-2",
      name: "EXTRACT OF STEEL",
      text: "EXTRACT OF STEEL 1 {I}, Banish this item — Chosen character of yours gains Bodyguard until the start of your next turn.",
      type: "activated",
    },
  ],
};
