import { describe, expect, it } from "bun:test";
import { stripReminderText } from "../utils/reminder-text";

describe("stripReminderText", () => {
  it("removes song reminder text across locales", () => {
    expect(
      stripReminderText(
        "(A character with cost 2 or more can to sing this song for free.) Draw a card.",
        "en",
      ),
    ).toBe("Draw a card.");

    expect(
      stripReminderText(
        "(Du kannst einen Charakter, der 2 oder mehr kostet, , damit er dieses Lied kostenlos singt.) Ziehe 1 Karte.",
        "de",
      ),
    ).toBe("Ziehe 1 Karte.");

    expect(
      stripReminderText(
        "(Vous pouvez un personnage coûtant 2 ou plus pour chanter cette chanson gratuitement.) Piochez 1 carte.",
        "fr",
      ),
    ).toBe("Piochez 1 carte.");

    expect(
      stripReminderText(
        "(Un personaggio con costo 2 o più può cantare questa canzone gratuitamente.) Pesca una carta.",
        "it",
      ),
    ).toBe("Pesca una carta.");
  });

  it("removes standalone keyword reminder text but keeps the keyword label", () => {
    expect(
      stripReminderText(
        "Evasive (Only characters with Evasive can challenge this character.)",
        "en",
      ),
    ).toBe("Evasive");

    expect(
      stripReminderText(
        "Shift 4 {I} (You may pay 4 {I} to play this on top of one of your characters named Elsa.)",
        "en",
      ),
    ).toBe("Shift 4 {I}");

    expect(
      stripReminderText("Singer 3 (This character counts as cost 3 to sing songs.)", "en"),
    ).toBe("Singer 3");
  });

  it("keeps mixed card text while stripping matching reminder text", () => {
    expect(
      stripReminderText(
        "Rush (This character can challenge the turn they're played.)\nWEAKEN THE CAULDRON When you play this character, draw a card.",
        "en",
      ),
    ).toBe("Rush\nWEAKEN THE CAULDRON When you play this character, draw a card.");
  });

  it("removes inline granted keyword reminder text", () => {
    expect(
      stripReminderText(
        "Chosen character gains Ward until the start of your next turn. (Opponents can't choose them except to challenge.)",
        "en",
      ),
    ).toBe("Chosen character gains Ward until the start of your next turn.");

    expect(
      stripReminderText(
        "Chosen character gains Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)",
        "en",
      ),
    ).toBe("Chosen character gains Resist +2 until the start of your next turn.");
  });

  it("keeps unrelated parentheticals intact", () => {
    const text =
      "When you play this character, if you used Shift to play her (instead of paying her cost), draw a card.";

    expect(stripReminderText(text, "en")).toBe(text);
  });
});
