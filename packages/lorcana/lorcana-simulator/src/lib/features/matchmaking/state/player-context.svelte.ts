import { authSession } from "$lib/auth/session.svelte.js";
import {
  fetchMatchmakingContext,
  onboardPlayer,
  updateActiveMatchmakingProfile,
  updateProfileSelectedDeck,
  type MatchmakingContext,
  type ProfileDeckSummary,
  type ProfileMatchmakingContext,
} from "../api/player-context-api.js";

function updateProfileSelection(
  profiles: ProfileMatchmakingContext[],
  gameProfileId: string,
  selectedDeckId: string,
): ProfileMatchmakingContext[] {
  return profiles.map((profile) =>
    profile.gameProfileId === gameProfileId ? { ...profile, selectedDeckId } : profile,
  );
}

export class MatchmakingPlayerContextState {
  loading = $state(false);
  savingProfile = $state(false);
  savingDeck = $state(false);
  onboarding = $state(false);
  error = $state<string | null>(null);
  onboardingError = $state<string | null>(null);
  context = $state<MatchmakingContext | null>(null);

  constructor(initialContext: MatchmakingContext | null = null) {
    if (initialContext) {
      this.context = initialContext;
    }
  }

  get isAuthenticated(): boolean {
    return authSession.isAuthenticated;
  }

  /** True when the user is authenticated and loaded but has no game profiles yet. */
  get needsOnboarding(): boolean {
    return (
      !this.loading &&
      authSession.isAuthenticated &&
      this.context !== null &&
      this.profiles.length === 0
    );
  }

  get activeGameProfileId(): string | null {
    return this.context?.activeGameProfileId ?? null;
  }

  get profiles(): ProfileMatchmakingContext[] {
    return this.context?.profiles ?? [];
  }

  get activeProfile(): ProfileMatchmakingContext | null {
    const activeGameProfileId = this.activeGameProfileId;
    if (!activeGameProfileId) {
      return null;
    }

    return this.profiles.find((profile) => profile.gameProfileId === activeGameProfileId) ?? null;
  }

  get selectedDeck(): ProfileDeckSummary | null {
    const profile = this.activeProfile;
    if (!profile?.selectedDeckId) {
      return null;
    }

    return profile.decks.find((deck) => deck.deckId === profile.selectedDeckId) ?? null;
  }

  async initialize(): Promise<void> {
    await authSession.fetchSession();

    if (!authSession.isAuthenticated) {
      this.reset();
      return;
    }

    // Skip fetch if already hydrated from SSR
    if (this.context) return;

    await this.refresh();
  }

  /** Accept terms, trigger legacy migration, and create game profile. */
  async onboard(): Promise<boolean> {
    this.onboarding = true;
    this.onboardingError = null;

    try {
      this.context = await onboardPlayer();
      return true;
    } catch (error) {
      this.onboardingError =
        error instanceof Error ? error.message : "Failed to create your profile";
      return false;
    } finally {
      this.onboarding = false;
    }
  }

  async refresh(): Promise<void> {
    if (!authSession.isAuthenticated) {
      this.reset();
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      this.context = await fetchMatchmakingContext();
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Failed to load player context";
      this.context = null;
    } finally {
      this.loading = false;
    }
  }

  async setActiveProfile(gameProfileId: string): Promise<void> {
    if (!this.context || this.context.activeGameProfileId === gameProfileId) {
      return;
    }

    const previousContext = this.context;
    this.context = {
      ...this.context,
      activeGameProfileId: gameProfileId,
    };
    this.savingProfile = true;
    this.error = null;

    try {
      await updateActiveMatchmakingProfile(gameProfileId);
    } catch (error) {
      this.context = previousContext;
      this.error = error instanceof Error ? error.message : "Failed to save active profile";
    } finally {
      this.savingProfile = false;
    }
  }

  async setSelectedDeck(selectedDeckId: string): Promise<void> {
    const activeProfile = this.activeProfile;
    if (!this.context || !activeProfile || activeProfile.selectedDeckId === selectedDeckId) {
      return;
    }

    const previousContext = this.context;
    this.context = {
      ...this.context,
      profiles: updateProfileSelection(
        this.context.profiles,
        activeProfile.gameProfileId,
        selectedDeckId,
      ),
    };
    this.savingDeck = true;
    this.error = null;

    try {
      await updateProfileSelectedDeck(activeProfile.gameProfileId, selectedDeckId);
    } catch (error) {
      this.context = previousContext;
      this.error = error instanceof Error ? error.message : "Failed to save selected deck";
    } finally {
      this.savingDeck = false;
    }
  }

  reset(): void {
    this.loading = false;
    this.savingProfile = false;
    this.savingDeck = false;
    this.error = null;
    this.context = null;
  }
}
