import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentVexedPartygoer: CharacterCard = {
  id: "3T9",
  canonicalId: "ci_3T9",
  reprints: ["set5-051"],
  cardType: "character",
  name: "Maleficent",
  version: "Vexed Partygoer",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Vexed Partygoer",
      text: [
        {
          title: "WHAT AN AWKWARD SITUATION",
          description:
            "Whenever this character quests, you may choose and discard a card to return chosen character, item, or location with cost 3 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Malefiz",
      version: "Unerwünschter Gast",
      text: [
        {
          title: "WAS FÜR EINE PEINLICHE SITUATION",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du eine Karte von deiner Hand auswählen und abwerfen, um einen Charakter, Gegenstand oder Ort deiner Wahl, der 3 oder weniger kostet, auf die zugehörige Hand zurückzuschicken.",
        },
      ],
    },
    fr: {
      name: "Maléfique",
      version: "Fêtarde vexée",
      text: [
        {
          title: "UN FÂCHEUX OUBLI",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir et défausser une carte. Si vous le faites, choisissez un personnage, objet ou lieu ayant un coût de 3 ou moins et renvoyez-le dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Malefica",
      version: "Ospite Seccata",
      text: [
        {
          title: "CHE SITUAZIONE IMBARAZZANTE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi scegliere e scartare una carta per far riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo a tua scelta con costo 3 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 51,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ec332a15608840ad942e800aa7b17294",
    tcgPlayer: 561614,
  },
  text: [
    {
      title: "WHAT AN AWKWARD SITUATION",
      description:
        "Whenever this character quests, you may choose and discard a card to return chosen character, item, or location with cost 3 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1ib-1",
      name: "WHAT AN AWKWARD SITUATION",
      text: "WHAT AN AWKWARD SITUATION Whenever this character quests, you may choose and discard a card to return chosen character, item, or location with cost 3 or less to their player's hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
