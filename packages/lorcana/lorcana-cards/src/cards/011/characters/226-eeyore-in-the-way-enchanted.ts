import type { CharacterCard } from "@tcg/lorcana-types";

export const eeyoreInTheWayEnchanted: CharacterCard = {
  id: "BB1",
  canonicalId: "ci_e9D",
  reprints: ["set11-045"],
  cardType: "character",
  name: "Eeyore",
  version: "In the Way",
  i18n: {
    en: {
      name: "Eeyore",
      version: "In the Way",
      text: [
        {
          title: "THANKS FOR NOTICIN' ME",
          description:
            "For each exerted character in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "SORRY ABOUT THAT",
          description:
            "When you play this character, for each opposing player, you may choose a character of theirs. They can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "I-Aah",
      version: "Im Weg",
      text: [
        {
          title: "DANKE FÜR DIE BEACHTUNG",
          description:
            "Für jeden erschöpften Charakter im Spiel zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "DAS TUT MIR LEID",
          description:
            "Wenn du diesen Charakter ausspielst, wähle für jede gegnerische Person je einen ihrer Charaktere. Jene werden zu Beginn ihres nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Bourriquet",
      version: "En travers du chemin",
      text: [
        {
          title: "MERCI DE T'INTÉRESSER À MOI",
          description:
            "Jouer ce personnage vous coûte 1 de moins pour chaque personnage épuisé en jeu.",
        },
        {
          title: "DÉSOLÉ POUR ÇA",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir l'un des personnages de chaque adversaire. Ces personnages ne se redressent pas au début de leur prochain tour.",
        },
      ],
    },
    it: {
      name: "Ih-Oh",
      version: "In Mezzo",
      text: [
        {
          title: "GRAZIE PER AVERMI NOTATO",
          description:
            "Per ogni personaggio impegnato in gioco, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "MI DISPIACE",
          description:
            "Quando giochi questo personaggio, per ogni giocatore avversario, puoi scegliere un suo personaggio. Quel personaggio non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 226,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 9,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_758bab20496f4673991e53ac59f1bcaa",
    tcgPlayer: 675279,
  },
  text: [
    {
      title: "THANKS FOR NOTICIN' ME",
      description: "For each exerted character in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "SORRY ABOUT THAT",
      description:
        "When you play this character, for each opposing player, you may choose a character of theirs. They can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1ey-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "action",
      text: "THANKS FOR NOTICIN' ME For each exerted character in play, you pay 1 {I} less to play this character.",
    },
    {
      id: "1ey-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          restriction: "cant-ready",
          target: "SELF",
          type: "restriction",
          duration: "their-next-turn",
        },
        type: "optional",
      },
      name: "SORRY ABOUT THAT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SORRY ABOUT THAT When you play this character, for each opposing player, you may choose a character of theirs. They can't ready at the start of their next turn.",
    },
  ],
};
