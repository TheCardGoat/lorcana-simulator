import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellGenerousFairy: CharacterCard = {
  id: "0S4",
  canonicalId: "ci_CV5",
  reprints: ["set3-022", "set9-012"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Generous Fairy",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Generous Fairy",
      text: [
        {
          title: "MAKE A NEW FRIEND",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Großzügige Fee",
      text: [
        {
          title: "NEUE FREUNDE FINDEN",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Charakterkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "La Fée Clochette",
      version: "Fée généreuse",
      text: [
        {
          title: "NOUVELLE AMITIÉ",
          description:
            "Lorsque vous jouez ce personnage, regardez les 4 premières cartes de votre pioche. Vous pouvez révéler un personnage et l'ajouter à votre main. Remettez le reste sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Trilli",
      version: "Fata Generosa",
      text: [
        {
          title: "FARE AMICIZIA",
          description:
            "Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta personaggio tra quelle e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 12,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_6ec58a64abf84ea2968667aa02d50769",
    tcgPlayer: 649961,
  },
  text: [
    {
      title: "MAKE A NEW FRIEND",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "e6y-1",
      name: "MAKE A NEW FRIEND",
      text: "MAKE A NEW FRIEND When you play this character, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
