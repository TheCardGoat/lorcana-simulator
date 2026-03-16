import type { CharacterCard } from "@tcg/lorcana-types";

export const flintheartGlomgoldSchemingBillionaire: CharacterCard = {
  id: "fzp",
  canonicalId: "ci_fzp",
  reprints: ["set10-076"],
  cardType: "character",
  name: "Flintheart Glomgold",
  version: "Scheming Billionaire",
  i18n: {
    en: {
      name: "Flintheart Glomgold",
      version: "Scheming Billionaire",
      text: [
        {
          title: "TRY ME",
          description:
            "While you have a character or location in play with a card under them, this character gains Ward.",
        },
      ],
    },
    de: {
      name: "Mac Moneysac",
      version: "Verlogener Milliardär",
      text: [
        {
          title: "FORDERE MICH DOCH HERAUS",
          description:
            "Solange du einen Charakter oder Ort im Spiel hast, der eine Karte unter sich hat, erhält dieser Charakter Behütet.",
        },
      ],
    },
    fr: {
      name: "Archibald Gripsou",
      version: "Milliardaire comploteur",
      text: [
        {
          title: "ESSAIE, POUR VOIR",
          description:
            "Tant que vous avez un personnage ou un lieu en jeu avec une carte sous lui, ce personnage-ci gagne Hors d'atteinte.",
        },
      ],
    },
    it: {
      name: "Cuordipietra Famedoro",
      version: "Subdolo Miliardario",
      text: [
        {
          title: "METTIMI ALLA PROVA",
          description:
            "Mentre hai in gioco un personaggio o un luogo con una carta sotto di sé, questo personaggio ottiene Protetto. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 76,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_6337614f5664420999e442e0bfa1dd31",
    tcgPlayer: 659184,
  },
  text: [
    {
      title: "TRY ME",
      description:
        "While you have a character or location in play with a card under them, this character gains Ward.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "l2o-1",
      text: "TRY ME While you have a character or location in play with a card under them, this character gains Ward.",
      type: "action",
    },
  ],
};
