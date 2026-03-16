import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceSavvySailor: CharacterCard = {
  id: "4E5",
  canonicalId: "ci_4E5",
  reprints: ["set6-161"],
  cardType: "character",
  name: "Alice",
  version: "Savvy Sailor",
  i18n: {
    en: {
      name: "Alice",
      version: "Savvy Sailor",
      text: [
        {
          title: "Ward",
        },
        {
          title: "AHOY!",
          description:
            "Whenever this character quests, another chosen character of yours gets +1 {L} and gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Gerissene Seglerin",
      text: "Behütet AHOI! Jedes Mal, wenn dieser Charakter erkundet, wähle einen deiner anderen Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges +1 und Behütet.",
    },
    fr: {
      name: "Alice",
      version: "Marin avisée",
      text: "Hors d'atteinte NAVIRE EN VUE! Chaque fois que ce personnage est envoyé à l'aventure, choisissez un autre de vos personnages qui gagne +1 et Hors d'atteinte jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Alice",
      version: "Esperta Marinaia",
      text: "Protetto AHOY! Ogni volta che questo personaggio va all'avventura, un tuo altro personaggio a tua scelta riceve +1 e ottiene Protetto fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 161,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_dc30f4ddffb84e7daf742ee323cfb552",
    tcgPlayer: 591979,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "AHOY!",
      description:
        "Whenever this character quests, another chosen character of yours gets +1 {L} and gains Ward until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1hn-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            modifier: 1,
            stat: "lore",
            target: "SELF",
            type: "modify-stat",
          },
          {
            keyword: "Ward",
            target: "SELF",
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "1hn-2",
      name: "AHOY!",
      text: "AHOY! Whenever this character quests, another chosen character of yours gets +1 {L} and gains Ward until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
