import type { CharacterCard } from "@tcg/lorcana-types";

export const mauiHalfshark: CharacterCard = {
  id: "HTB",
  canonicalId: "ci_HTB",
  reprints: ["set6-124"],
  cardType: "character",
  name: "Maui",
  version: "Half-Shark",
  i18n: {
    en: {
      name: "Maui",
      version: "Half-Shark",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "CHEEEEOHOOOO!",
          description:
            "Whenever this character challenges another character, you may return an action card from your discard to your hand.",
        },
        {
          title: "WAYFINDING",
          description: "Whenever you play an action, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Maui",
      version: "Halb-Hai",
      text: "Wendig CHUUUUHUUUU! Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, darfst du 1 Aktionskarte aus deinem Ablagestapel zurück auf deine Hand nehmen. WEGWEISEND Jedes Mal, wenn du eine Aktion ausspielst, sammelst du 1 Legende.",
    },
    fr: {
      name: "Maui",
      version: "Demi-requin",
      text: "Insaisissable CHEEEEHOOOO! Chaque fois que ce personnage en défie un autre, vous pouvez renvoyer une carte Action de votre défausse dans votre main. GUIDAGE Chaque fois que vous jouez une action, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Maui",
      version: "Mezzo Squalo",
      text: "Sfuggente TAAAHOOO! Ogni volta che questo personaggio sfida un altro personaggio, puoi riprendere in mano una carta azione dai tuoi scarti. ORIENTARSI Ogni volta che giochi un'azione, ottieni 1 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 124,
  rarity: "legendary",
  cost: 6,
  strength: 7,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5123478aad6349f1a3f4500b31bc7d5e",
    tcgPlayer: 588357,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "CHEEEEOHOOOO!",
      description:
        "Whenever this character challenges another character, you may return an action card from your discard to your hand.",
    },
    {
      title: "WAYFINDING",
      description: "Whenever you play an action, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity"],
  abilities: [
    {
      id: "rcf-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "action",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "rcf-2",
      name: "CHEEEEOHOOOO!",
      text: "CHEEEEOHOOOO! Whenever this character challenges another character, you may return an action card from your discard to your hand.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "rcf-3",
      name: "WAYFINDING",
      text: "WAYFINDING Whenever you play an action, gain 1 lore.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
