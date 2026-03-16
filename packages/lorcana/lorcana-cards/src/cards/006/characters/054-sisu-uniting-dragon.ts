import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuUnitingDragon: CharacterCard = {
  id: "gRx",
  canonicalId: "ci_gRx",
  reprints: ["set6-054"],
  cardType: "character",
  name: "Sisu",
  version: "Uniting Dragon",
  i18n: {
    en: {
      name: "Sisu",
      version: "Uniting Dragon",
      text: [
        {
          title: "TRUST BUILDS TRUST",
          description:
            "Whenever this character quests, reveal the top card of your deck. If it's a Dragon character card, put it into your hand and repeat this effect. Otherwise, put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Sisu",
      version: "Vereinigender Drache",
      text: [
        {
          title: "VERTRAUEN BRINGT VERTRAUEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, decke die oberste Karte deines Decks auf. Falls sie ein Drache ist, nimm sie auf die Hand und wiederhole diesen Effekt. Falls nicht, lege sie zurück auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Sisu",
      version: "Dragon fédérateur",
      text: [
        {
          title: "LA CONFIANCE ENGENDRE LA CONFIANCE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, révélez la carte du dessus de votre pioche. Si la carte révélée est un personnage Dragon, placez-la dans votre main et répétez cet effet. Sinon, remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Sisu",
      version: "Drago Unificante",
      text: [
        {
          title: "LA FIDUCIA GENERA FIDUCIA",
          description:
            "Ogni volta che questo personaggio va all'avventura, rivela la prima carta del tuo mazzo. Se è una carta personaggio Drago, aggiungila alla tua mano e ripeti questo effetto. Altrimenti, mettila in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Raya and the Last Dragon",
  set: "006",
  cardNumber: 54,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d84325bc9e814a69b6789f424c3a1eb8",
    tcgPlayer: 591978,
  },
  text: [
    {
      title: "TRUST BUILDS TRUST",
      description:
        "Whenever this character quests, reveal the top card of your deck. If it's a Dragon character card, put it into your hand and repeat this effect. Otherwise, put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "it’s a Dragon character card",
          type: "if",
        },
        then: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      id: "ojg-1",
      name: "TRUST BUILDS TRUST",
      text: "TRUST BUILDS TRUST Whenever this character quests, reveal the top card of your deck. If it’s a Dragon character card, put it into your hand and repeat this effect. Otherwise, put it on either the top or the bottom of your deck.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
