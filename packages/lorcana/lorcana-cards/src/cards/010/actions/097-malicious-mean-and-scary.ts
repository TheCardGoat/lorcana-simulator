import type { ActionCard } from "@tcg/lorcana-types";

export const maliciousMeanAndScary: ActionCard = {
  id: "Rc1",
  canonicalId: "ci_Ggc",
  reprints: ["set10-097"],
  cardType: "action",
  name: "Malicious, Mean, and Scary",
  i18n: {
    en: {
      name: "Malicious, Mean, and Scary",
      text: "Put 1 damage counter on each opposing character.",
    },
    de: {
      name: "Furchterregend schrecklich",
      text: "Lege je 1 Schadensmarker auf alle gegnerischen Charaktere.",
    },
    fr: {
      name: "Malin, méchant, vilain",
      text: "Placez 1 dommage sur chaque personnage adverse.",
    },
    it: {
      name: "È un Piacere Spaventare",
      text: "Metti 1 segnalino danno su ogni personaggio avversario.",
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 97,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_5547bd08bb6344d4bcd03d37e415c75f",
    tcgPlayer: 660027,
  },
  text: "Put 1 damage counter on each opposing character.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        amount: 1,
        target: "ALL_OPPOSING_CHARACTERS",
        type: "put-damage",
      },
      type: "action",
    },
  ],
};
