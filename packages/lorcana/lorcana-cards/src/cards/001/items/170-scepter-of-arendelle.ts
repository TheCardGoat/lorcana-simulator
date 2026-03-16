import type { ItemCard } from "@tcg/lorcana-types";

export const scepterOfArendelle: ItemCard = {
  id: "jt9",
  canonicalId: "ci_jt9",
  reprints: ["set1-170"],
  cardType: "item",
  name: "Scepter of Arendelle",
  i18n: {
    en: {
      name: "Scepter of Arendelle",
      text: [
        {
          title: "COMMAND",
          description:
            "{E} — Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Zepter von Arendelle",
      text: [
        {
          title: "BEFEHL",
          description:
            "— Ein Charakter deiner Wahl erhält in diesem Zug Unterstützen. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "SCEPTRE D'ARENDELLE",
      text: [
        {
          title: "COMMANDEMENT",
          description: "— choisissez un personnage, il gagne Soutien pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Scettro di Arendelle",
      text: [
        {
          title: "COMANDO",
          description:
            "— Un personaggio a tua scelta ottiene Aiutante per questo turno. (Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 170,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e6bc27d53eb341549fc31d79de6ddb7f",
    tcgPlayer: 505963,
  },
  text: [
    {
      title: "COMMAND",
      description:
        "{E} — Chosen character gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Support",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "1j9-1",
      name: "COMMAND",
      text: "COMMAND {E} — Chosen character gains Support this turn.",
      type: "activated",
    },
  ],
};
