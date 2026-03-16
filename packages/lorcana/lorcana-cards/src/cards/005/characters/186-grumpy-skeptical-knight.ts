import type { CharacterCard } from "@tcg/lorcana-types";

export const grumpySkepticalKnight: CharacterCard = {
  id: "VFd",
  canonicalId: "ci_VFd",
  reprints: ["set5-186"],
  cardType: "character",
  name: "Grumpy",
  version: "Skeptical Knight",
  i18n: {
    en: {
      name: "Grumpy",
      version: "Skeptical Knight",
      text: [
        {
          title: "BOON OF RESILIENCE",
          description:
            "While one of your Knight characters is at a location, that character gains Resist +2.",
        },
        {
          title: "BURST OF SPEED",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Brummbär",
      version: "Ritter des Misstrauens",
      text: [
        {
          title: "GESCHENK DER UNVERWÜSTLICHKEIT",
          description:
            "Solange einer deiner Ritter an einem Ort ist, erhält jener Charakter Robust +2. (Reduziere jeglichen Schaden, der ihm zugefügt wird, um 2.)",
        },
        {
          title: "GESCHWINDIGKEITSSCHUB",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Grincheux",
      version: "Chevalier sceptique",
      text: [
        {
          title: "RÉSILIENCE",
          description: "Vos personnages Chevalier sur un lieu gagnent Résistance +2.",
        },
        {
          title: "ACCÉLÉRATION",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Brontolo",
      version: "Cavaliere Scettico",
      text: [
        {
          title: "DONO DI RESILIENZA",
          description:
            "Mentre uno dei tuoi personaggi Cavaliere si trova in un luogo, quel personaggio ottiene Resistere +2.",
        },
        {
          title: "SCATTO VELOCE",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 186,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9ec070844bb24ee997efeb9e7bf9dac2",
    tcgPlayer: 559666,
  },
  text: [
    {
      title: "BOON OF RESILIENCE",
      description:
        "While one of your Knight characters is at a location, that character gains Resist +2.",
    },
    {
      title: "BURST OF SPEED",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 2,
      },
      id: "pqh-1",
      text: "BOON OF RESILIENCE While one of your Knight characters is at a location, that character gains Resist +2.",
      type: "action",
    },
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "pqh-2",
      text: "BURST OF SPEED During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
