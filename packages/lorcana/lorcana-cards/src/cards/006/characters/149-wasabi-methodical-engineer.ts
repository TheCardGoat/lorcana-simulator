import type { CharacterCard } from "@tcg/lorcana-types";

export const wasabiMethodicalEngineer: CharacterCard = {
  id: "2ZH",
  canonicalId: "ci_2ZH",
  reprints: ["set6-149"],
  cardType: "character",
  name: "Wasabi",
  version: "Methodical Engineer",
  i18n: {
    en: {
      name: "Wasabi",
      version: "Methodical Engineer",
      text: [
        {
          title: "BLADES OF FURY",
          description:
            "When you play this character, you may banish chosen item. Its player gains 1 lore.",
        },
        {
          title: "QUICK REFLEXES",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Wasabi",
      version: "Systematischer Ingenieur",
      text: [
        {
          title: "KLINGEN DES ZORNS",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand deiner Wahl verbannen. Wer den Gegenstand im Spiel hatte, sammelt 1 Legende.",
        },
        {
          title: "SCHNELLE REFLEXE",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Wasabi",
      version: "Ingénieur méthodique",
      text: [
        {
          title: "LA FUREUR VERTE!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un objet et le bannir. Son propriétaire gagne 1 éclat de Lore.",
        },
        {
          title: "RÉFLEXES VIFS",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Wasabi",
      version: "Ingegnere Metodico",
      text: [
        {
          title: "LAME VERDI",
          description:
            "Quando giochi questo personaggio, puoi esiliare un oggetto a tua scelta. Il suo giocatore ottiene 1 leggenda.",
        },
        {
          title: "RIFLESSI FULMINEI",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_40ef816e4c7a43cba37bb9f51a586626",
    tcgPlayer: 578231,
  },
  text: [
    {
      title: "BLADES OF FURY",
      description:
        "When you play this character, you may banish chosen item. Its player gains 1 lore.",
    },
    {
      title: "QUICK REFLEXES",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "l5t-1",
      name: "BLADES OF FURY",
      text: "BLADES OF FURY When you play this character, you may banish chosen item. Its player gains 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
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
      id: "l5t-2",
      text: "QUICK REFLEXES During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
