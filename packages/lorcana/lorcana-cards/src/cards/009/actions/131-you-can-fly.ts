import type { ActionCard } from "@tcg/lorcana-types";

export const youCanFly: ActionCard = {
  id: "PnR",
  canonicalId: "ci_JGS",
  reprints: ["set2-133", "set9-131"],
  cardType: "action",
  name: "You Can Fly!",
  i18n: {
    en: {
      name: "You Can Fly!",
      text: "Chosen character gains Evasive until the start of your next turn.",
    },
    de: {
      name: "Flieg ins Glück",
      text: "Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Tu t'envoles",
      text: "Choisissez un personnage, il gagne Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Puoi Volar!",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 131,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_53b7756b77ee49df8373e45db50bd1de",
    tcgPlayer: 650066,
  },
  text: "Chosen character gains Evasive until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "gain-keyword",
        keyword: "Evasive",
        duration: "until-start-of-next-turn",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
