import type { CharacterCard } from "@tcg/lorcana-types";

export const mattiasArendelleGeneral: CharacterCard = {
  id: "YLV",
  canonicalId: "ci_YLV",
  reprints: ["set7-155"],
  cardType: "character",
  name: "Mattias",
  version: "Arendelle General",
  i18n: {
    en: {
      name: "Mattias",
      version: "Arendelle General",
      text: [
        {
          title: "PROUD TO SERVE",
          description: "Your Queen characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Leutnant Mattias",
      version: "General von Arendelle",
      text: [
        {
          title: "BEREIT ZU BESCHÜTZEN",
          description:
            "Deine Königinnen erhalten Behütet. (Gegnerische Mitspielende können diese Charaktere nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Mattias",
      version: "Général d’Arendelle",
      text: [
        {
          title: "FIER DE SERVIR",
          description:
            "Vos personnages Reine gagnent Hors d'atteinte. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Mattias",
      version: "Generale di Arendelle",
      text: [
        {
          title: "FIERI DI SERVIRE I",
          description:
            "tuoi personaggi Regina ottengono Protetto. (Gli avversari non possono sceglierli se non per sfidarli.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 155,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f9e60e9ffff4477d8c4715bd38fb90a2",
    tcgPlayer: 619494,
  },
  text: [
    {
      title: "PROUD TO SERVE",
      description: "Your Queen characters gain Ward.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Knight"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "f9s-1",
      name: "PROUD TO SERVE Your Queen",
      text: "PROUD TO SERVE Your Queen characters gain Ward.",
      type: "static",
    },
  ],
};
