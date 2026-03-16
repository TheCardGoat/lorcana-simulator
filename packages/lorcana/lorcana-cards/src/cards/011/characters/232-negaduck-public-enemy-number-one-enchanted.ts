import type { CharacterCard } from "@tcg/lorcana-types";

export const negaduckPublicEnemyNumberOneEnchanted: CharacterCard = {
  id: "MDh",
  canonicalId: "ci_bMZ",
  reprints: ["set11-116"],
  cardType: "character",
  name: "Negaduck",
  version: "Public Enemy Number One",
  i18n: {
    en: {
      name: "Negaduck",
      version: "Public Enemy Number One",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "STICKY FINGERS",
          description:
            "Whenever this character challenges another character, each opponent loses 1 lore and you gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Fiesoduck",
      version: "Bösewicht Nummer Eins",
      text: "Gestaltwandel 3 LANGFINGER Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, verlieren alle gegnerischen Mitspielenden je 1 Legende und du sammelst 1 Legende.",
    },
    fr: {
      name: "Sinister Mask",
      version: "Ennemi public numéro un",
      text: "Alter 3 CLEPTOMANE Chaque fois que ce personnage en défie un autre, chaque adversaire perd 1 éclat de Lore et vous gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Negaduck",
      version: "Nemico Pubblico Numero Uno",
      text: "Trasformazione 3 MANI LUNGHE Ogni volta che questo personaggio sfida un altro personaggio, ogni avversario perde 1 leggenda e tu ottieni 1 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 232,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_580ca4f029554dd68409aac983fdae69",
    tcgPlayer: 677164,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "STICKY FINGERS",
      description:
        "Whenever this character challenges another character, each opponent loses 1 lore and you gain 1 lore.",
    },
  ],
  classifications: ["Floodborn", "Super", "Villain"],
  abilities: [
    {
      id: "hmm-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "hmm-2",
      effect: {
        steps: [
          {
            amount: 1,
            target: "EACH_OPPONENT",
            type: "lose-lore",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      name: "STICKY FINGERS",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "STICKY FINGERS Whenever this character challenges another character, each opponent loses 1 lore and you gain 1 lore.",
    },
  ],
};
