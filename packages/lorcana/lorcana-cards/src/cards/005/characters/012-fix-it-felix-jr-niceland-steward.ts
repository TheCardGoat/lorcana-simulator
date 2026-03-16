import type { CharacterCard } from "@tcg/lorcana-types";

export const fixitFelixJrNicelandSteward: CharacterCard = {
  id: "zoW",
  canonicalId: "ci_zoW",
  reprints: ["set5-012"],
  cardType: "character",
  name: "Fix-It Felix, Jr.",
  version: "Niceland Steward",
  i18n: {
    en: {
      name: "Fix-It Felix, Jr.",
      version: "Niceland Steward",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "BUILDING TOGETHER",
          description: "Your locations get +2 {W}.",
        },
      ],
    },
    de: {
      name: "Fix-It Felix, Jr.",
      version: "Verwalter von Niceland",
      text: [
        {
          title: "Gestaltwandel 3",
          description:
            "(Du kannst 3 zahlen, um diesen Charakter auf einen deiner Fix-It-Felix, Jr.-Charaktere auszuspielen.) ZUSAMMEN AUFBAUEN Deine Orte erhalten +2.",
        },
      ],
    },
    fr: {
      name: "Félix Fixe Junior",
      version: "Intendant de Niceland",
      text: "Alter 3 BÂTIR ENSEMBLE Vos lieux gagnent +2.",
    },
    it: {
      name: "Felix Aggiustatutto Jr.",
      version: "Amministratore di Belposto",
      text: "Trasformazione 3 COSTRUIRE INSIEME I tuoi luoghi ricevono +2.",
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 12,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_894f1b97871342e29b414e927dcd1140",
    tcgPlayer: 559773,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "BUILDING TOGETHER",
      description: "Your locations get +2 {W}.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "z1m-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "willpower",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "z1m-2",
      text: "BUILDING TOGETHER Your locations get +2 {W}.",
      type: "action",
    },
  ],
};
