import { describe, expect, it } from "bun:test";
import { createDefaultAutomatedMatchConfig } from "./config.js";
import { validateAutomatedMatchConfig } from "./fixture.js";

describe("automated match validation", () => {
  it("accepts valid fixture decklists", () => {
    const errors = validateAutomatedMatchConfig(createDefaultAutomatedMatchConfig());

    expect(errors).toEqual({});
  });

  it("reports malformed decklist lines", () => {
    const config = createDefaultAutomatedMatchConfig();
    config.playerOneDeckText = "1 Sail The Azurite Sea\nthis line is malformed";

    const errors = validateAutomatedMatchConfig(config);

    expect(errors.playerOneDeckText).toMatch(/malformed/i);
  });

  it("reports unresolved card names", () => {
    const config = createDefaultAutomatedMatchConfig();
    config.playerTwoDeckText = "1 Definitely Not A Real Lorcana Card";

    const errors = validateAutomatedMatchConfig(config);

    expect(errors.playerTwoDeckText).toMatch(/unknown card name/i);
  });
});
