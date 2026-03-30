import { describe, expect, test } from "bun:test";
import { privateField, stripPrivateFields } from "./private-field";

describe("stripPrivateFields", () => {
  test("passes through non-object values", () => {
    expect(stripPrivateFields("hello", "p1")).toBe("hello");
    expect(stripPrivateFields(42, "p1")).toBe(42);
    expect(stripPrivateFields(null, "p1")).toBe(null);
    expect(stripPrivateFields(undefined, "p1")).toBe(undefined);
  });

  test("reveals PrivateField when viewer is in visibleTo", () => {
    const field = privateField(["card-1", "card-2"], ["player-1"]);
    const result = stripPrivateFields(field, "player-1");
    expect(result).toEqual(["card-1", "card-2"]);
  });

  test("strips PrivateField when viewer is not in visibleTo", () => {
    const field = privateField(["card-1", "card-2"], ["player-1"]);
    const result = stripPrivateFields(field, "player-2");
    expect(result).toBeUndefined();
  });

  test("strips PrivateField for spectators (null viewer)", () => {
    const field = privateField(["card-1"], ["player-1"]);
    const result = stripPrivateFields(field, null);
    expect(result).toBeUndefined();
  });

  test("strips nested PrivateFields in objects", () => {
    const obj = {
      type: "alterHand" as const,
      count: 3,
      mulliganed: privateField(["c1", "c2", "c3"], ["p1"]),
      drawn: privateField(["c4", "c5", "c6"], ["p1"]),
    };

    const forP1 = stripPrivateFields(obj, "p1");
    expect(forP1.type).toBe("alterHand");
    expect(forP1.count).toBe(3);
    expect(forP1.mulliganed).toEqual(["c1", "c2", "c3"]);
    expect(forP1.drawn).toEqual(["c4", "c5", "c6"]);

    const forP2 = stripPrivateFields(obj, "p2");
    expect(forP2.type).toBe("alterHand");
    expect(forP2.count).toBe(3);
    expect(forP2.mulliganed).toBeUndefined();
    expect(forP2.drawn).toBeUndefined();
  });

  test("handles arrays containing PrivateFields", () => {
    const arr = [
      { id: "a", secret: privateField("hidden", ["p1"]) },
      { id: "b", secret: privateField("also-hidden", ["p2"]) },
    ];

    const forP1 = stripPrivateFields(arr, "p1");
    expect(forP1[0].secret).toBe("hidden");
    expect(forP1[1].secret).toBeUndefined();
  });

  test("handles deeply nested structures", () => {
    const obj = {
      outcomes: {
        cardsDrawn: {
          amount: 2,
          detail: privateField(["c1", "c2"], ["p1"]),
        },
        cardsMilled: {
          playerId: "p2",
          amount: 3,
          cardIds: privateField(["c3", "c4", "c5"], ["p2"]),
        },
      },
    };

    const forP1 = stripPrivateFields(obj, "p1");
    expect(forP1.outcomes.cardsDrawn.amount).toBe(2);
    expect(forP1.outcomes.cardsDrawn.detail).toEqual(["c1", "c2"]);
    expect(forP1.outcomes.cardsMilled.cardIds).toBeUndefined();

    const spectator = stripPrivateFields(obj, null);
    expect(spectator.outcomes.cardsDrawn.amount).toBe(2);
    expect(spectator.outcomes.cardsDrawn.detail).toBeUndefined();
    expect(spectator.outcomes.cardsMilled.cardIds).toBeUndefined();
  });
});
