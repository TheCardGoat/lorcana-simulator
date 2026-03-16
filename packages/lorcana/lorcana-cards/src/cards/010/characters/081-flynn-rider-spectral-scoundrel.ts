import type { CharacterCard } from "@tcg/lorcana-types";

export const flynnRiderSpectralScoundrel: CharacterCard = {
  id: "Gbt",
  canonicalId: "ci_Gbt",
  reprints: ["set10-081"],
  cardType: "character",
  name: "Flynn Rider",
  version: "Spectral Scoundrel",
  i18n: {
    en: {
      name: "Flynn Rider",
      version: "Spectral Scoundrel",
      text: [
        {
          title: "Boost 2 {I}",
          description:
            "(Once during your turn, you may pay 2 {I} to put the top card of your deck face down under this character.)",
        },
        {
          title: "I'LL TAKE THAT",
          description:
            "As long as this character has at least one card under it, it gets +2 {S} and +1 {L}.",
        },
      ],
    },
    de: {
      name: "Flynn Rider",
      version: "Geisterhafter Schurke",
      text: "Stärken 2 DAS NEHME ICH Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +2 und +1.",
    },
    fr: {
      name: "Flynn Rider",
      version: "Crapule spectrale",
      text: "Boost 2 JE VAIS PRENDRE ÇA Tant qu'il y a une carte sous ce personnage, il gagne +2 et +1.",
    },
    it: {
      name: "Flynn Rider",
      version: "Furfante Spettrale",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) QUESTA LA PRENDO IO Mentre c'è una carta sotto a questo personaggio, questo riceve +2 e +1.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 81,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e24a3ebbac57485091abad86f0e5064f",
    tcgPlayer: 659452,
  },
  text: [
    {
      title: "Boost 2 {I}",
      description:
        "(Once during your turn, you may pay 2 {I} to put the top card of your deck face down under this character.)",
    },
    {
      title: "I'LL TAKE THAT",
      description:
        "As long as this character has at least one card under it, it gets +2 {S} and +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Whisper"],
  abilities: [
    {
      id: "73r-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "73r-2",
      text: "I'LL TAKE THAT As long as this character has at least one card under it, it gets +2 {S} and +1 {L}.",
      type: "static",
    },
  ],
};
