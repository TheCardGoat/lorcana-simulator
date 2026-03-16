import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckLivelyPirate: CharacterCard = {
  id: "z2w",
  canonicalId: "ci_z2w",
  reprints: ["set7-098"],
  cardType: "character",
  name: "Donald Duck",
  version: "Lively Pirate",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Lively Pirate",
      text: [
        {
          title: "DUCK OF ACTION",
          description:
            "Whenever this character is challenged, you may return an action card that isn't a song card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Lebhafter Pirat",
      text: [
        {
          title: "ENTE DER AKTION",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, darfst du 1 Aktionskarte, die keine Liedkarte ist, aus deinem Ablagestapel zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Pirate plein d'entrain",
      text: [
        {
          title: "CANARD D'ACTION",
          description:
            "Chaque fois que ce personnage est défié, vous pouvez renvoyer une carte Action qui n'est pas une chanson de votre défausse dans votre main.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Pirata Vivace",
      text: [
        {
          title: "PAPERO D'AZIONE",
          description:
            "Ogni volta che questo personaggio viene sfidato, puoi riprendere in mano una carta azione che non è una carta canzone dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "007",
  cardNumber: 98,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3c1ded27230c410bb3f454c406bab158",
    tcgPlayer: 619458,
  },
  text: [
    {
      title: "DUCK OF ACTION",
      description:
        "Whenever this character is challenged, you may return an action card that isn't a song card from your discard to your hand.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate"],
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
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "17f-1",
      name: "DUCK OF ACTION",
      text: "DUCK OF ACTION Whenever this character is challenged, you may return an action card that isn't a song card from your discard to your hand.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
