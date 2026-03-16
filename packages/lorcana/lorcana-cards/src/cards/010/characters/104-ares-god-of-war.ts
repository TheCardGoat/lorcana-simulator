import type { CharacterCard } from "@tcg/lorcana-types";

export const aresGodOfWar: CharacterCard = {
  id: "S33",
  canonicalId: "ci_S33",
  reprints: ["set10-104"],
  cardType: "character",
  name: "Ares",
  version: "God of War",
  i18n: {
    en: {
      name: "Ares",
      version: "God of War",
      text: "Reckless CALL TO BATTLE Once during your turn, whenever you put a card under one of your characters or locations, you may ready chosen character. If you do, that character can't quest for the rest of this turn.",
    },
    de: {
      name: "Ares",
      version: "Gott des Krieges",
      text: "Impulsiv AUFRUF ZUM KAMPF Einmal während deines Zuges, wenn du eine Karte unter einen deiner Charaktere oder Orte legst, darfst du einen Charakter deiner Wahl bereit machen. Wenn du dies tust, kann jener in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Arès",
      version: "Dieu de la guerre",
      text: "Combattant APPEL AUX ARMES Une fois durant votre tour, lorsque vous placez une carte sous l'un de vos personnages ou de vos lieux, vous pouvez choisir un personnage et le redresser. Si vous le faites, le personnage ainsi choisi ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Ares",
      version: "Dio della Guerra",
      text: "Attaccabrighe ALLA BATTAGLIA Una volta durante il tuo turno, ogni volta che metti una carta sotto a uno dei tuoi personaggi o luoghi, puoi preparare un personaggio a tua scelta. Se lo fai, quel personaggio non può andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 104,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_1b9b2bd814d249f2ab8ae1db9949c045",
    tcgPlayer: 660339,
  },
  text: "Reckless CALL TO BATTLE Once during your turn, whenever you put a card under one of your characters or locations, you may ready chosen character. If you do, that character can't quest for the rest of this turn.",
  classifications: ["Storyborn", "Deity"],
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "ready",
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "3s2-1",
      name: "Reckless CALL TO BATTLE Once",
      text: "Reckless CALL TO BATTLE Once during your turn, whenever you put a card under one of your characters or locations, you may ready chosen character. If you do, that character can't quest for the rest of this turn.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
