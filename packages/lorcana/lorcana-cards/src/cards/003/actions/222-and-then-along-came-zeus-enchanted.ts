import type { ActionCard } from "@tcg/lorcana-types";
import { andThenAlongCameZeusEnchantedI18n } from "./222-and-then-along-came-zeus-enchanted.i18n";

export const andThenAlongCameZeusEnchanted: ActionCard = {
  id: "8f3",
  canonicalId: "ci_dTx",
  reprints: ["set3-195"],
  cardType: "action",
  name: "And Then Along Came Zeus",
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
  i18n: andThenAlongCameZeusEnchantedI18n,
};
