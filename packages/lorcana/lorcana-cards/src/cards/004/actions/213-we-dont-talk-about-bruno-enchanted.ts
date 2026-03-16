import type { ActionCard } from "@tcg/lorcana-types";

export const weDontTalkAboutBrunoEnchanted: ActionCard = {
  id: "aXU",
  canonicalId: "ci_Xd1",
  reprints: ["set4-097"],
  cardType: "action",
  name: "We Don’t Talk About Bruno",
  i18n: {
    en: {
      name: "We Don’t Talk About Bruno",
      text: "Return chosen character to their player's hand, then that player discards a card at random.",
    },
    de: {
      name: "Nur kein Wort über Bruno",
      text: "Schicke einen Charakter deiner Wahl auf die zugehörige Hand zurück, danach muss diese Person eine zufällig ausgewählte Karte von ihrer Hand abwerfen.",
    },
    fr: {
      name: "Ne parlons pas de Bruno",
      text: "Choisissez un personnage et renvoyez-le dans la main de son propriétaire. Puis, ce joueur doit défausser une carte au hasard de sa main.",
    },
    it: {
      name: "Non Si Nomina Bruno",
      text: "(Un personaggio con costo 5 o superiore può per cantare questa canzone gratis.) Fai ripendere in mano al suo giocatore un personaggio a tua scelta, poi quel giocatore scarta una carta a caso.",
    },
  },
  inkType: ["emerald"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_3694abe0d09349ca9dbef6861ea42f5a",
    tcgPlayer: 550541,
  },
  text: "Return chosen character to their player's hand, then that player discards a card at random.",
  actionSubtype: "song",
  abilities: [
    {
      id: "3im-1",
      text: "Return chosen character to their player's hand, then that player discards a card at random.",
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
              owner: "any",
            },
            type: "return-to-hand",
          },
          {
            amount: 1,
            random: true,
            target: "CARD_OWNER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
