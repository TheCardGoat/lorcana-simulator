import type { CharacterCard } from "@tcg/lorcana-types";

export const drCalicoGreeneyedMan: CharacterCard = {
  id: "XeV",
  canonicalId: "ci_XeV",
  reprints: ["set7-181"],
  cardType: "character",
  name: "Dr. Calico",
  version: "Green-Eyed Man",
  i18n: {
    en: {
      name: "Dr. Calico",
      version: "Green-Eyed Man",
      text: [
        {
          title: "YOU'RE BEGINNING TO IRK ME",
          description: "While this character has no damage, he gains Resist +2.",
        },
      ],
    },
    de: {
      name: "Dr. Calico",
      version: "Grünäugiger Mann",
      text: [
        {
          title: "SO LANGSAM NERVEN SIE MICH",
          description:
            "Solange dieser Charakter unbeschädigt ist, erhält er Robust +2. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.)",
        },
      ],
    },
    fr: {
      name: "Dr. Calico",
      version: "L'homme à l'œil vert",
      text: [
        {
          title: "VOUS COMMENCEZ À M'INDISPOSER",
          description: "Tant que ce personnage n'a aucun dommage, il gagne Résistance +2.",
        },
      ],
    },
    it: {
      name: "Dr. Calico",
      version: "Uomo dall'Occhio Verde",
      text: [
        {
          title: "COSÌ MI FARÀ IRRITARE",
          description: "Mentre questo personaggio non ha danno, ottiene Resistere +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 181,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f985e42477e649a5af573894d9b0ac74",
    tcgPlayer: 618160,
  },
  text: [
    {
      title: "YOU'RE BEGINNING TO IRK ME",
      description: "While this character has no damage, he gains Resist +2.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "uk6-1",
      text: "YOU'RE BEGINNING TO IRK ME While this character has no damage, he gains Resist +2.",
      type: "static",
    },
  ],
};
