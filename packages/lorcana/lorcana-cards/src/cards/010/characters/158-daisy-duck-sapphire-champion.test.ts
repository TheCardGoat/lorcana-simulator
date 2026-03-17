import { describe, expect, it } from "bun:test";
import { daisyDuckSapphireChampion } from "./158-daisy-duck-sapphire-champion";

describe("Daisy Duck - Sapphire Champion", () => {
  it("has exactly 2 abilities", () => {
    expect(daisyDuckSapphireChampion.abilities).toHaveLength(2);
  });

  describe("STAND FAST - Your other Sapphire characters gain Resist +1", () => {
    it("is a static ability named STAND FAST", () => {
      // Biome-ignore lint/style/noNonNullAssertion: length check above guarantees existence
      const ability = daisyDuckSapphireChampion.abilities![0] as {
        type: string;
        name: string;
      };
      expect(ability.type).toBe("static");
      expect(ability.name).toContain("STAND FAST");
    });

    it("grants Resist +1 to YOUR_OTHER_SAPPHIRE_CHARACTERS", () => {
      // Biome-ignore lint/style/noNonNullAssertion: length check above guarantees existence
      const ability = daisyDuckSapphireChampion.abilities![0] as {
        type: string;
        effect: {
          type: string;
          keyword: string;
          value: number;
          target: string;
        };
      };
      expect(ability.effect.type).toBe("gain-keyword");
      expect(ability.effect.keyword).toBe("Resist");
      expect(ability.effect.value).toBe(1);
      expect(ability.effect.target).toBe("YOUR_OTHER_SAPPHIRE_CHARACTERS");
    });
  });

  describe("LOOK AHEAD - Whenever one of your other Sapphire characters quests", () => {
    it("is a triggered ability named LOOK AHEAD", () => {
      // Biome-ignore lint/style/noNonNullAssertion: length check above guarantees existence
      const ability = daisyDuckSapphireChampion.abilities![1] as {
        type: string;
        name: string;
      };
      expect(ability.type).toBe("triggered");
      expect(ability.name).toBe("LOOK AHEAD");
    });

    it("triggers on quest of YOUR_OTHER_SAPPHIRE_CHARACTERS", () => {
      // Biome-ignore lint/style/noNonNullAssertion: length check above guarantees existence
      const ability = daisyDuckSapphireChampion.abilities![1] as {
        type: string;
        trigger: {
          event: string;
          on: string;
          timing: string;
        };
      };
      expect(ability.trigger.event).toBe("quest");
      expect(ability.trigger.on).toBe("YOUR_OTHER_SAPPHIRE_CHARACTERS");
      expect(ability.trigger.timing).toBe("whenever");
    });

    it("effect is an optional scry of 1 card to top or bottom of deck", () => {
      // Biome-ignore lint/style/noNonNullAssertion: length check above guarantees existence
      const ability = daisyDuckSapphireChampion.abilities![1] as {
        type: string;
        effect: {
          type: string;
          chooser: string;
          effect: {
            type: string;
            amount: number;
            destinations: Array<{ zone: string }>;
          };
        };
      };
      expect(ability.effect.type).toBe("optional");
      expect(ability.effect.chooser).toBe("CONTROLLER");
      expect(ability.effect.effect.type).toBe("scry");
      expect(ability.effect.effect.amount).toBe(1);

      const destinations = ability.effect.effect.destinations;
      expect(destinations).toHaveLength(2);
      const zones = destinations.map((d: { zone: string }) => d.zone);
      expect(zones).toContain("deck-top");
      expect(zones).toContain("deck-bottom");
    });
  });
});
