<script lang="ts">
  import { Button } from "$lib/design-system/primitives/button";
  import { authSession } from "$lib/auth/session.svelte.js";

  interface Props {
    /** The path to redirect back to after Discord OAuth completes. */
    callbackPath?: string;
    /** Called when the user chooses to dismiss/ignore and continue as anonymous. */
    onDismiss?: () => void;
  }

  const { callbackPath = "/matchmaking", onDismiss }: Props = $props();

  let signingIn = $state(false);

  async function handleSignIn(): Promise<void> {
    signingIn = true;
    try {
      await authSession.signInWithDiscord({ callbackPath });
    } catch {
      signingIn = false;
    }
  }
</script>

<!--
  Blocks the game board when the gateway reports authenticated: false after a
  reconnect. Shown in place of UnauthenticatedPlayerOverlay (THE-880).
  The overlay is intentionally non-dismissable by default so players don't
  accidentally play in an unauthenticated state (moves won't persist).
  Pass `onDismiss` to allow spectator / guest flows to bypass.
-->
<div
  class="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
  role="dialog"
  aria-modal="true"
  aria-label="Authentication required"
>
  <div
    class="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
  >
    <!-- Icon -->
    <div class="mb-4 flex justify-center">
      <span
        class="inline-flex size-14 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-amber-400"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
    </div>

    <!-- Heading -->
    <h2 class="mb-1 text-center text-lg font-semibold text-slate-100">
      Authentication Lost
    </h2>
    <p class="mb-5 text-center text-sm leading-relaxed text-slate-400">
      Your session expired while the connection was interrupted. Sign in again to
      keep playing — your game state is safe.
    </p>

    <!-- Actions -->
    <div class="flex flex-col gap-2">
      <Button
        class="h-11 w-full gap-2.5 bg-[#5865F2] text-sm font-medium text-white hover:bg-[#4752c4] focus-visible:ring-[#5865F2]/50"
        onclick={handleSignIn}
        disabled={signingIn}
      >
        {#if signingIn}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="animate-spin"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Signing in…
        {:else}
          <!-- Discord logo -->
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 127.14 96.36"
            fill="currentColor"
          >
            <path
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
            />
          </svg>
          Sign in with Discord
        {/if}
      </Button>

      {#if onDismiss}
        <Button
          variant="ghost"
          class="h-9 w-full text-xs text-slate-500 hover:text-slate-300"
          onclick={onDismiss}
        >
          Continue without signing in
        </Button>
      {/if}
    </div>
  </div>
</div>
