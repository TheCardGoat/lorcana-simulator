import type { ItemCard } from "@tcg/lorcana-types";

export const medalOfHeroes: ItemCard = {
  id: "tVn",
  canonicalId: "ci_tVn",
  reprints: ["set5-165"],
  cardType: "item",
  name: "Medal of Heroes",
  i18n: {
    en: {
      name: "Medal of Heroes",
      text: [
        {
          title: "CONGRATULATIONS, SOLDIER",
          description:
            "{E}, 2 {I}, Banish this item — Chosen character of yours gets +2 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Medaille der Helden",
      text: [
        {
          title: "MEINEN",
          description:
            "GLÜCKWUNSCH, SOLDAT, 2, Verbanne diesen Gegenstand — Wähle einen deiner Charaktere und gib ihm in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Médaille des Héros",
      text: [
        {
          title: "JE TE",
          description:
            "FÉLICITE, SOLDAT, 2, bannissez cet objet — Choisissez l'un de vos personnages qui gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Medaglia degli Eroi",
      text: [
        {
          title: "CONGRATULAZIONI, SOLDATO, 2,",
          description:
            "esilia questo oggetto — Un tuo personaggio a tua scelta riceve +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 165,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1aea26c4e3a24196a40c9c10de33fc82",
    tcgPlayer: 559711,
  },
  text: [
    {
      title: "CONGRATULATIONS, SOLDIER",
      description:
        "{E}, 2 {I}, Banish this item — Chosen character of yours gets +2 {L} this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
        banishSelf: true,
      },
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "lore",
        target: "YOUR_CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "b7p-1",
      name: "CONGRATULATIONS, SOLDIER",
      text: "CONGRATULATIONS, SOLDIER {E}, 2 {I}, Banish this item — Chosen character of yours gets +2 {L} this turn.",
      type: "activated",
    },
  ],
};
