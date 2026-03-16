import type { CharacterCard } from "@tcg/lorcana-types";

export const maidMarianLadyOfTheLists: CharacterCard = {
  id: "w0u",
  canonicalId: "ci_w0u",
  reprints: ["set5-022"],
  cardType: "character",
  name: "Maid Marian",
  version: "Lady of the Lists",
  i18n: {
    en: {
      name: "Maid Marian",
      version: "Lady of the Lists",
      text: [
        {
          title: "IF IT PLEASES THE LADY",
          description:
            "When you play this character, chosen opposing character gets -5 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Maid Marian",
      version: "Herrin der Ränge",
      text: [
        {
          title: "WENN DIE LADY ES WILL",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -5.",
        },
      ],
    },
    fr: {
      name: "Belle Marianne",
      version: "Dame des lices",
      text: [
        {
          title: "SI MADAME VEUT BIEN...",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -5 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Lady Marian",
      version: "Lady della Lizza",
      text: [
        {
          title: "SE LA LADY È D'ACCORDO",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -5 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 22,
  rarity: "uncommon",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0140dc8d8b8444878839e0c94f358497",
    tcgPlayer: 561948,
  },
  text: [
    {
      title: "IF IT PLEASES THE LADY",
      description:
        "When you play this character, chosen opposing character gets -5 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Princess"],
  abilities: [
    {
      effect: {
        modifier: -5,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "o8f-1",
      name: "IF IT PLEASES THE LADY",
      text: "IF IT PLEASES THE LADY When you play this character, chosen opposing character gets -5 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
