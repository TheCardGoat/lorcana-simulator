import type { ActionCard } from "@tcg/lorcana-types";

export const imStuck: ActionCard = {
  id: "woM",
  canonicalId: "ci_KhI",
  reprints: ["set2-063", "set9-063"],
  cardType: "action",
  name: "I'm Stuck!",
  i18n: {
    en: {
      name: "I'm Stuck!",
      text: "Chosen exerted character can't ready at the start of their next turn.",
    },
    de: {
      name: "Ich sitze fest!",
      text: "Wähle einen erschöpften Charakter. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
    },
    fr: {
      name: "Je suis coincé !",
      text: "Choisissez un personnage épuisé, il ne se redressera pas au début de son prochain tour.",
    },
    it: {
      name: "Sono Bloccato!",
      text: "Un personaggio impegnato a tua scelta non si può preparare all'inizio del suo prossimo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "009",
  cardNumber: 63,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8dedb2a4e41e48039aea2bca6938d28f",
    tcgPlayer: 650007,
  },
  text: "Chosen exerted character can't ready at the start of their next turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "restriction",
        duration: "until-start-of-next-turn",
        restriction: "cant-ready",
        target: "CHOSEN_EXERTED_CHARACTER",
      },
    },
  ],
};
