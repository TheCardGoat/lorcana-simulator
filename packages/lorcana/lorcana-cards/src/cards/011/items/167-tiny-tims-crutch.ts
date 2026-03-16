import type { ItemCard } from "@tcg/lorcana-types";

export const tinyTimsCrutch: ItemCard = {
  id: "WxQ",
  canonicalId: "ci_WxQ",
  reprints: ["set11-167"],
  cardType: "item",
  name: "Tiny Tim's Crutch",
  i18n: {
    en: {
      name: "Tiny Tim's Crutch",
      text: [
        {
          title: "AT YOUR SIDE",
          description:
            "{E} — Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Krücke des kleinen Tim",
      text: [
        {
          title: "AN DEINER SEITE",
          description:
            "— Ein Charakter deiner Wahl erhält in diesem Zug Unterstützen. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Béquille de Tiny Tim",
      text: [
        {
          title: "À VOS CÔTÉS",
          description: "— Choisissez un personnage qui gagne Soutien pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Stampella del Piccolo Tim",
      text: [
        {
          title: "AL TUO FIANCO",
          description:
            "— Un personaggio a tua scelta ottiene Aiutante per questo turno. (Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 167,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f87c783d2fe2456687533d4b5f641131",
    tcgPlayer: 676231,
  },
  text: [
    {
      title: "AT YOUR SIDE",
      description:
        "{E} — Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  abilities: [
    {
      id: "r0b-1",
      name: "AT YOUR SIDE",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        keyword: "Support",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        duration: "this-turn",
      },
      text: "AT YOUR SIDE {E} — Chosen character gains Support this turn.",
    },
  ],
};
