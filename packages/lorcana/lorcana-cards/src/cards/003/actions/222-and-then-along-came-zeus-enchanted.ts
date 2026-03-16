import type { ActionCard } from "@tcg/lorcana-types";

export const andThenAlongCameZeusEnchanted: ActionCard = {
  id: "8f3",
  canonicalId: "ci_dTx",
  reprints: ["set3-195"],
  cardType: "action",
  name: "And Then Along Came Zeus",
  i18n: {
    en: {
      name: "And Then Along Came Zeus",
      text: "Deal 5 damage to chosen character or location.",
    },
    de: {
      name: "Dann kam der große Zeus",
      text: "Füge einem Charakter oder Ort deiner Wahl 5 Schaden zu.",
    },
    fr: {
      name: "Quand soudain survint Zeus",
      text: "Choisissez un personnage ou un lieu et infligez-lui 5 dommages.",
    },
    it: {
      name: "Ma Un Giorno Zeus Tornò",
      text: "(Un personaggio con costo 4 o superiore può per giocare questa canzone gratis.) Infliggi 5 danni a un personaggio o un luogo a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 222,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_0bd8f734ff064b3881191b916f8354cf",
    tcgPlayer: 539173,
  },
  text: "Deal 5 damage to chosen character or location.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        amount: 5,
        target: "CHOSEN_CHARACTER_OR_LOCATION",
        type: "deal-damage",
      },
      type: "action",
    },
  ],
};
