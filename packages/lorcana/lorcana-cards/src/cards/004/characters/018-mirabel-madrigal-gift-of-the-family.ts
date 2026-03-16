import type { CharacterCard } from "@tcg/lorcana-types";

export const mirabelMadrigalGiftOfTheFamily: CharacterCard = {
  id: "iqv",
  canonicalId: "ci_iqv",
  reprints: ["set4-018"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Gift of the Family",
  i18n: {
    en: {
      name: "Mirabel Madrigal",
      version: "Gift of the Family",
      text: [
        {
          title: "Support",
        },
        {
          title: "SAVING THE MIRACLE",
          description:
            "Whenever this character quests, your other Madrigal characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Mirabel Madrigal",
      version: "Gabe der Familie",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) RETTUNG DES WUNDERS Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Madrigal in diesem Zug +1.",
    },
    fr: {
      name: "Mirabel Madrigal",
      version: "Don de la famille",
      text: "Soutien SAUVER LE MIRACLE Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages Madrigal gagnent +1 pour le reste de ce tour.",
    },
    it: {
      name: "Mirabel Madrigal",
      version: "Dono della Famiglia",
      text: "Aiutante SALVARE IL MIRACOLO Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi Madrigal ricevono +1 per questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 18,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_0f2a801e619f4b5eba26e139a30e49ef",
    tcgPlayer: 543898,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "SAVING THE MIRACLE",
      description:
        "Whenever this character quests, your other Madrigal characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Madrigal"],
  abilities: [
    {
      id: "1a6-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1a6-2",
      name: "SAVING THE MIRACLE",
      text: "SAVING THE MIRACLE Whenever this character quests, your other Madrigal characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
