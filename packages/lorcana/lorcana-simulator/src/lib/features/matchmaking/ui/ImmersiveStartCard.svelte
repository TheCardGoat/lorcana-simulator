<script lang="ts">
  import { Button } from "$lib/design-system/primitives/button";
  import Smartphone from "@lucide/svelte/icons/smartphone";
  import AppWindow from "@lucide/svelte/icons/app-window";
  import Download from "@lucide/svelte/icons/download";
  import Maximize from "@lucide/svelte/icons/maximize";
  import Loader from "@lucide/svelte/icons/loader-circle";
  import Share from "@lucide/svelte/icons/share";
  import type { ImmersiveCapabilities } from "@/features/immersive/immersive-capabilities.js";
  import type { ImmersiveStartOutcome } from "@/features/immersive/immersive-state.svelte.js";
  import type {
    BeforeInstallPromptChoiceResult,
    InstallNudgeVariant,
  } from "@/features/matchmaking/state/install-nudge.svelte.js";

  interface ImmersiveStartController {
    isStandalone: boolean;
    canRequestFullscreen: boolean;
    capabilities: ImmersiveCapabilities;
    startExperience: () => Promise<ImmersiveStartOutcome>;
    startInBrowser: () => ImmersiveStartOutcome;
  }

  interface ImmersiveStartCardProps {
    immersive: ImmersiveStartController;
    installNudge?: {
      shouldShow: boolean;
      variant: InstallNudgeVariant;
      installing: boolean;
      promptInstall: () => Promise<BeforeInstallPromptChoiceResult | null>;
      dismissForAWeek: () => void;
    } | undefined;
    onStart?: (() => void) | undefined;
  }

  let { immersive, installNudge, onStart }: ImmersiveStartCardProps = $props();

  let starting = $state(false);
  let continuingInBrowser = $state(false);
  let statusMessage = $state<string | null>(null);

  const helperMessage = $derived.by(() => {
    if (immersive.isStandalone) {
      return "Home screen launch detected. You're already in the cleanest app mode available on this device.";
    }

    if (immersive.capabilities.isIosSafari) {
      return "Start in the browser and keep your place in the lobby. If you want the most native feel later, add the app to your Home Screen.";
    }

    if (immersive.canRequestFullscreen) {
      return "The lobby is ready in the browser right away. Fullscreen is available later if you want a cleaner play surface.";
    }

    return "The simulator is ready to use in your browser without any extra setup.";
  });

  const heading = $derived.by(() => {
    if (immersive.isStandalone) {
      return "Mobile match ready";
    }

    return "Open lobby now";
  });

  const installHeading = $derived.by(() => {
    if (!installNudge?.shouldShow) {
      return "";
    }

    return installNudge.variant === "ios-safari" ? "Install for one-tap return" : "Install Lorcanito";
  });

  const installMessage = $derived.by(() => {
    if (!installNudge?.shouldShow) {
      return "";
    }

    if (installNudge.variant === "ios-safari") {
      return "On iPhone and iPad Safari, tap Share and choose Add to Home Screen for the fastest way back into the simulator.";
    }

    return "Install the app for one-tap launch, cleaner chrome, and a smoother repeat-play flow.";
  });

  function handleContinueInBrowser(): void {
    continuingInBrowser = true;
    statusMessage = null;

    try {
      immersive.startInBrowser();
      onStart?.();
    } finally {
      continuingInBrowser = false;
    }
  }

  async function handleStart(): Promise<void> {
    starting = true;
    statusMessage = null;

    try {
      const result = await immersive.startExperience();

      if (!result.enteredFullscreen && result.reason) {
        statusMessage = result.reason;
      }

      onStart?.();
    } finally {
      starting = false;
    }
  }

  async function handleInstallPrompt(): Promise<void> {
    await installNudge?.promptInstall();
  }

  function handleDismissInstallNudge(): void {
    installNudge?.dismissForAWeek();
  }
</script>

<section
  class="immersive-start-shell relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(9,16,33,0.98)_55%,rgba(24,24,27,0.96))] px-4 py-4 shadow-[0_32px_90px_-54px_rgba(2,6,23,1)] sm:px-5"
