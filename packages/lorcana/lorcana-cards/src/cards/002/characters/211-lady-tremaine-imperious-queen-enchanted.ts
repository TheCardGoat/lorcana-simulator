import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyTremaineImperiousQueenEnchanted: CharacterCard = {
  id: "SlK",
  canonicalId: "ci_KcF",
  reprints: ["set2-110"],
  cardType: "character",
  name: "Lady Tremaine",
  version: "Imperious Queen",
  i18n: {
    en: {
      name: "Lady Tremaine",
      version: "Imperious Queen",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "POWER TO RULE AT LAST",
          description:
            "When you play this character, each opponent chooses and banishes one of their characters.",
        },
      ],
    },
    de: {
      name: "Gräfin Tremaine",
      version: "Gebieterische Königin",
      text: "Gestaltwandel 4 ENDLICH AN DER MACHT Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je einen ihrer Charaktere und verbannen ihn.",
    },
    fr: {
      name: "Madame de Trémaine",
      version: "Reine impérieuse",
      text: "Alter 4 ENFIN, LE POUVOIR DE RÉGNER Lorsque vous jouez ce personnage, chaque adversaire choisit l'un de ses personnages et le bannit.",
    },
    it: {
      name: "Lady Tremaine",
      version: "Imperious Queen",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Lady Tremaine.) POWER TO RULE AT LAST When you play this character, each opponent chooses and banishes one of their characters.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 211,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_e08d7a85c4e84f1e83a7521ff9c15a89",
    tcgPlayer: 528109,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "POWER TO RULE AT LAST",
      description:
        "When you play this character, each opponent chooses and banishes one of their characters.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  classifications: ["Floodborn", "Villain", "Queen"],
  abilities: [
    {
      id: "2qj-1",
      keyword: "Shift",
      type: "keyword",
      cost: {
        ink: 4,
      },
      text: "Shift 4",
    },
    {
      id: "2qj-2",
      name: "POWER TO RULE AT LAST",
      text: "POWER TO RULE AT LAST When you play this character, each opponent chooses and banishes one of their characters.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        target: "THEIR_CHOSEN_CHARACTER",
        type: "banish",
      },
    },
  ],
};
