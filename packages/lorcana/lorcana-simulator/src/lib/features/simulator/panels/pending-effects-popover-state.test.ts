import { describe, expect, it } from "bun:test";

import {
  shouldAutoOpenPendingEffects,
  shouldDefaultPendingEffectsCollapsed,
} from "@/features/simulator/panels/pending-effects-popover-state.js";

describe("pending effects popover state", () => {
  it("defaults to collapsed when there is exactly one queued item", () => {
    expect(
      shouldDefaultPendingEffectsCollapsed({
        itemCount: 1,
        bagCount: 0,
        pendingCount: 1,
      }),
    ).toBe(true);
  });

  it("defaults to collapsed for a one-bag plus one-pending chain", () => {
    expect(
      shouldDefaultPendingEffectsCollapsed({
        itemCount: 2,
        bagCount: 1,
        pendingCount: 1,
      }),
    ).toBe(true);
  });

  it("does not default to collapsed for larger or differently shaped queues", () => {
    expect(
      shouldDefaultPendingEffectsCollapsed({
        itemCount: 2,
        bagCount: 2,
        pendingCount: 0,
      }),
    ).toBe(false);
    expect(
      shouldDefaultPendingEffectsCollapsed({
        itemCount: 3,
        bagCount: 1,
        pendingCount: 2,
      }),
    ).toBe(false);
  });

  it("auto-opens when a non-collapsed queue first appears", () => {
    expect(
      shouldAutoOpenPendingEffects({
        itemCount: 3,
        bagCount: 1,
        pendingCount: 2,
        actionableSignature: "pending:1:resolve|pending:2:resolve",
        previousItemCount: 0,
        previousActionableSignature: "",
      }),
    ).toBe(true);
  });

  it("stays collapsed for eligible single-flow queues even when actionable content changes", () => {
    expect(
      shouldAutoOpenPendingEffects({
        itemCount: 1,
        bagCount: 0,
        pendingCount: 1,
        actionableSignature: "pending:1:resolve",
        previousItemCount: 0,
        previousActionableSignature: "",
      }),
    ).toBe(false);

    expect(
      shouldAutoOpenPendingEffects({
        itemCount: 2,
        bagCount: 1,
        pendingCount: 1,
        actionableSignature: "bag:1:resolve|pending:1:resolve",
        previousItemCount: 2,
        previousActionableSignature: "bag:1:resolve",
      }),
    ).toBe(false);
  });

  it("auto-opens when actionable content changes for expanded multi-item queues", () => {
    expect(
      shouldAutoOpenPendingEffects({
        itemCount: 3,
        bagCount: 1,
        pendingCount: 2,
        actionableSignature: "bag:1:resolve|pending:1:resolve|pending:2:accept",
        previousItemCount: 3,
        previousActionableSignature: "bag:1:resolve|pending:1:resolve",
      }),
    ).toBe(true);
  });
});
