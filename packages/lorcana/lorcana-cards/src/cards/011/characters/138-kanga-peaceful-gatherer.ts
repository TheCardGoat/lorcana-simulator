import type { CharacterCard } from "@tcg/lorcana-types";

export const kangaPeacefulGatherer: CharacterCard = {
  id: "Nld",
  canonicalId: "ci_Nld",
  reprints: ["set11-138"],
  cardType: "character",
  name: "Kanga",
  version: "Peaceful Gatherer",
  i18n: {
    en: {
      name: "Kanga",
      version: "Peaceful Gatherer",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "EXTRA HELP",
          description: "While there's a card under this character, she gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Kanga",
      version: "Friedliche Sammlerin",
      text: "Stärken 2 ZUSÄTZLICHE HILFE Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +1.",
    },
    fr: {
      name: "Maman Gourou",
      version: "Cueilleuse paisible",
      text: "Boost 2 PETITE AIDE EN PLUS Tant qu'il y a une carte sous ce personnage, il gagne +1.",
    },
    it: {
      name: "Kanga",
      version: "Raccoglitrice Serena",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) AIUTO AGGIUNTIVO Mentre c'è una carta sotto a questo personaggio, riceve +1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 138,
  rarity: "common",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9f1b0784cd5e4536bad1c85dabbd1943",
    tcgPlayer: 676218,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "EXTRA HELP",
      description: "While there's a card under this character, she gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "i6v-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "i6v-2",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "EXTRA HELP While there’s a card under this character, she gets +1 {L}.",
    },
  ],
};
