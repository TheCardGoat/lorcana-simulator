import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaFightingPrince: CharacterCard = {
  id: "7KP",
  canonicalId: "ci_7KP",
  reprints: ["set3-192"],
  cardType: "character",
  name: "Simba",
  version: "Fighting Prince",
  i18n: {
    en: {
      name: "Simba",
      version: "Fighting Prince",
      text: [
        {
          title: "STEP DOWN OR FIGHT",
          description:
            "When you play this character and whenever he banishes another character in a challenge during your turn, you may choose one: • Draw 2 cards, then choose and discard 2 cards. • Deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Kämpfender Prinz",
      text: [
        {
          title: "DANK AB ODER KÄMPF",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du eine Möglichkeit auswählen: • Ziehe 2 Karten. Wähle danach 2 Karten aus deiner Hand und wirf sie ab. • Füge einem Charakter deiner Wahl 2 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Simba",
      version: "Prince combattif",
      text: [
        {
          title: "TU TE SOUMETS OU TU TE BATS",
          description:
            "Chaque fois que vous jouez ce personnage ou qu'il en bannit un autre via un défi durant votre tour, choisissez entre: • Piochez 2 cartes, puis choisissez et défaussez 2 cartes. • Choisissez un personnage et infligez-lui 2 dommages.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Principe Combattente",
      text: [
        {
          title: "O TI FAI DA PARTE, O DOVRAI AFFRONTARMI",
          description:
            "Quando giochi questo personaggio e ogni volta che esilia un altro personaggio in una sfida durante il tuo turno, scegli uno: • Pesca 2 carte, poi scegli e scarta 2 carte. • Infliggi 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "003",
  cardNumber: 192,
  rarity: "common",
  cost: 7,
  strength: 5,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_95033988f96048348b305ef2c6293ac6",
    tcgPlayer: 539115,
  },
  text: [
    {
      title: "STEP DOWN OR FIGHT",
      description:
        "When you play this character and whenever he banishes another character in a challenge during your turn, you may choose one: • Draw 2 cards, then choose and discard 2 cards. • Deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  missingTests: true,
  abilities: [
    {
      effect: {
        optionLabels: [
          "Draw 2 cards, then choose and discard 2 cards.",
          "Deal 2 damage to chosen character.",
        ],
        options: [
          {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 2,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
        ],
        type: "choice",
      },
      id: "1sf-1",
      name: "STEP DOWN OR FIGHT When you play this character and",
      text: "STEP DOWN OR FIGHT When you play this character and whenever he banishes another character in a challenge during your turn, you may choose one: • Draw 2 cards, then choose and discard 2 cards. • Deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
