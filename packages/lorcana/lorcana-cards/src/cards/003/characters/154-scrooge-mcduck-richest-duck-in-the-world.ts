import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckRichestDuckInTheWorld: CharacterCard = {
  id: "wAM",
  canonicalId: "ci_SyL",
  reprints: ["set3-154"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Richest Duck in the World",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "Richest Duck in the World",
      text: [
        {
          title: "I'M GOING HOME!",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
        {
          title: "I DIDN'T GET RICH BY BEING STUPID",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may play an item for free.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Reichste Ente der Welt",
      text: [
        {
          title: "ICH GEHE NACH HAUSE!",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
        {
          title: "ICH BIN JA NICHT REICH GEWORDEN, WEIL ICH DUMM BIN",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einen Gegenstand kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Canard le plus riche du monde",
      text: [
        {
          title: "JE RENTRE CHEZ MOI",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
        {
          title: "JE NE SUIS PAS DEVENU RICHE EN ÉTANT STUPIDE",
          description:
            "Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, vous pouvez jouer un objet gratuitement.",
        },
      ],
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Papero più Ricco del Mondo",
      text: [
        {
          title: "VADO A CASA!",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
        {
          title: "NON SAREI DIVENTATO RICCO SE FOSSI STUPIDO",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi giocare un oggetto gratis.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 154,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ee9f19ba64f54bf78ba3cf40e0cac256",
    tcgPlayer: 539168,
  },
  text: [
    {
      title: "I'M GOING HOME!",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
    {
      title: "I DIDN'T GET RICH BY BEING STUPID",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may play an item for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1f8-1",
      text: "I'M GOING HOME! During your turn, this character gains Evasive.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "item",
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1f8-2",
      name: "I DIDN'T GET RICH BY BEING STUPID",
      text: "I DIDN'T GET RICH BY BEING STUPID During your turn, whenever this character banishes another character in a challenge, you may play an item for free.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
