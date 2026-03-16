import type { CharacterCard } from "@tcg/lorcana-types";

export const basilSecretInformer: CharacterCard = {
  id: "10Q",
  canonicalId: "ci_10Q",
  reprints: ["set7-093"],
  cardType: "character",
  name: "Basil",
  version: "Secret Informer",
  i18n: {
    en: {
      name: "Basil",
      version: "Secret Informer",
      text: [
        {
          title: "DRAW THEM OUT",
          description:
            "Whenever this character quests, opposing damaged characters gain Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Basil",
      version: "Geheimer Informant",
      text: [
        {
          title: "LOCKE SIE HERAUS",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten gegnerische beschädigte Charaktere in ihrem nächsten Zug Impulsiv. (Sie können nicht erkunden und müssen herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Basil",
      version: "Informateur secret",
      text: [
        {
          title: "LES APPÂTER",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, les personnages adverses avec au moins un dommage gagnent Combattant durant leur prochain tour. (Ils ne peuvent pas être envoyés à l'aventure et doivent défier s'il le peuvent.)",
        },
      ],
    },
    it: {
      name: "Basil",
      version: "Informatore Segreto",
      text: [
        {
          title: "ATTIRARLI ALLO SCOPERTO",
          description:
            "Ogni volta che questo personaggio va all'avventura, i personaggi danneggiati avversari ottengono Attaccabrighe durante il loro prossimo turno. (Non possono andare all'avventura e devono sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "007",
  cardNumber: 93,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_06d0c264e2e34e248fcce5ce2e0d3efe",
    tcgPlayer: 619456,
  },
  text: [
    {
      title: "DRAW THEM OUT",
      description:
        "Whenever this character quests, opposing damaged characters gain Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "lk0-1",
      name: "DRAW THEM OUT",
      text: "DRAW THEM OUT Whenever this character quests, opposing damaged characters gain Reckless during their next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
