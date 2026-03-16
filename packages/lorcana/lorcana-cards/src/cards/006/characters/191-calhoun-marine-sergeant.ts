import type { CharacterCard } from "@tcg/lorcana-types";

export const calhounMarineSergeant: CharacterCard = {
  id: "NLA",
  canonicalId: "ci_NLA",
  reprints: ["set6-191"],
  cardType: "character",
  name: "Calhoun",
  version: "Marine Sergeant",
  i18n: {
    en: {
      name: "Calhoun",
      version: "Marine Sergeant",
      text: [
        {
          title: "Resist +1",
        },
        {
          title: "LEVEL UP",
          description:
            "During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Sergeant Calhoun",
      version: "Marinefeldwebel",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) AUFLEVELN Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Calhoun",
      version: "Sergent",
      text: "Résistance +1 (Les dommages qui sont infligés à ce personnage sont réduits de 1.) NIVEAU SUPÉRIEUR Pendant votre tour, chaque fois que ce personnage en bannit un autre via un défi, gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Calhoun",
      version: "Sergente Marine",
      text: "Resistere +1 SALIRE DI LIVELLO Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, ottieni 2 leggenda.",
    },
  },
  inkType: ["steel"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 191,
  rarity: "rare",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_f6c83c36dbe04bdcb19ee7bd9d0479cd",
    tcgPlayer: 592017,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "LEVEL UP",
      description:
        "During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "10g-1",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "10g-2",
      name: "LEVEL UP",
      text: "LEVEL UP During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