>
  <div
    class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]"
    aria-hidden="true"
  ></div>

  <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-4">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-2">
        <p class="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-200/80">
          Mobile match setup
        </p>
        <div class="space-y-1">
          <h1 class="text-balance text-2xl font-semibold text-white sm:text-[2rem]">
            {heading}
          </h1>
          <p class="max-w-2xl text-sm leading-6 text-slate-300 sm:text-[0.95rem]">
            {helperMessage}
          </p>
        </div>
      </div>

      <div class="rounded-full border border-white/10 bg-white/6 p-3 text-sky-100 shadow-[0_10px_30px_-24px_rgba(125,211,252,0.9)]">
        {#if immersive.isStandalone}
          <AppWindow class="size-5" />
        {:else if immersive.canRequestFullscreen}
          <Maximize class="size-5" />
        {:else}
          <Smartphone class="size-5" />
        {/if}
      </div>
    </div>

    {#if installNudge?.shouldShow}
      <div class="rounded-[1.35rem] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(120,53,15,0.18),rgba(15,23,42,0.22))] p-3.5 shadow-[0_16px_40px_-32px_rgba(251,191,36,0.8)]">
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1.5">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-amber-100/80">
              Optional install
            </p>
            <div class="space-y-1">
              <h2 class="text-base font-semibold text-white">
                {installHeading}
              </h2>
              <p class="max-w-2xl text-sm leading-6 text-slate-200/90">
                {installMessage}
              </p>
            </div>
          </div>

          <div class="rounded-full border border-white/10 bg-white/8 p-2.5 text-amber-100">
            {#if installNudge.variant === "ios-safari"}
              <Share class="size-4.5" />
            {:else}
              <Download class="size-4.5" />
            {/if}
          </div>
        </div>

        {#if installNudge.variant === "ios-safari"}
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-200/85">
            <span class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">Tap Share</span>
            <span class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">Add to Home Screen</span>
          </div>
        {/if}

        <div class="mt-3 flex flex-col gap-2 sm:flex-row">
          {#if installNudge.variant === "native"}
            <Button
              class="h-11 min-w-36 rounded-full bg-amber-300 px-5 text-sm font-semibold text-slate-950 hover:bg-amber-200"
              disabled={starting || continuingInBrowser || installNudge.installing}
              onclick={handleInstallPrompt}
            >
              {#if installNudge.installing}
                <Loader class="mr-2 size-4 animate-spin" />
              {/if}
              Install app
            </Button>
          {/if}

          <Button
            class="h-11 min-w-36 rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10"
            disabled={starting || continuingInBrowser || installNudge.installing}
            onclick={handleDismissInstallNudge}
            variant="outline"
          >
            Maybe next week
          </Button>
        </div>
      </div>
    {/if}

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap gap-2 text-xs text-slate-300">
        <span class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">Portrait-first</span>
        <span class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">Safe-area ready</span>
        <span class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
          {immersive.isStandalone ? "Standalone active" : immersive.canRequestFullscreen ? "Optional fullscreen" : "Browser mode"}
        </span>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row">
        <Button
          class="h-12 min-w-40 touch-manipulation rounded-full bg-sky-400 px-6 text-[0.95rem] font-semibold text-slate-950 shadow-[0_16px_44px_-24px_rgba(56,189,248,0.95)] hover:bg-sky-300"
          disabled={starting || continuingInBrowser}
          onclick={handleContinueInBrowser}
        >
          {#if continuingInBrowser}
            <Loader class="mr-2 size-4 animate-spin" />
          {/if}
          {immersive.isStandalone ? "Continue to Lobby" : "Continue in Browser"}
        </Button>

        {#if !immersive.isStandalone && immersive.canRequestFullscreen}
          <Button
            class="h-12 min-w-40 touch-manipulation rounded-full border border-white/12 bg-white/6 px-6 text-[0.95rem] font-semibold text-white hover:bg-white/10"
            disabled={starting || continuingInBrowser}
            onclick={handleStart}
            variant="outline"
          >
            {#if starting}
              <Loader class="mr-2 size-4 animate-spin" />
            {/if}
            Try Fullscreen
          </Button>
        {/if}
      </div>
    </div>

    {#if statusMessage}
      <p class="text-xs leading-5 text-slate-400">
        {statusMessage}
      </p>
    {/if}
  </div>
</section>
