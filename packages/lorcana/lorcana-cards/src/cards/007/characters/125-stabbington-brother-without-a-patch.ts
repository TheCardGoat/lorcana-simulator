import type { CharacterCard } from "@tcg/lorcana-types";

export const stabbingtonBrotherWithoutAPatch: CharacterCard = {
  id: "ij4",
  canonicalId: "ci_ij4",
  reprints: ["set7-125"],
  cardType: "character",
  name: "Stabbington Brother",
  version: "Without a Patch",
  i18n: {
    en: {
      name: "Stabbington Brother",
      version: "Without a Patch",
      text: "Rush GET 'EM! Your other characters named Stabbington Brother gain Rush.",
    },
    de: {
      name: "Stabbington-Bruder",
      version: "Ohne Augenklappe",
      text: "Rasant SCHNAPP SIE! Deine anderen Stabbington-Bruder-Charaktere erhalten Rasant.",
    },
    fr: {
      name: "Un frère Stabbington",
      version: "Celui sans cache-œil",
      text: "Charge ATTRAPE-LES! Vos autres personnages Un frère Stabbington gagnent Charge.",
    },
    it: {
      name: "Fratello Stabbington",
      version: "Senza la Benda",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) PRENDILI! I tuoi altri personaggi chiamati Fratello Stabbington ottengono Lesto.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "007",
  cardNumber: 125,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_bb6b464db7a64c6081cdb443267749e4",
    tcgPlayer: 619474,
  },
  text: "Rush GET 'EM! Your other characters named Stabbington Brother gain Rush.",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Rush",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "103-1",
      text: "Rush GET 'EM! Your other characters named Stabbington Brother gain Rush.",
      type: "action",
    },
  ],
};
