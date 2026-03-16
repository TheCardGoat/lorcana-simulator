import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseSweetheartPrincess: CharacterCard = {
  id: "GO3",
  canonicalId: "ci_f4y",
  reprints: ["set9-005"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Sweetheart Princess",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Sweetheart Princess",
      text: [
        {
          title: "ROYAL FAVOR",
          description:
            "Your characters named Mickey Mouse gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
        {
          title: "BYE BYE, NOW",
          description:
            "Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Geliebte Prinzessin",
      text: [
        {
          title: "KÖNIGLICHE GUNST",
          description:
            "Deine Micky-Maus-Charaktere erhalten Unterstützen. (Jedes Mal, wenn die Charaktere erkunden, darfst du ihre in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
        {
          title: "MACH'S GUT, JETZT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen erschöpften Charakter deiner Wahl mit 5 oder mehr verbannen.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Adorable princesse",
      text: [
        {
          title: "FAVEUR ROYALE",
          description: "Vos personnages nommés Mickey Mouse gagnent Soutien.",
        },
        {
          title: "ALLEZ, AU REVOIR!",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un personnage épuisé ayant 5 ou plus et le bannir.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Dolce Principessa",
      text: [
        {
          title: "FAVORE REALE I",
          description: "tuoi personaggi chiamati Topolino ottengono Aiutante.",
        },
        {
          title: "ADDIO, PER ORA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi esiliare un personaggio impegnato a tua scelta con 5 o superiore.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "009",
  cardNumber: 5,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_77b92f4bb7d2460ea85b9d547cb8e72f",
    tcgPlayer: 651106,
  },
  text: [
    {
      title: "ROYAL FAVOR",
      description:
        "Your characters named Mickey Mouse gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    {
      title: "BYE BYE, NOW",
      description:
        "Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "ofq-1",
      text: "ROYAL FAVOR Your characters named Mickey Mouse gain Support.",
      type: "action",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "ofq-2",
      text: "BYE BYE, NOW Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.",
      type: "action",
    },
  ],
};
