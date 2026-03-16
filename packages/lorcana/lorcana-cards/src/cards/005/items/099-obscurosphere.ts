import type { ItemCard } from "@tcg/lorcana-types";

export const obscurosphere: ItemCard = {
  id: "1rv",
  canonicalId: "ci_1rv",
  reprints: ["set5-099"],
  cardType: "item",
  name: "Obscurosphere",
  i18n: {
    en: {
      name: "Obscurosphere",
      text: [
        {
          title: "EXTRACT OF EMERALD 2",
          description:
            "{I}, Banish this item — Your characters gain Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Obskurosphäre",
      text: [
        {
          title: "EXTRAKT AUS SMARAGD 2,",
          description:
            "Verbanne diesen Gegenstand — Deine Charaktere erhalten bis zu Beginn deines nächsten Zuges Behütet. (Gegnerische Mitspielende können die Charaktere nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Obscurosphère",
      text: [
        {
          title: "EXTRAIT",
          description:
            "D'ÉMERAUDE 2, bannissez cet objet — Vos personnages gagnent Hors d'atteinte jusqu'au début de votre prochain tour. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Oscurosfera",
      text: [
        {
          title: "ESTRATTO DI SMERALDO 2,",
          description:
            "esilia questo oggetto — I tuoi personaggi ottengono Protetto fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierli se non per sfidarli.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 99,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_20513d1b0b8947e7b18e967292e9fb23",
    tcgPlayer: 561171,
  },
  text: [
    {
      title: "EXTRACT OF EMERALD 2",
      description:
        "{I}, Banish this item — Your characters gain Ward until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "wfc-1",
      name: "EXTRACT OF EMERALD 2",
      text: "EXTRACT OF EMERALD 2 {I}, Banish this item — Your characters gain Ward until the start of your next turn.",
      type: "activated",
    },
  ],
};
