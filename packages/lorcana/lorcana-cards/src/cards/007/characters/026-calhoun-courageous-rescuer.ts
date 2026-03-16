import type { CharacterCard } from "@tcg/lorcana-types";

export const calhounCourageousRescuer: CharacterCard = {
  id: "Vkp",
  canonicalId: "ci_Vkp",
  reprints: ["set7-026"],
  cardType: "character",
  name: "Calhoun",
  version: "Courageous Rescuer",
  i18n: {
    en: {
      name: "Calhoun",
      version: "Courageous Rescuer",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "BACK TO START POSITIONS!",
          description:
            "Whenever this character challenges another character, you may return a Racer character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Sergeant Calhoun",
      version: "Mutige Retterin",
      text: "Gestaltwandel 4 ZURÜCK ZU DEN STARTPOSITIONEN! Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, darfst du eine Rennfahrer-Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Calhoun",
      version: "Sauveteuse pleine de courage",
      text: "Alter 4 REPRENEZ VOTRE POSITION DE DÉPART! Chaque fois que ce personnage en défie un autre, vous pouvez renvoyer une carte Pilote de votre défausse dans votre main.",
    },
    it: {
      name: "Calhoun",
      version: "Soccorritrice Coraggiosa",
      text: "Trasformazione 4 IN POSIZIONE DI PARTENZA! Ogni volta che questo personaggio sfida un altro personaggio, puoi riprendere in mano una carta personaggio Pilota dai tuoi scarti.",
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 26,
  rarity: "rare",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5d8c259d718d4d54ac5e45275bffbcf0",
    tcgPlayer: 618130,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "BACK TO START POSITIONS!",
      description:
        "Whenever this character challenges another character, you may return a Racer character card from your discard to your hand.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Racer"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1m4-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "1m4-2",
      name: "BACK TO START POSITIONS!",
      text: "BACK TO START POSITIONS! Whenever this character challenges another character, you may return a Racer character card from your discard to your hand.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
