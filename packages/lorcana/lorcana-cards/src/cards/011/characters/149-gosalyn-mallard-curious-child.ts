import type { CharacterCard } from "@tcg/lorcana-types";

export const gosalynMallardCuriousChild: CharacterCard = {
  id: "wv3",
  canonicalId: "ci_wv3",
  reprints: ["set11-149"],
  cardType: "character",
  name: "Gosalyn Mallard",
  version: "Curious Child",
  i18n: {
    en: {
      name: "Gosalyn Mallard",
      version: "Curious Child",
      text: [
        {
          title: "KEEN GEAR",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Kiki Erpel",
      version: "Neugieriges Kind",
      text: [
        {
          title: "IST JA IRRE",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Gegenstandskarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Poucinette Colvert",
      version: "Jeune curieuse",
      text: [
        {
          title: "ÉQUIPEMENT DE POINTE",
          description:
            "Lorsque vous jouez ce personnage, regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler une carte Objet parmi elles et l'ajouter à votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Ocalina Mallard",
      version: "Bambina Curiosa",
      text: [
        {
          title: "CHE SCHIANTO",
          description:
            "Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta oggetto e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dc802d9673ac4bd3ae7f6976a4faae09",
    tcgPlayer: 677137,
  },
  text: [
    {
      title: "KEEN GEAR",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "agy-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      name: "KEEN GEAR",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "KEEN GEAR When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
};
