import type { CharacterCard } from "@tcg/lorcana-types";

export const goofySuperGoofEnchanted: CharacterCard = {
  id: "8aU",
  canonicalId: "ci_EA0",
  reprints: ["set4-107"],
  cardType: "character",
  name: "Goofy",
  version: "Super Goof",
  i18n: {
    en: {
      name: "Goofy",
      version: "Super Goof",
      text: [
        {
          title: "Rush",
        },
        {
          title: "SUPER PEANUT POWERS",
          description: "Whenever this character challenges another character, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Supergoof",
      text: "Rasant SUPER-ERDNUSS-KRÄFTE Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Dingo",
      version: "Super Dingo",
      text: "Charge POUVOIR DES SUPER CACAHUÈTES Chaque fois que ce personnage en défie un autre, gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Pippo",
      version: "Superpippo",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) POTERE DELLE SUPER ARACHIDI Ogni volta che questo personaggio sfida un altro personaggio, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "004",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3088ee50256240d0b22c045f593df9a8",
    tcgPlayer: 550542,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "SUPER PEANUT POWERS",
      description: "Whenever this character challenges another character, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1n2-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "1n2-2",
      name: "SUPER PEANUT POWERS",
      text: "SUPER PEANUT POWERS Whenever this character challenges another character, gain 2 lore.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
