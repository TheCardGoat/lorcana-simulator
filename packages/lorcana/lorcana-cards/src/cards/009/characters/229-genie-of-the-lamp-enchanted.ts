import type { CharacterCard } from "@tcg/lorcana-types";

export const genieOfTheLampEnchanted: CharacterCard = {
  id: "NlV",
  canonicalId: "ci_jXl",
  reprints: ["set9-076"],
  cardType: "character",
  name: "Genie",
  version: "Of the Lamp",
  i18n: {
    en: {
      name: "Genie",
      version: "Of the Lamp",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "LET'S MAKE SOME MAGIC",
          description: "While this character is exerted, your other characters get +2 {S}.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Aus der Wunderlampe",
      text: "Wendig JETZT WIRD GEZAUBERT Solange dieser Charakter erschöpft ist, erhalten deine anderen Charaktere +2.",
    },
    fr: {
      name: "Génie",
      version: "de la Lampe",
      text: "Insaisissable ALORS FAISONS UN PEU DE MAGIE Tant que ce personnage est épuisé, vos autres personnages gagnent +2.",
    },
    it: {
      name: "Genio",
      version: "Della Lampada",
      text: "Sfuggente SOTTO CON LA MAGIA Mentre questo personaggio è impegnato, i tuoi altri personaggi ricevono +2.",
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "009",
  cardNumber: 229,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_aed92d8e19b14ef19a92fb436dde357c",
    tcgPlayer: 651118,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "LET'S MAKE SOME MAGIC",
      description: "While this character is exerted, your other characters get +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "msr-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "msr-2",
      text: "LET'S MAKE SOME MAGIC While this character is exerted, your other characters get +2 {S}.",
      type: "static",
    },
  ],
};
