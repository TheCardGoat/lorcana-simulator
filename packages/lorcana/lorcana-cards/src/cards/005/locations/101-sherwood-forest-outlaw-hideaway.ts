import type { LocationCard } from "@tcg/lorcana-types";

export const sherwoodForestOutlawHideaway: LocationCard = {
  id: "DoZ",
  canonicalId: "ci_DoZ",
  reprints: ["set5-101"],
  cardType: "location",
  name: "Sherwood Forest",
  version: "Outlaw Hideaway",
  i18n: {
    en: {
      name: "Sherwood Forest",
      version: "Outlaw Hideaway",
      text: [
        {
          title: "FOREST HOME",
          description: "Your characters named Robin Hood may move here for free.",
        },
        {
          title: "FAMILIAR TERRAIN",
          description:
            'Characters gain Ward and "{E}, 1 {I} — Deal 2 damage to chosen damaged character" while here.',
        },
      ],
    },
    de: {
      name: "Sherwood Forest",
      version: "Versteck der Gesetzlosen",
      text: [
        {
          title: "WALDHEIMAT",
          description: "Deine Robin-Hood-Charaktere können sich kostenlos zu diesem Ort bewegen.",
        },
        {
          title: "VERTRAUTES",
          description:
            'GELÄNDE Charaktere an diesem Ort erhalten Behütet und: ", 1 — Füge einem beschädigten Charakter deiner Wahl 2 Schaden zu." (Gegnerische Mitspielende können die Charaktere nicht auswählen, außer um sie herauszufordern.)',
        },
      ],
    },
    fr: {
      name: "Forêt de Sherwood",
      version: "Cachette des hors-la-loi",
      text: [
        {
          title: "REFUGE FORESTIER",
          description:
            "Vos personnages Robin des Bois peuvent être déplacés gratuitement sur ce lieu.",
        },
        {
          title: "TERRAIN FAMILIER",
          description:
            'Les personnages sur ce lieu gagnent Hors d\'atteinte et ", 1 — Choisissez un personnage ayant au moins un dommage sur lui et infligez-lui 2 dommages." (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)',
        },
      ],
    },
    it: {
      name: "Foresta di Sherwood",
      version: "Nascondiglio dei Fuorilegge",
      text: [
        {
          title: "CASA NELLA FORESTA I",
          description:
            "tuoi personaggi chiamati Robin Hood possono spostarsi in questo luogo gratis.",
        },
        {
          title: "TERRENO FAMILIARE I",
          description:
            'personaggi ottengono Protetto e ", 1 — Infliggi 2 danni a un personaggio danneggiato a tua scelta" mentre si trovano in questo luogo. (Gli avversari non possono sceglierli se non per sfidarli.)',
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 101,
  rarity: "rare",
  cost: 2,
  willpower: 7,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_846446f8cb0941d293de679be94fac73",
    tcgPlayer: 559088,
  },
  text: [
    {
      title: "FOREST HOME",
      description: "Your characters named Robin Hood may move here for free.",
    },
    {
      title: "FAMILIAR TERRAIN",
      description:
        'Characters gain Ward and "{E}, 1 {I} — Deal 2 damage to chosen damaged character" while here.',
    },
  ],
  abilities: [
    {
      effect: {
        filter: {
          name: "Robin Hood",
        },
        location: "here",
        reduction: "free",
        type: "move-cost-reduction",
      },
      id: "1kh-1",
      name: "FOREST HOME",
      text: "FOREST HOME Your characters named Robin Hood may move here for free.",
      type: "static",
    },
    {
      id: "1kh-2",
      name: "FAMILIAR TERRAIN",
      text: "FAMILIAR TERRAIN Characters gain Ward and “{E}, 1 {I} — Deal 2 damage to chosen damaged character” while here.",
      type: "static",
      effect: {
        keyword: "Ward",
        target: "CHARACTERS_HERE",
        type: "gain-keyword",
      },
    },
    {
      effect: {
        abilities: [
          {
            id: "1kh-3a",
            name: "FAMILIAR TERRAIN",
            text: "{E}, 1 {I} — Deal 2 damage to chosen damaged character.",
            cost: {
              exert: true,
              ink: 1,
            },
            effect: {
              type: "deal-damage",
              amount: 2,
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
                filter: [
                  {
                    type: "damaged",
                  },
                ],
              },
            },
            type: "activated",
          },
        ],
        target: "CHARACTERS_HERE",
        type: "grant-abilities-while-here",
      },
      id: "1kh-3",
      name: "FAMILIAR TERRAIN",
      text: "FAMILIAR TERRAIN Characters gain Ward and “{E}, {d} {I} — Deal {d} damage to chosen damaged character” while here.",
      type: "static",
    },
  ],
};
