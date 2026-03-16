import type { CharacterCard } from "@tcg/lorcana-types";

export const rogerRadcliffeDogLover: CharacterCard = {
  id: "aPy",
  canonicalId: "ci_aPy",
  reprints: ["set7-005"],
  cardType: "character",
  name: "Roger Radcliffe",
  version: "Dog Lover",
  i18n: {
    en: {
      name: "Roger Radcliffe",
      version: "Dog Lover",
      text: [
        {
          title: "THERE YOU GO",
          description:
            "Whenever this character quests, you may remove up to 1 damage from each of your Puppy characters.",
        },
      ],
    },
    de: {
      name: "Roger Radcliffe",
      version: "Hundeliebhaber",
      text: [
        {
          title: "SO IST'S FEIN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du bis zu 1 Schaden von jedem deiner Welpen entfernen.",
        },
      ],
    },
    fr: {
      name: "Roger Radcliffe",
      version: "Passionné de chiens",
      text: [
        {
          title: "ET VOILÀ, C'EST FAIT",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez retirer jusqu'à 1 dommage de chacun de vos personnages Chiot.",
        },
      ],
    },
    it: {
      name: "Rudy Radcliffe",
      version: "Amante dei Cani",
      text: [
        {
          title: "ECCO QUA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi rimuovere fino a 1 danno da ogni tuo personaggio Cucciolo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 5,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fb3fdf1042f04416b070bdd8566a53e6",
    tcgPlayer: 619408,
  },
  text: [
    {
      title: "THERE YOU GO",
      description:
        "Whenever this character quests, you may remove up to 1 damage from each of your Puppy characters.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "1t4-1",
      name: "THERE YOU GO",
      text: "THERE YOU GO Whenever this character quests, you may remove up to 1 damage from each of your Puppy characters.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
