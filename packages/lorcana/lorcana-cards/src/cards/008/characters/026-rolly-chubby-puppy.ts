import type { CharacterCard } from "@tcg/lorcana-types";

export const rollyChubbyPuppy: CharacterCard = {
  id: "3aw",
  canonicalId: "ci_3aw",
  reprints: ["set8-026"],
  cardType: "character",
  name: "Rolly",
  version: "Chubby Puppy",
  i18n: {
    en: {
      name: "Rolly",
      version: "Chubby Puppy",
      text: [
        {
          title: "Support",
        },
        {
          title: "ADORABLE ANTICS",
          description:
            "When you play this character, you may put a character card from your discard into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Rolly",
      version: "Pummeliger Welpe",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) ENTZÜCKENDE POSSEN Wenn du diesen Charakter ausspielst, darfst du 1 Charakterkarte aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat legen.",
    },
    fr: {
      name: "Rolly",
      version: "Chiot potelé",
      text: "Soutien ADORABLES CABRIOLES Lorsque vous jouez ce personnage, vous pouvez placer une carte Personnage de votre défausse dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Rolly",
      version: "Cucciolo Cicciottello",
      text: "Aiutante SCENATE ADORABILI Quando giochi questo personaggio, puoi aggiungere al tuo calamaio una carta personaggio dai tuoi scarti, a faccia in giù e impegnata.",
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 26,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b2cd67df2b87491f9b39c5d31e7b91d1",
    tcgPlayer: 631369,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ADORABLE ANTICS",
      description:
        "When you play this character, you may put a character card from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      id: "f0i-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "f0i-2",
      name: "ADORABLE ANTICS",
      text: "ADORABLE ANTICS When you play this character, you may put a character card from your discard into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
