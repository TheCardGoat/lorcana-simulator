import type { ActionCard } from "@tcg/lorcana-types";

export const dodge: ActionCard = {
  id: "IoO",
  canonicalId: "ci_IoO",
  reprints: ["set4-093"],
  cardType: "action",
  name: "Dodge!",
  i18n: {
    en: {
      name: "Dodge!",
      text: "Chosen character gains Ward and Evasive until the start of your next turn. (Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)",
    },
    de: {
      name: "Ausweichen!",
      text: "Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Behütet und Wendig. (Gegnerische Karten können den Charakter nicht auswählen, außer um ihn herauszufordern. Nur Charaktere mit Wendig können den Charakter herausfordern.)",
    },
    fr: {
      name: "Esquive !",
      text: "Choisissez un personnage qui gagne Hors d'atteinte et Insaisissable jusqu'au début de votre prochain tour. (Les adversaires ne peuvent pas choisir ce personnage, hormis pour un défi. Seuls les personnages avec Insaisissable peuvent défier ce personnage.)",
    },
    it: {
      name: "Schivata!",
      text: "Un personaggio a tua scelta ottiene Protetto e Sfuggente fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierlo se non per sfidarlo. Solo altri personaggi con Sfuggente possono sfidarlo.)",
    },
  },
  inkType: ["emerald"],
  set: "004",
  cardNumber: 93,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d02ae657899e4523a0db31c20bdb03e9",
    tcgPlayer: 550584,
  },
  text: "Chosen character gains Ward and Evasive until the start of your next turn. (Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "until-start-of-next-turn",
            keyword: "Ward",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
          },
          {
            duration: "until-start-of-next-turn",
            keyword: "Evasive",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "2c5-1",
      text: "Chosen character gains Ward and Evasive until the start of your next turn.",
      type: "action",
    },
  ],
};
