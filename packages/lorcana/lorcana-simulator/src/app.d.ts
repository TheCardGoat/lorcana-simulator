// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { LorcanaBrowserHarness } from "$lib/features/simulator-devtools/harness/browser-harness.js";
import type { AuthUser, AuthSession } from "@tcg/shared/auth";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: AuthUser | null;
      session: AuthSession | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    __lorcanaTestHarness?: LorcanaBrowserHarness;
  }
}

export {};
