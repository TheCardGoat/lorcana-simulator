import type { CharacterCard } from "@tcg/lorcana-types";

export const sirPellinoreSeasonedKnight: CharacterCard = {
  id: "u5n",
  canonicalId: "ci_u5n",
  reprints: ["set8-154"],
  cardType: "character",
  name: "Sir Pellinore",
  version: "Seasoned Knight",
  i18n: {
    en: {
      name: "Sir Pellinore",
      version: "Seasoned Knight",
      text: [
        {
          title: "CODE OF HONOR",
          description:
            "Whenever this character quests, your other characters gain Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Sir Pelinore",
      version: "Erfahrener Ritter",
      text: [
        {
          title: "EHRENKODEX",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Charaktere in diesem Zug Unterstützen. (Jedes Mal, wenn die Charaktere erkunden, darfst du ihre in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Seigneur Pélinore",
      version: "Chevalier chevronné",
      text: [
        {
          title: "CODE DE CHEVALERIE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages gagnent Soutien pour le reste de ce tour. (Lorsque ces personnages sont envoyés à l'aventure, vous pouvez ajouter leur à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
      ],
    },
    it: {
      name: "Ser Pilade",
      version: "Cavaliere Esperto",
      text: [
        {
          title: "CODICE D'ONORE",
          description:
            "Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi ottengono Aiutante per questo turno. (Ogni volta che vanno all'avventura, puoi aggiungere la loro alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "008",
  cardNumber: 154,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b4a7b13bd7904038ac156d59dedf0023",
    tcgPlayer: 631829,
  },
  text: [
    {
      title: "CODE OF HONOR",
      description:
        "Whenever this character quests, your other characters gain Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  classifications: ["Storyborn", "Knight"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "6h9-1",
      name: "CODE OF HONOR",
      text: "CODE OF HONOR Whenever this character quests, your other characters gain Support this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
