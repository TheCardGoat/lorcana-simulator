import type { CharacterCard } from "@tcg/lorcana-types";

export const jimHawkinsHonorablePirate: CharacterCard = {
  id: "I2f",
  canonicalId: "ci_I2f",
  reprints: ["set6-025"],
  cardType: "character",
  name: "Jim Hawkins",
  version: "Honorable Pirate",
  i18n: {
    en: {
      name: "Jim Hawkins",
      version: "Honorable Pirate",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "HIRE A CREW",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal any number of Pirate character cards and put them into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Jim Hawkins",
      version: "Ehrenhafter Pirat",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) EINE MANNSCHAFT ANHEUERN Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst beliebig viele Piraten daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Jim Hawkins",
      version: "Pirate honorable",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) RECRUTER UN ÉQUIPAGE Lorsque vous jouez ce personnage, regardez les 4 cartes du dessus de votre pioche. Parmi ces cartes, vous pouvez révéler et placer dans votre main autant de personnages Pirate que vous le souhaitez. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Jim Hawkins",
      version: "Pirata Onorevole",
      text: "Guardiano INGAGGIARE UNA CIURMA Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare un qualsiasi numero di carte personaggio Pirata e aggiungerle alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["amber"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 25,
  rarity: "common",
  cost: 7,
  strength: 4,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5de4864e187a4039b3e47b6ada93b801",
    tcgPlayer: 578171,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "HIRE A CREW",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal any number of Pirate character cards and put them into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate", "Captain"],
  abilities: [
    {
      id: "1el-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "1el-2",
      name: "HIRE A CREW",
      text: "HIRE A CREW When you play this character, look at the top 4 cards of your deck. You may reveal any number of Pirate character cards and put them into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
