import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckParanormalInvestigator: CharacterCard = {
  id: "yOS",
  canonicalId: "ci_yOS",
  reprints: ["set10-154"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Paranormal Investigator",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Paranormal Investigator",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "Support",
        },
        {
          title: "STRANGE HAPPENINGS",
          description: "While this character is exerted, cards enter opponents' inkwells exerted.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Paranormale Ermittlerin",
      text: "Gestaltwandel 4 Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) MERKWÜRDIGE GESCHEHNISSE Solange dieser Charakter erschöpft ist, betreten gegnerische Karten ihre Tintenvorräte erschöpft.",
    },
    fr: {
      name: "Daisy",
      version: "Investigatrice du paranormal",
      text: "Alter 4 Soutien ÉTRANGES PHÉNOMÈNES Tant que ce personnage est épuisé, les cartes entrent épuisées dans la réserve d'encre de vos adversaires.",
    },
    it: {
      name: "Paperina",
      version: "Investigatrice del Paranormale",
      text: "Trasformazione 4 Aiutante STRANI FENOMENI Mentre questo personaggio è impegnato, le carte entrano nei calamai degli avversari impegnate.",
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 154,
  rarity: "legendary",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ca1180986a264b5f815f69fb01406b4e",
    tcgPlayer: 657886,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "Support",
    },
    {
      title: "STRANGE HAPPENINGS",
      description: "While this character is exerted, cards enter opponents' inkwells exerted.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  abilities: [],
};
