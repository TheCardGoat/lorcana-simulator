import type { LocationCard } from "@tcg/lorcana-types";

export const theSorcerersTowerWondrousWorkspace: LocationCard = {
  id: "GJL",
  canonicalId: "ci_GJL",
  reprints: ["set3-068"],
  cardType: "location",
  name: "The Sorcerer's Tower",
  version: "Wondrous Workspace",
  i18n: {
    en: {
      name: "The Sorcerer's Tower",
      version: "Wondrous Workspace",
      text: [
        {
          title: "BROOM CLOSET",
          description: "Your characters named Magic Broom may move here for free.",
        },
        {
          title: "MAGICAL POWER",
          description: "Characters get +1 {L} while here.",
        },
      ],
    },
    de: {
      name: "Der Mystische Turm",
      version: "Wunderbarer Arbeitsraum",
      text: [
        {
          title: "BESENKAMMER",
          description: "Deine Zauberbesen-Charaktere können sich kostenlos zu diesem Ort bewegen.",
        },
        {
          title: "MAGISCHE FÄHIGKEITEN",
          description: "Charaktere an diesem Ort erhalten +1.",
        },
      ],
    },
    fr: {
      name: "La Tour du Sorcier",
      version: "Atelier merveilleux",
      text: [
        {
          title: "PLACARD À BALAIS",
          description:
            "Vous pouvez déplacer gratuitement vos personnages Balais Magiques sur ce lieu.",
        },
        {
          title: "POUVOIR MAGIQUE",
          description: "Les personnages sur ce lieu gagnent +1.",
        },
      ],
    },
    it: {
      name: "La Torre dello Stregone",
      version: "Laboratorio Meraviglioso",
      text: [
        {
          title: "RIPOSTIGLIO DELLE SCOPE I",
          description:
            "tuoi personaggi chiamati Scopa Magica possono spostarsi in questo luogo gratis.",
        },
        {
          title: "POTERE MAGICO I",
          description: "personaggi ricevono +1 mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 68,
  rarity: "uncommon",
  cost: 3,
  willpower: 7,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_d9a1c24b8bf4469f8535e75c38cf61f7",
    tcgPlayer: 535148,
  },
  text: [
    {
      title: "BROOM CLOSET",
      description: "Your characters named Magic Broom may move here for free.",
    },
    {
      title: "MAGICAL POWER",
      description: "Characters get +1 {L} while here.",
    },
  ],
  abilities: [
    {
      effect: {
        filter: {
          name: "Magic Broom",
        },
        location: "here",
        reduction: "free",
        type: "move-cost-reduction",
      },
      type: "static",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
      type: "static",
    },
  ],
};
