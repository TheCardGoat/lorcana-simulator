import type { ActionCard } from "@tcg/lorcana-types";

export const circleOfLifeEnchanted: ActionCard = {
  id: "pVb",
  canonicalId: "ci_gzm",
  reprints: ["set9-026"],
  cardType: "action",
  name: "Circle of Life",
  i18n: {
    en: {
      name: "Circle of Life",
      text: [
        {
          title: "Sing Together 8",
        },
        {
          title: "Play a character from your discard for free.",
        },
      ],
    },
    de: {
      name: "Der ewige Kreis",
      text: "Gemeinsam singen 8 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 8 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Spiele eine Charakterkarte kostenlos aus deinem Ablagestapel aus.",
    },
    fr: {
      name: "L'histoire de la vie",
      text: [
        {
          title: "À",
          description: "l'unisson 8 Jouez gratuitement un personnage de votre défausse.",
        },
      ],
    },
    it: {
      name: "Il Cerchio della Vita",
      text: [
        {
          title: "Cantare Insieme 8",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 8 o superiore può per cantare questa canzone gratis.) Gioca un personaggio dai tuoi scarti gratis.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 225,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  inkable: true,
  externalIds: {
    lorcast: "crd_ee377c93c09341fe808b8582cbded0f2",
    tcgPlayer: 649230,
  },
  text: [
    {
      title: "Sing Together 8",
    },
    {
      title: "Play a character from your discard for free.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        cardType: "character",
        cost: "free",
        from: "discard",
        type: "play-card",
      },
      id: "1bo-1",
      text: "Sing Together 8 Play a character from your discard for free.",
      type: "action",
    },
  ],
};
