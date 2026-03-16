import { describe, expect, it } from "bun:test";
import {
  normalizeCardTextContent,
  splitCardText,
  splitCardTextToEntries,
} from "../utils/structured-card-text";

describe("splitCardTextToEntries", () => {
  it("splits a named triggered ability", () => {
    expect(
      splitCardTextToEntries(
        "NURSEMAID Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      ),
    ).toEqual([
      {
        title: "NURSEMAID",
        description:
          "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      },
    ]);
  });

  it("splits a named static ability", () => {
    expect(splitCardTextToEntries("VOICELESS This character can't {E} to sing songs.")).toEqual([
      {
        title: "VOICELESS",
        description: "This character can't {E} to sing songs.",
      },
    ]);
  });

  it("splits a title followed by a parenthetical description", () => {
    expect(
      splitCardTextToEntries("Singer 5 (This character counts as cost 5 to sing songs.)"),
    ).toEqual([
      {
        title: "Singer 5",
        description: "(This character counts as cost 5 to sing songs.)",
      },
    ]);
  });

  it("splits multiple segments across lines", () => {
    expect(
      splitCardTextToEntries(
        "Singer 5 (This character counts as cost 5 to sing songs.)\nMUSICAL DEBUT When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      ),
    ).toEqual([
      {
        title: "Singer 5",
        description: "(This character counts as cost 5 to sing songs.)",
      },
      {
        title: "MUSICAL DEBUT",
        description:
          "When you play this character, look at the top 4 cards of your deck. You may reveal a song card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      },
    ]);
  });

  it("splits an all-caps title before effect text", () => {
    expect(
      splitCardTextToEntries(
        "YES, YOUR MAJESTY Your Prince, Princess, King, and Queen characters get +1 {S}.",
      ),
    ).toEqual([
      {
        title: "YES, YOUR MAJESTY",
        description: "Your Prince, Princess, King, and Queen characters get +1 {S}.",
      },
    ]);
  });

  it("splits an activated ability with a cost separator", () => {
    expect(
      splitCardTextToEntries("A SILLY SONG {E} — If you played a song this turn, gain 1 lore."),
    ).toEqual([
      {
        title: "A SILLY SONG",
        description: "{E} — If you played a song this turn, gain 1 lore.",
      },
    ]);
  });

  it("splits localized named abilities when the locale feed flattens them onto one line", () => {
    expect(
      splitCardTextToEntries(
        "NEUE ANKUNFT Jedes Mal, wenn einer deiner Charaktere an diesen Ort bewegt wird, lege die oberste Karte deines Decks verdeckt unter diesen Ort. NOCH EINE CHANCE Zu Beginn deines Zuges darfst du alle Karten, die unter diesem Ort liegen, auf deine Hand nehmen. Wenn du dies tust, verbanne diesen Ort.",
      ),
    ).toEqual([
      {
        title: "NEUE ANKUNFT",
        description:
          "Jedes Mal, wenn einer deiner Charaktere an diesen Ort bewegt wird, lege die oberste Karte deines Decks verdeckt unter diesen Ort.",
      },
      {
        title: "NOCH EINE CHANCE",
        description:
          "Zu Beginn deines Zuges darfst du alle Karten, die unter diesem Ort liegen, auf deine Hand nehmen. Wenn du dies tust, verbanne diesen Ort.",
      },
    ]);
  });

  it("keeps choose-one blocks as a single fallback segment", () => {
    expect(
      splitCardTextToEntries(
        "Choose one:\n- Each opposing character gets -1 until the start of your next turn.\n- Each opponent chooses and discards 2 cards.",
      ),
    ).toEqual([
      {
        title:
          "Choose one:\n- Each opposing character gets -1 until the start of your next turn.\n- Each opponent chooses and discards 2 cards.",
      },
    ]);
  });

  it("falls back to a title-only entry when no split is reliable", () => {
    expect(splitCardTextToEntries("Ward")).toEqual([{ title: "Ward" }]);
  });
});

describe("normalizeCardTextContent", () => {
  it("normalizes punctuation, spaces, and dash separators", () => {
    expect(normalizeCardTextContent("“Don’t”\u00a0… {E} - Draw 1 card")).toBe(
      '"Don\'t" ... {E} — Draw 1 card',
    );
  });
});

describe("splitCardText", () => {
  it("returns plain string for a single title-only entry", () => {
    expect(splitCardText("Ward")).toBe("Ward");
  });

  it("returns structured entries for split title/description text", () => {
    expect(
      splitCardText(
        "NURSEMAID Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      ),
    ).toEqual([
      {
        title: "NURSEMAID",
        description:
          "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      },
    ]);
  });

  it("returns empty string for empty input", () => {
    expect(splitCardText(" \n ")).toBe("");
  });
});
