import type { CharacterCard } from "@tcg/lorcana-types";

export const joeyBluePigeon: CharacterCard = {
  id: "Zwk",
  canonicalId: "ci_Zwk",
  reprints: ["set8-036"],
  cardType: "character",
  name: "Joey",
  version: "Blue Pigeon",
  i18n: {
    en: {
      name: "Joey",
      version: "Blue Pigeon",
      text: [
        {
          title: "I'VE GOT JUST THE THING",
          description:
            "Whenever this character quests, you may remove up to 1 damage from each of your characters with Bodyguard.",
        },
      ],
    },
    de: {
      name: "Joey",
      version: "Blaue Taube",
      text: [
        {
          title: "ICH HAB GENAU DAS RICHTIGE",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du bis zu 1 Schaden von jedem deiner Charaktere mit Beschützen entfernen.",
        },
      ],
    },
    fr: {
      name: "Joey le pigeon",
      version: "Pigeon bleu",
      text: [
        {
          title: "J'AI CE QU'IL TE FAUT",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez retirer jusqu'à 1 dommage de chacun de vos personnages avec Rempart.",
        },
      ],
    },
    it: {
      name: "Joey",
      version: "Piccione Blu",
      text: [
        {
          title: "HO PROPRIO QUELLO CHE SERVE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi rimuovere fino a 1 danno da ogni tuo personaggio con Guardiano.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 36,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8667edc82b784cbb96e48962ef4583a9",
    tcgPlayer: 631376,
  },
  text: [
    {
      title: "I'VE GOT JUST THE THING",
      description:
        "Whenever this character quests, you may remove up to 1 damage from each of your characters with Bodyguard.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "jla-1",
      name: "I'VE GOT JUST THE THING",
      text: "I'VE GOT JUST THE THING Whenever this character quests, you may remove up to 1 damage from each of your characters with Bodyguard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
