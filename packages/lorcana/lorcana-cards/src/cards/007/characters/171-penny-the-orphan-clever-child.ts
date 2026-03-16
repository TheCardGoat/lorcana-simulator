import type { CharacterCard } from "@tcg/lorcana-types";

export const pennyTheOrphanCleverChild: CharacterCard = {
  id: "Dl9",
  canonicalId: "ci_Dl9",
  reprints: ["set7-171"],
  cardType: "character",
  name: "Penny the Orphan",
  version: "Clever Child",
  i18n: {
    en: {
      name: "Penny the Orphan",
      version: "Clever Child",
      text: [
        {
          title: "OUR BOTTLE WORKED!",
          description: "While you have a Hero character in play, this character gains Ward.",
        },
      ],
    },
    de: {
      name: "Penny, das Waisenkind",
      version: "Kluges Kind",
      text: [
        {
          title: "DIE FLASCHE WAR KLASSE!",
          description:
            "Solange du mindestens einen Helden im Spiel hast, erhält dieser Charakter Behütet.",
        },
      ],
    },
    fr: {
      name: "Penny l'orpheline",
      version: "Enfant intelligente",
      text: [
        {
          title: "NOTRE BOUTEILLE A RÉUSSI!",
          description:
            "Tant que vous avez un personnage Héros en jeu, ce personnage-ci gagne Hors d'atteinte.",
        },
      ],
    },
    it: {
      name: "Penny l'Orfana",
      version: "Bambina Intelligente",
      text: [
        {
          title: "LA BOTTIGLIA HA FUNZIONATO!",
          description:
            "Mentre hai in gioco un personaggio Eroe, questo personaggio ottiene Protetto. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 171,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ca23777aebb648ae879ec623bc4f760d",
    tcgPlayer: 619504,
  },
  text: [
    {
      title: "OUR BOTTLE WORKED!",
      description: "While you have a Hero character in play, this character gains Ward.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "szl-1",
      text: "OUR BOTTLE WORKED! While you have a Hero character in play, this character gains Ward.",
      type: "action",
    },
  ],
};
