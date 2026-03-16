import type { ActionCard } from "@tcg/lorcana-types";

export const ursulasPlan: ActionCard = {
  id: "SrO",
  canonicalId: "ci_SrO",
  reprints: ["set4-063"],
  cardType: "action",
  name: "Ursula’s Plan",
  i18n: {
    en: {
      name: "Ursula’s Plan",
      text: "Each opponent chooses and exerts one of their characters. Those characters can't ready at the start of their next turn.",
    },
    de: {
      name: "Ursulas Plan",
      text: "Alle gegnerischen Mitspielenden wählen je einen ihrer Charaktere und erschöpfen ihn. Diese werden zu Beginn ihres nächsten Zuges nicht bereit gemacht.",
    },
    fr: {
      name: "Plan d'Ursula",
      text: "Chaque adversaire choisit un de ses personnages et l'épuise. Ces personnages ne se redressent pas au début de leur prochain tour.",
    },
    it: {
      name: "Il Piano di Ursula",
      text: "Ogni avversario sceglie e impegna uno dei suoi personaggi. Questi personaggi non si possono preparare all'inizio del loro prossimo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 63,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_d06befe89918438384a8d38e7acea2bd",
    tcgPlayer: 550572,
  },
  text: "Each opponent chooses and exerts one of their characters. Those characters can't ready at the start of their next turn.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            chosenBy: "opponent",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            duration: "until-start-of-next-turn",
            restriction: "cant-ready",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
        ],
      },
      id: "ygy-1",
      text: "Each opponent chooses and exerts one of their characters. Those characters can't ready at the start of their next turn.",
      type: "action",
    },
  ],
};
