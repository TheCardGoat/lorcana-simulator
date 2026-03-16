import type { CharacterCard } from "@tcg/lorcana-types";

export const arielTreasureCollector: CharacterCard = {
  id: "Sxx",
  canonicalId: "ci_Sxx",
  reprints: ["set4-139"],
  cardType: "character",
  name: "Ariel",
  version: "Treasure Collector",
  i18n: {
    en: {
      name: "Ariel",
      version: "Treasure Collector",
      text: [
        {
          title: "Ward",
        },
        {
          title: "THE GIRL WHO HAS EVERYTHING",
          description:
            "While you have more items in play than each opponent, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Schatzsammlerin",
      text: "Behütet DIE, DIE SCHON ALLES HAT Wenn du mehr Gegenstände als jede gegnerische Person im Spiel hast, erhält dieser Charakter +2.",
    },
    fr: {
      name: "Ariel",
      version: "Collectionneuse de trésors",
      text: "Hors d'atteinte TROP GÂTÉE PAR LA VIE Tant que vous avez plus d'objets en jeu que chaque adversaire, ce personnage gagne +2.",
    },
    it: {
      name: "Ariel",
      version: "Collezionista di Tesori",
      text: "Protetto UNA CHE HA TUTTO ORMAI Mentre hai in gioco più oggetti di ogni avversario, questo personaggio riceve +2.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 139,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_268651d4999a481faa22b6598a4dea0c",
    tcgPlayer: 549440,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "THE GIRL WHO HAS EVERYTHING",
      description:
        "While you have more items in play than each opponent, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "hyy-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "hyy-2",
      text: "THE GIRL WHO HAS EVERYTHING While you have more items in play than each opponent, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
