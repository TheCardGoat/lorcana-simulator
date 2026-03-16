import type { CharacterCard } from "@tcg/lorcana-types";

export const fixitFelixJrPintsizedHero: CharacterCard = {
  id: "zSu",
  canonicalId: "ci_zSu",
  reprints: ["set7-022"],
  cardType: "character",
  name: "Fix-It Felix, Jr.",
  version: "Pint-Sized Hero",
  i18n: {
    en: {
      name: "Fix-It Felix, Jr.",
      version: "Pint-Sized Hero",
      text: [
        {
          title: "LET'S GET TO WORK",
          description:
            "Whenever you return a Racer character card from your discard to your hand, you may ready chosen Racer character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Fix-It Felix, Jr.",
      version: "Kleinwüchsiger Held",
      text: [
        {
          title: "LOS, AN DIE ARBEIT",
          description:
            "Jedes Mal, wenn du eine Rennfahrer-Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nimmst, darfst du einen Rennfahrer deiner Wahl bereit machen. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Félix Fixe Junior",
      version: "Héros demi-portion",
      text: [
        {
          title: "AU TRAVAIL",
          description:
            "Chaque fois que vous renvoyez une carte Pilote de votre défausse dans votre main, vous pouvez choisir un Pilote et le redresser. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Felix Aggiustatutto Jr.",
      version: "Tappetto Eroico",
      text: [
        {
          title: "AL LAVORO",
          description:
            "Ogni volta che riprendi in mano una carta personaggio Pilota dai tuoi scarti, puoi preparare un personaggio Pilota a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 22,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8e4e89a1b49c4ea5936be4e14cfadb46",
    tcgPlayer: 619417,
  },
  text: [
    {
      title: "LET'S GET TO WORK",
      description:
        "Whenever you return a Racer character card from your discard to your hand, you may ready chosen Racer character. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Racer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "this-turn",
          restriction: "cant-quest",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "b28-1",
      name: "LET'S GET TO WORK",
      text: "LET'S GET TO WORK Whenever you return a Racer character card from your discard to your hand, you may ready chosen Racer character. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
