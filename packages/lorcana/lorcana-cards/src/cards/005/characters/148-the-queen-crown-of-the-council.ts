import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenCrownOfTheCouncil: CharacterCard = {
  id: "05o",
  canonicalId: "ci_05o",
  reprints: ["set5-148"],
  cardType: "character",
  name: "The Queen",
  version: "Crown of the Council",
  i18n: {
    en: {
      name: "The Queen",
      version: "Crown of the Council",
      text: [
        {
          title: "Ward",
        },
        {
          title: "GATHERER OF THE WICKED",
          description:
            "When you play this character, look at the top 3 cards of your deck. You may reveal any number of character cards named The Queen and put them into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Die Krone des Rats",
      text: "Behütet VERSAMMLERIN DER ÜBELTÄTER Wenn du diesen Charakter ausspielst, darfst du dir die obersten 3 Karten deines Decks anschauen. Du darfst beliebig viele Die-Königin-Charakterkarten daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "La Reine",
      version: "À la tête du Conseil",
      text: "Hors d'atteinte RÉUNIR LES VILAINS Lorsque vous jouez ce personnage, regardez les 3 cartes du dessus de votre pioche. Vous pouvez révéler et placer dans votre main autant de cartes Personnage La Reine que vous souhaitez. Remettez le reste des cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Regina",
      version: "A Capo del Consiglio",
      text: "Protetto ADUNATRICE DI CATTIVI Quando giochi questo personaggio, guarda le prime 3 carte del tuo mazzo. Puoi rivelare un qualsiasi numero di carte personaggio chiamate Regina e aggiungerle alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 148,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_65f44d7a61bc416ebc68806cea7f39e2",
    tcgPlayer: 561969,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "GATHERER OF THE WICKED",
      description:
        "When you play this character, look at the top 3 cards of your deck. You may reveal any number of character cards named The Queen and put them into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "vdv-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "vdv-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      name: "GATHERER OF THE WICKED",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GATHERER OF THE WICKED When you play this character, look at the top 3 cards of your deck. You may reveal any number of character cards named The Queen and put them into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
};
