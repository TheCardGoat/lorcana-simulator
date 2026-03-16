import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenConceitedRulerEpic: CharacterCard = {
  id: "4Tp",
  canonicalId: "ci_7pM",
  reprints: ["set9-001"],
  cardType: "character",
  name: "The Queen",
  version: "Conceited Ruler",
  i18n: {
    en: {
      name: "The Queen",
      version: "Conceited Ruler",
      text: [
        {
          title: "Support",
        },
        {
          title: "ROYAL SUMMONS",
          description:
            "At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Eingebildete Herrscherin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) KÖNIGLICHE VORLADUNG Zu Beginn deines Zuges darfst du eine Prinzessinnen- oder Königinnen-Charakterkarte von deiner Hand auswählen und abwerfen, um eine Charakterkarte aus deinem Ablagestapel zurück auf deine Hand zu nehmen.",
    },
    fr: {
      name: "La Reine",
      version: "Souveraine vaniteuse",
      text: "Soutien CONVOCATION ROYALE Au début de votre tour, vous pouvez défausser une carte Personnage Princesse ou Reine pour renvoyer dans votre main une carte Personnage de votre défausse.",
    },
    it: {
      name: "Regina",
      version: "Monarca Presuntuosa",
      text: "Aiutante CONVOCAZIONE REALE All'inizio del tuo turno, puoi scegliere e scartare una carta personaggio Principessa o Regina per riprendere in mano una carta personaggio dai tuoi scarti.",
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "009",
  cardNumber: 205,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_61593ca4abb44723ae95ab9228e27aee",
    tcgPlayer: 650141,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ROYAL SUMMONS",
      description:
        "At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "3l5-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "3l5-2",
      text: "ROYAL SUMMONS At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.",
      type: "action",
    },
  ],
};
