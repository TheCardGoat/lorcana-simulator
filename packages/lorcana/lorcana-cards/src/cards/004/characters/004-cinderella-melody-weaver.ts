import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaMelodyWeaver: CharacterCard = {
  id: "Qug",
  canonicalId: "ci_rND",
  reprints: ["set4-004"],
  cardType: "character",
  name: "Cinderella",
  version: "Melody Weaver",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Melody Weaver",
      text: [
        {
          title: "Singer 9",
        },
        {
          title: "BEAUTIFUL VOICE",
          description:
            "Whenever this character sings a song, your other Princess characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Melodien-Weberin",
      text: [
        {
          title: "Singen 9",
          description:
            "(Die Kosten dieses Charakters gelten als 9 für das Singen von Liedern.) WUNDERSCHÖNE STIMME Jedes Mal, wenn dieser Charakter ein Lied singt, erhalten deine anderen Prinzessinnen in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Cendrillon",
      version: "Tisseuse de mélodies",
      text: "Mélomane 9 (Ce personnage est considéré comme ayant un coût de 9 pour chanter des chansons.) VOIX MERVEILLEUSE Chaque fois que ce personnage chante une chanson, vos autres personnages Princesse gagnent +1 pour le reste de ce tour.",
    },
    it: {
      name: "Cenerentola",
      version: "Tessitrice di Melodie",
      text: "Melodioso 9 VOCE BELLISSIMA Ogni volta che questo personaggio canta una canzone, i tuoi altri personaggi Principessa ricevono +1 per questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "004",
  cardNumber: 4,
  rarity: "legendary",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_eaf7db4a652b47939bddb0db4c9030e9",
    tcgPlayer: 550544,
  },
  text: [
    {
      title: "Singer 9",
    },
    {
      title: "BEAUTIFUL VOICE",
      description:
        "Whenever this character sings a song, your other Princess characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "juj-1",
      keyword: "Singer",
      text: "Singer 9",
      type: "keyword",
      value: 9,
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "juj-2",
      name: "BEAUTIFUL VOICE",
      text: "BEAUTIFUL VOICE Whenever this character sings a song, your other Princess characters get +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
