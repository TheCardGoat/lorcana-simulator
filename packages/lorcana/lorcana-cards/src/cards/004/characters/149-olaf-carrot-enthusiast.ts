import type { CharacterCard } from "@tcg/lorcana-types";

export const olafCarrotEnthusiast: CharacterCard = {
  id: "fW1",
  canonicalId: "ci_fW1",
  reprints: ["set4-149"],
  cardType: "character",
  name: "Olaf",
  version: "Carrot Enthusiast",
  i18n: {
    en: {
      name: "Olaf",
      version: "Carrot Enthusiast",
      text: [
        {
          title:
            "Shift: Discard an item card (You may discard an item card to play this on top of one of your characters named Olaf.)",
        },
        {
          title: "CARROTS ALL AROUND!",
          description:
            "Whenever he quests, each of your other characters gets +{S} equal to this character's {S} this turn.",
        },
      ],
    },
    de: {
      name: "Olaf",
      version: "Karotten-Liebhaber",
      text: "Gestaltwandel: Wirf 1 Gegenstandskarte ab (Du kannst 1 Gegenstandskarte abwerfen, um diesen Charakter auf einen deiner Olaf-Charaktere auszuspielen.) KAROTTEN ÜBERALL! Jedes Mal, wenn er erkundet, erhalten deine anderen Charaktere in diesem Zug + in Höhe der dieses Charakters.",
    },
    fr: {
      name: "Olaf",
      version: "Fan de carottes",
      text: "Alter: Défaussez une carte Objet (Vous pouvez défausser une carte Objet pour jouer ce personnage sur l'un de vos personnages Olaf.) DES CAROTTES PARTOUT! Chaque fois que vous envoyez ce personnage à l'aventure, ajoutez sa à la de vos autres personnages pour le reste de ce tour.",
    },
    it: {
      name: "Olaf",
      version: "Appassionato di Carote",
      text: "Trasformazione: Scarta una carta oggetto (Puoi scartare una carta oggetto per giocare questa carta sopra a uno dei tuoi personaggi chiamato Olaf.) CAROTE OVUNQUE! Ogni volta che questo personaggio va all'avventura, ognuno dei tuoi altri personaggi riceve + pari alla di questo personaggio per questo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f4f749bc095641e1b953b1784a6efa51",
    tcgPlayer: 547767,
  },
  text: [
    {
      title:
        "Shift: Discard an item card (You may discard an item card to play this on top of one of your characters named Olaf.)",
    },
    {
      title: "CARROTS ALL AROUND!",
      description:
        "Whenever he quests, each of your other characters gets +{S} equal to this character's {S} this turn.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [],
};
