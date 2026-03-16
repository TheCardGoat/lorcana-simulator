import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinCleverClairvoyant: CharacterCard = {
  id: "qhP",
  canonicalId: "ci_qhP",
  reprints: ["set7-067"],
  cardType: "character",
  name: "Merlin",
  version: "Clever Clairvoyant",
  i18n: {
    en: {
      name: "Merlin",
      version: "Clever Clairvoyant",
      text: [
        {
          title: "PRESTIDIGITONIUM",
          description:
            "Whenever this character quests, name a card, then reveal the top card of your deck. If it's the named card, put it into your inkwell facedown and exerted. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Kluger Hellseher",
      text: [
        {
          title: "PRESTODIGITONIUM",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, benenne eine Karte und decke danach die oberste Karte deines Decks auf. Falls es die benannte Karte ist, darfst du jene verdeckt und erschöpft in deinen Tintenvorrat legen. Falls nicht, lege sie zurück auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "Enchanteur clairvoyant",
      text: [
        {
          title: "PRESTIDIGITONIUM",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, nommez une carte et révélez la carte du dessus de votre pioche. S'il s'agit de la carte nommée, placez-la dans votre réserve d'encre, face cachée et épuisée. Sinon, replacez-la sur votre pioche.",
        },
      ],
    },
    it: {
      name: "Merlino",
      version: "Chiaroveggente Brillante",
      text: [
        {
          title: "PRESTIDIGITORIUM",
          description:
            "Ogni volta che questo personaggio va all'avventura, nomina una carta, poi rivela la prima carta del tuo mazzo. Se è la carta nominata, aggiungila al tuo calamaio, a faccia in giù e impegnata. Altrimenti, mettila in cima al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Sword in the Stone",
  set: "007",
  cardNumber: 67,
  rarity: "rare",
  cost: 1,
  strength: 0,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1acf47f176fd481791f5e79e900fefe6",
    tcgPlayer: 618318,
  },
  text: [
    {
      title: "PRESTIDIGITONIUM",
      description:
        "Whenever this character quests, name a card, then reveal the top card of your deck. If it's the named card, put it into your inkwell facedown and exerted. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "1c1-1",
      text: "PRESTIDIGITONIUM Whenever this character quests, name a card, then reveal the top card of your deck. If it's the named card, put it into your inkwell facedown and exerted. Otherwise, put it on the top of your deck.",
      name: "PRESTIDIGITONIUM",
      effect: {
        steps: [
          {
            type: "name-a-card",
          },
          {
            target: "CONTROLLER",
            type: "reveal-top-card",
          },
          {
            condition: {
              type: "revealed-matches-named",
            },
            else: {
              type: "put-on-top",
              source: "revealed",
            },
            then: {
              type: "put-into-inkwell",
              source: "revealed",
              exerted: true,
            },
            type: "conditional",
          },
        ],
        type: "sequence",
      },
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
