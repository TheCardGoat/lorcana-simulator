import type { LocationCard } from "@tcg/lorcana-types";

export const fangRiverCity: LocationCard = {
  id: "AJB",
  canonicalId: "ci_AJB",
  reprints: ["set3-101"],
  cardType: "location",
  name: "Fang",
  version: "River City",
  i18n: {
    en: {
      name: "Fang",
      version: "River City",
      text: [
        {
          title: "SURROUNDED BY WATER",
          description:
            "Characters gain Ward and Evasive while here. (Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)",
        },
      ],
    },
    de: {
      name: "Zahn",
      version: "Stadt am Fluss",
      text: [
        {
          title: "VON WASSER UMGEBEN",
          description:
            "Charaktere an diesem Ort erhalten Behütet und Wendig. (Gegnerische Karten können die Charaktere nicht auswählen, außer um sie herauszufordern. Nur Charaktere mit Wendig können diese Charaktere herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Croc du Dragon",
      version: "Cité des rivières",
      text: [
        {
          title: "ENCERCLÉ PAR LES EAUX",
          description:
            "Les personnages sur ce lieu gagnent Hors d'atteinte et Insaisissable. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi. Seuls les personnages avec Insaisissable peuvent défier ces personnages.)",
        },
      ],
    },
    it: {
      name: "Zanna",
      version: "Città sul Fiume",
      text: [
        {
          title: "CIRCONDATA DALL'ACQUA I",
          description:
            "personaggi ottengono Protetto e Sfuggente mentre si trovano in questo luogo. (Gli avversari non possono sceglierli se non per sfidarli. Solo altri personaggi con Sfuggente possono sfidarli.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Raya and the Last Dragon",
  set: "003",
  cardNumber: 101,
  rarity: "rare",
  cost: 4,
  willpower: 6,
  moveCost: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6438731e38f642b38a24a0b566078fa3",
    tcgPlayer: 533884,
  },
  text: [
    {
      title: "SURROUNDED BY WATER",
      description:
        "Characters gain Ward and Evasive while here. (Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "CHARACTERS_HERE",
        type: "gain-keyword",
      },
      type: "static",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "CHARACTERS_HERE",
        type: "gain-keyword",
      },
      type: "static",
    },
  ],
};
