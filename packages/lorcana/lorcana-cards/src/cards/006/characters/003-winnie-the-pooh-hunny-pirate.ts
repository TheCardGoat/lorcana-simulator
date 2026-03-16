import type { CharacterCard } from "@tcg/lorcana-types";

export const winnieThePoohHunnyPirate: CharacterCard = {
  id: "R7L",
  canonicalId: "ci_R7L",
  reprints: ["set6-003"],
  cardType: "character",
  name: "Winnie the Pooh",
  version: "Hunny Pirate",
  i18n: {
    en: {
      name: "Winnie the Pooh",
      version: "Hunny Pirate",
      text: [
        {
          title: "Support",
        },
        {
          title: "WE'RE PIRATES, YOU SEE",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next Pirate character you play this turn.",
        },
      ],
    },
    de: {
      name: "Winnie Puuh",
      version: "Honigpirat",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) WIR SIND PIRATEN, SIEHST DU? Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für den nächsten Piraten, den du in diesem Zug ausspielst.",
    },
    fr: {
      name: "Winnie l'ourson",
      version: "Pirate miel sabords",
      text: "Soutien ON EST DES PIRATES, VOUS VOYEZ Chaque fois que ce personnage est envoyé à l'aventure, le prochain personnage Pirate que vous jouez ce tour-ci coûte 1 de moins.",
    },
    it: {
      name: "Winnie the Pooh",
      version: "Pirata del Miele",
      text: "Aiutante SIAMO DEI PIRATI, SAI? Ogni volta che questo personaggio va all'avventura, paga 1 in meno per giocare il tuo prossimo personaggio Pirata per questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 3,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_59aa66bcac7b43528a3c9c01f4bc1124",
    tcgPlayer: 593050,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "WE'RE PIRATES, YOU SEE",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next Pirate character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Pirate"],
  abilities: [
    {
      id: "1v3-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1v3-2",
      text: "WE'RE PIRATES, YOU SEE Whenever this character quests, you pay 1 {I} less for the next Pirate character you play this turn.",
      type: "action",
    },
  ],
};
