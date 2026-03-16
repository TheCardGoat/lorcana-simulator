import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelAppreciativeArtist: CharacterCard = {
  id: "Mbz",
  canonicalId: "ci_Mbz",
  reprints: ["set4-153"],
  cardType: "character",
  name: "Rapunzel",
  version: "Appreciative Artist",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Appreciative Artist",
      text: [
        {
          title: "PERCEPTIVE PARTNER",
          description:
            "While you have a character named Pascal in play, this character gains Ward.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Wertschätzende Künstlerin",
      text: [
        {
          title: "EINFÜHLSAME PARTNERIN",
          description:
            "Solange du mindestens einen Pascal-Charakter im Spiel hast, erhält dieser Charakter Behütet.",
        },
      ],
    },
    fr: {
      name: "Raiponce",
      version: "Artiste sensible",
      text: [
        {
          title: "PARTENAIRE PERSPICACE",
          description:
            "Tant que vous avez un personnage Pascal en jeu, ce personnage-ci gagne Hors d'atteinte.",
        },
      ],
    },
    it: {
      name: "Rapunzel",
      version: "Artista Entusiasta",
      text: [
        {
          title: "COMPAGNO PERSPICACE",
          description:
            "Mentre hai in gioco un personaggio chiamato Pascal, questo personaggio ottiene Protetto. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Tangled",
  set: "004",
  cardNumber: 153,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_7cfbdaa5c45f4ee9a73d3359c2f206c7",
    tcgPlayer: 543915,
  },
  text: [
    {
      title: "PERCEPTIVE PARTNER",
      description: "While you have a character named Pascal in play, this character gains Ward.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1qj-1",
      text: "PERCEPTIVE PARTNER While you have a character named Pascal in play, this character gains Ward.",
      type: "action",
    },
  ],
};
