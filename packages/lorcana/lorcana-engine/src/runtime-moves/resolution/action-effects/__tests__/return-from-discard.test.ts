import { describe, it } from "bun:test";

/**
 * `return-from-discard` needs the discard / hand zones and the triggered
 * event plumbing that the simulator harness models end-to-end. The
 * per-variant unit test stays deferred until the discard tracking is wrapped
 * by the unit harness.
 */
describe("return-from-discard", () => {
  it.todo("unit: add return-from-discard coverage once discard tracking is in the harness");
});
