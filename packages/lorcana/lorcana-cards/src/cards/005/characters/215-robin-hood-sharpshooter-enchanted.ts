import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodSharpshooterEnchanted: CharacterCard = {
  id: "Uem",
  canonicalId: "ci_qwp",
  reprints: ["set5-118"],
  cardType: "character",
  name: "Robin Hood",
  version: "Sharpshooter",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Sharpshooter",
      text: [
        {
          title: "MY GREATEST PERFORMANCE",
          description:
            "Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.",
        },
      ],
    },
    de: {
      name: "Robin Hood",
      version: "Scharfschütze",
      text: [
        {
          title: "MEIN GRÖSSTER AUFTRITT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Aktionskarte daraus, die 6 oder weniger kostet, aufdecken und kostenlos ausspielen. Lege die restlichen Karten auf deinen Ablagestapel.",
        },
      ],
    },
    fr: {
      name: "Robin des Bois",
      version: "Tireur d'élite",
      text: [
        {
          title: "MON PLUS MERVEILLEUX EXPLOIT",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, regardez les 4 cartes du dessus de votre pioche. Parmi ces cartes, vous pouvez révéler et jouer gratuitement une carte Action coûtant 6 ou moins. Placez le reste dans votre défausse.",
        },
      ],
    },
    it: {
      name: "Robin Hood",
      version: "Tiratore Scelto",
      text: [
        {
          title: "LA MIA PIÙ GRANDE INTERPRETAZIONE",
          description:
            "Ogni volta che questo personaggio va all'avventura, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta azione con costo 6 o inferiore e giocarla gratis. Metti il resto nei tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d08869cde8294b0b9f73d0f7192e2335",
    tcgPlayer: 561984,
  },
  text: [
    {
      title: "MY GREATEST PERFORMANCE",
      description:
        "Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1w7-1",
      name: "MY GREATEST PERFORMANCE",
      text: "MY GREATEST PERFORMANCE Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
