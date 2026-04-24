<script lang="ts">
  import { onMount, onDestroy, untrack } from 'svelte';
  import { goto } from '$app/navigation';
  import { authSession } from '$lib/auth/session.svelte.js';
  import { LorcanaTabletopSimulator } from '$lib';
  import { HvHPlayerOrchestrator } from '@/features/hvh/hvh-player-orchestrator.svelte.js';
  import { OpponentPresenceTracker } from '@/features/gateway/opponent-presence.svelte.js';
  import { OpponentAfkTracker } from '@/features/gateway/opponent-afk.svelte.js';
  import { IdleStore } from '@/features/gateway/idle-store.svelte.js';
  import {
    loadPracticeSession,
    clearPracticeSession,
    saveRankedMatchSession,
  } from '@/features/practice-match/practice-match-storage.js';
  import {
    acquirePlayerTicket,
    connectAndJoin,
    fetchQuickMatchTicket,
  } from './connect-gateway.js';
  import { createMessageRouter, type RecentHistory, type ProposalPayload } from './game-mode-message-router.js';
  import {
    buildVisualSettings,
    buildDisplayNames,
    buildIsMobileMap,
    mergeWsVisuals,
    createMatchChat,
    checkInitialPresence,
  } from './game-mode-setup.js';
  import { toast } from 'svelte-sonner';
  import type { GamePageData } from '../+page.server.js';
  import type { CardsMaps, LorcanaMatchState } from '@tcg/lorcana-engine';
  import type { MatchChatController } from '@/features/match-chat/match-chat-controller.svelte.js';
  import type { LorcanaPlayerSettingsMap } from '$lib/features/simulator/model/player-visual-settings.js';
  import type { GatewayClientStore } from '@/features/gateway/gateway-client.svelte.js';
  import type { SpectatorRecentHistory } from '@/features/spectator/spectator-match-orchestrator.svelte.js';
  import type { MatchNavigationContext } from '@/features/simulator/model/contracts.js';

  type ServerData = Extract<GamePageData, { mode: 'server' }>;
  let { data }: { data: ServerData } = $props();

  function deriveNextGameId(match: ServerData['match'], gameId: string): string | undefined {
    if (match.currentGameId && match.currentGameId !== gameId) return match.currentGameId;
    return undefined;
  }

  const initialMatch = untrack(() => data.match);
  const initialGameId = untrack(() => data.gameId);
  const initialGameNumber = untrack(() => data.game.gameNumber ?? 1);
  let matchContext = $state<MatchNavigationContext>({
    nextGameId: deriveNextGameId(initialMatch, initialGameId),
    matchCompleted: initialMatch.status === 'completed',
    format: initialMatch.format,
    player1Score: initialMatch.player1Score,
    player2Score: initialMatch.player2Score,
    gameIndex: initialGameNumber,
    navigating: false,
  });

  async function handleNextGame(): Promise<void> {
    if (matchContext.nextGameId && !matchContext.navigating) {
      matchContext = { ...matchContext, navigating: true };
      await goto(`/matches/${data.matchId}`);
    }
  }

  let loadError = $state<string | null>(null);
  let orchestrator = $state<HvHPlayerOrchestrator | null>(null);
  let matchChatController = $state<MatchChatController | null>(null);
  let playerVisualSettings = $state<LorcanaPlayerSettingsMap>({});
  let playerDisplayNames = $state<Record<string, string>>({});
  let playerIsMobileMap = $state<Record<string, boolean>>({});

  const opponentPresence = new OpponentPresenceTracker();
  const opponentAfk = new OpponentAfkTracker();
  const idleStore = new IdleStore(30_000);

  /** Pending undo proposal received from the opponent — awaiting accept/decline. */
  let pendingUndoProposal = $state<{ senderPlayerId: string; deadline: number } | null>(null);
  let pendingFreeTextProposal = $state<{ senderPlayerId: string; deadline: number } | null>(null);
  let gateway = $state<GatewayClientStore | null>(null);
  let gatewayStatus = $derived(gateway?.status ?? null);
  let connectionEmoji = $derived(
    gatewayStatus === 'connected' ? '\u{1F7E2}' :
    gatewayStatus === 'connecting' ? '\u{1F7E1}' :
    gatewayStatus === 'disconnected' ? '\u{1F534}' :
    '\u{23F3}',
  );
  let pendingRecentHistory = $state<SpectatorRecentHistory | null>(null);
  /** Canonical match player id for filtering `presence_change` (WS identity may differ). */
  let presenceSelfPlayerId = $state<string | null>(null);
  /** Hoisted from session so the reconnect effect can access it. */
  let sessionUserId = $state<string | null>(null);
  /** Last `connectionId` seen — used to detect WS reconnects and re-subscribe to the game. */
  let lastConnectionId = $state<string | null>(null);
  /** Whether the current WS connection has received `game_joined` for this game. */
  let gameSubscribed = $state(false);

  const handleMessage = createMessageRouter({
    gameId: initialGameId,
    getChatController: () => matchChatController,
    getPresenceTracker: () => opponentPresence,
    getAfkTracker: () => opponentAfk,
    presenceFilter: (pid) => {
      const ownId = presenceSelfPlayerId ?? '';
      return !!ownId && pid !== ownId;
    },
    onError: (msg) => {
      const text =
        typeof msg.message === 'string' && (msg.message as string).trim() !== ''
          ? (msg.message as string)
          : 'Something went wrong';
      toast.error(text, { duration: 8000 });
      console.error('[hvh-mode] gateway error', msg);
    },
    onRecentHistory: (history) => {
      if (orchestrator) {
        orchestrator.hydrateRecentHistory({
          acceptedMoves: history.acceptedMoves,
          engineLogs: history.engineLogs,
        });
      } else {
        pendingRecentHistory = {
          acceptedMoves: history.acceptedMoves,
          engineLogs: history.engineLogs,
        };
      }
      gameSubscribed = true;
    },
    // move_accepted and state_update are parsed centrally by the router and
    // forwarded here as a LiveMovePayload with an already-constructed acceptedMove.
    onLiveMove: (payload) => {
      if (orchestrator) {
        orchestrator.applyStateUpdate({
          acceptedMove: payload.acceptedMove,
          engineLogs: payload.engineLogs,
        });
      }
    },
    onProposalReceived: (proposal) => {
      if (proposal.actionType === 'undo') {
        pendingUndoProposal = {
          senderPlayerId: proposal.senderPlayerId,
          deadline: proposal.deadline,
        };
      } else if (proposal.actionType === 'enable_free_text_chat') {
        pendingFreeTextProposal = {
          senderPlayerId: proposal.senderPlayerId,
          deadline: proposal.deadline,
        };
      }
    },
    onProposalResolved: (proposal) => {
      if (proposal.actionType === 'undo') {
        pendingUndoProposal = null;
        if (proposal.resolution === 'accepted') {
          toast.success('Undo accepted — move reverted.', { duration: 4000 });
        } else if (proposal.resolution === 'declined') {
          toast.error('Undo request declined.', { duration: 4000 });
        }
      } else if (proposal.actionType === 'enable_free_text_chat') {
        pendingFreeTextProposal = null;
        matchChatController?.clearFreeTextProposalPending();
        if (proposal.resolution === 'accepted') {
          toast.success('Free text chat enabled.', { duration: 4000 });
        } else if (proposal.resolution === 'declined') {
          toast.error('Free text chat request declined.', { duration: 4000 });
        }
      }
    },
    onUnhandled: (msg) => {
      if (msg.type === 'game_ended') {
        const gid = typeof msg.gameId === 'string' ? msg.gameId : undefined;
        if (gid && gid === data.gameId && orchestrator) {
          const board = orchestrator.currentEngine.getBoard();
          if (board.status !== 'finished') {
            gateway?.send({
              type: 'request_game_state_sync',
              gameId: data.gameId,
              stateVersion: 0,
            });
          }
        }
        return;
      }
      if (msg.type === 'match_state') {
        const rawNextGameId = typeof msg.currentGameId === 'string' ? msg.currentGameId : null;
        const matchId = typeof msg.matchId === 'string' ? msg.matchId : null;
        const nextGameId =
          rawNextGameId && rawNextGameId !== data.gameId ? rawNextGameId : undefined;
        matchContext = {
          ...matchContext,
          nextGameId,
          matchCompleted: !nextGameId,
          player1Score:
            typeof msg.player1Score === 'number' ? msg.player1Score : matchContext.player1Score,
          player2Score:
            typeof msg.player2Score === 'number' ? msg.player2Score : matchContext.player2Score,
        };
        // Backup toast (redundant once UI CTAs are visible, but kept as fallback)
        if (nextGameId && matchId) {
          toast.info('This game is over — the next game is ready.', {
            action: {
              label: 'Go to next game',
              onClick: () => void goto(`/matches/${matchId}`),
            },
            duration: Infinity,
          });
        }
      }
    },
  });

  function handleDropOpponent(): void {
    gateway?.send({ type: 'drop_player', gameId: data.gameId });
  }

  function handleAcceptUndoProposal(): void {
    gateway?.send({ type: 'proposal_accept', gameId: data.gameId, actionType: 'undo' });
    pendingUndoProposal = null;
  }

  function handleDeclineUndoProposal(): void {
    gateway?.send({ type: 'proposal_decline', gameId: data.gameId, actionType: 'undo' });
    pendingUndoProposal = null;
  }

  function handleAcceptFreeTextProposal(): void {
    gateway?.send({
      type: 'proposal_accept',
      gameId: data.gameId,
      actionType: 'enable_free_text_chat',
    });
    pendingFreeTextProposal = null;
  }

  function handleDeclineFreeTextProposal(): void {
    gateway?.send({
      type: 'proposal_decline',
      gameId: data.gameId,
      actionType: 'enable_free_text_chat',
    });
    pendingFreeTextProposal = null;
    matchChatController?.clearFreeTextProposalPending();
  }

  function handleSkipOpponent(): void {
    gateway?.send({ type: 'skip_opponent_turn', gameId: data.gameId });
  }

  async function handleReturnToMatchmaking(): Promise<void> {
    clearPracticeSession();
    await goto('/matchmaking');
  }

  onMount(async () => {
    const { gameId, match, game } = data;

    idleStore.attach();
    playerVisualSettings = buildVisualSettings(match.participants);
    playerDisplayNames = buildDisplayNames(match.participants);
    playerIsMobileMap = buildIsMobileMap(match.participants);

    // Auth may still be hydrating on first paint (svelte state starts null).
    // Wait briefly so the fallback reconstruction below can match the user.
    if (!authSession.user && authSession.isLoading) {
      for (let i = 0; i < 50 && authSession.isLoading; i++) {
        await new Promise((r) => setTimeout(r, 20));
      }
    }

    let session = loadPracticeSession(gameId);
    if (!session) {
      // localStorage holds only one session at a time — it may have been
      // overwritten by a newer game, or cleared when the player left matchmaking.
      // Reconstruct the session from the server context if the authenticated
      // user can be matched to one of the participants by userId.
      const userId = authSession.user?.id;
      const myParticipant = userId
        ? match.participants.find((p) => p.userId === userId)
        : undefined;
      if (myParticipant) {
        saveRankedMatchSession({ matchId: data.matchId, gameId, gameProfileId: myParticipant.id, userId });
        session = loadPracticeSession(gameId);
      }
    }
    if (!session) {
      loadError =
        'No session found for this match. You may need to rejoin from matchmaking.';
      return;
    }

    presenceSelfPlayerId = session.gameProfileId;
    sessionUserId = session.userId ?? null;

    void (async () => {
      const {
        ticket,
        authToken,
        error: ticketError,
      } = await acquirePlayerTicket({
        wsTicket: session.wsTicket,
        fetchQuickMatchTicket: session.wsTicket
          ? () => fetchQuickMatchTicket(session.matchId, session.gameProfileId)
          : undefined,
      });
      if (ticketError) {
        loadError = ticketError;
        return;
      }

      const result = await connectAndJoin({
        ticket,
        authToken,
        gameId,
        role: 'player',
        matchType: match.matchType,
        gameProfileId: session.gameProfileId,
        userId: session.userId ?? authSession.user?.id,
        onMessage: (msg) => {
          if (msg.type === 'game_joined') gameSubscribed = true;
          handleMessage(msg);
        },
      });

      if (result.error) {
        loadError = result.error;
        return;
      }

      gateway = result.gateway;
      gameSubscribed = true;
      const joinedMsg = result.joinedMsg!;

      playerVisualSettings = mergeWsVisuals(
        playerVisualSettings,
        joinedMsg.playerVisualSettings as LorcanaPlayerSettingsMap | undefined,
      );

      // Check initial opponent presence
      checkInitialPresence(
        joinedMsg.players as
          | Array<{ id: string; connected: boolean; disconnectedAt?: string }>
          | undefined,
        session.gameProfileId,
        opponentPresence,
      );

      matchChatController = createMatchChat({
        gameId,
        canSend: true,
        gateway: gateway!,
      });

      const joinedCardsMaps = joinedMsg.cardsMaps as CardsMaps | undefined;
      const joinedState = joinedMsg.state as
        | LorcanaMatchState
        | null
        | undefined;
      const ssrCardsMaps = game.cardsMaps as CardsMaps | undefined;
      const ssrState = game.state as LorcanaMatchState | undefined;

      const cardsMaps = joinedCardsMaps ?? ssrCardsMaps;
      const state = joinedState ?? ssrState;

      if (!state || !cardsMaps) {
        loadError = 'Match state is not yet available.';
        return;
      }

      orchestrator = new HvHPlayerOrchestrator({
        gateway: gateway!,
        gameId: data.gameId,
        state,
        cardsMaps,
        gameProfileId: session.gameProfileId,
        userId: session.userId ?? authSession.user?.id,
        recentHistory: pendingRecentHistory ?? undefined,
        idleStore,
      });
      pendingRecentHistory = null;

      // Drain pre-join messages that arrived before game_joined
      for (const pending of result.pendingMessages) {
        handleMessage(pending);
      }
    })();
  });

  // Proposal 1: auto-rejoin on WS reconnect.
  // When `connectionId` transitions to a new non-null value after the initial join,
  // send `reconnect` so the server re-subscribes this socket to game pub/sub.
  $effect(() => {
    const cid = gateway?.connectionId;
    if (!cid || !orchestrator || !presenceSelfPlayerId) return;
    if (cid === lastConnectionId) return;
    if (lastConnectionId !== null) {
      // New connectionId after a drop — re-subscribe to the game
      gateway!.send({
        type: 'reconnect',
        gameId: data.gameId,
        gameProfileId: presenceSelfPlayerId,
        ...(sessionUserId ?? authSession.user?.id
          ? { userId: sessionUserId ?? authSession.user?.id }
          : {}),
        lastReceivedVersion: 0,
      });
      gameSubscribed = false;
    }
    lastConnectionId = cid;
  });

  onDestroy(() => {
    orchestrator?.dispose();
    opponentPresence.dispose();
    idleStore.detach();
    gateway?.destroy();
  });
</script>

<svelte:head>
  <title>{connectionEmoji} Game | Lorcanito</title>
</svelte:head>

{#if loadError}
  <div class="grid h-full place-items-center px-4 text-rose-300">
    <div class="flex flex-col items-center gap-4 text-center">
      <p>{loadError}</p>
      <button
        type="button"
        class="rounded-md bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-100 ring-1 ring-rose-400/40 hover:bg-rose-500/30"
        onclick={handleReturnToMatchmaking}
      >
        Return to matchmaking
      </button>
    </div>
  </div>
{:else if orchestrator}
  <!-- Proposal 3: show a non-blocking banner while the WS is up but not yet re-subscribed -->
  {#if gatewayStatus === 'connected' && !gameSubscribed}
    <div class="game-resync-banner" role="status" aria-live="polite">
      <span class="game-resync-banner__dot"></span>
      Reconnecting to game&hellip;
    </div>
  {/if}
  {#if pendingUndoProposal}
    <div class="undo-proposal-banner" role="alertdialog" aria-label="Undo request from opponent">
      <span class="undo-proposal-banner__text">Opponent requests to undo their last move</span>
      <div class="undo-proposal-banner__actions">
        <button class="undo-proposal-banner__btn undo-proposal-banner__btn--accept" onclick={handleAcceptUndoProposal}>
          Accept
        </button>
        <button class="undo-proposal-banner__btn undo-proposal-banner__btn--decline" onclick={handleDeclineUndoProposal}>
          Decline
        </button>
      </div>
    </div>
  {/if}
  {#if pendingFreeTextProposal}
    <div class="undo-proposal-banner" role="alertdialog" aria-label="Free text chat request from opponent">
      <span class="undo-proposal-banner__text">Opponent wants to enable free text chat</span>
      <div class="undo-proposal-banner__actions">
        <button class="undo-proposal-banner__btn undo-proposal-banner__btn--accept" onclick={handleAcceptFreeTextProposal}>
          Accept
        </button>
        <button class="undo-proposal-banner__btn undo-proposal-banner__btn--decline" onclick={handleDeclineFreeTextProposal}>
          Decline
        </button>
      </div>
    </div>
  {/if}
  <LorcanaTabletopSimulator
    engine={orchestrator.currentEngine}
    readModel={orchestrator.readModel}
    playerSettings={playerVisualSettings}
    {playerDisplayNames}
    {playerIsMobileMap}
    serverGameplaySettings={data.userSettings?.gameplaySettings}
    postGameGameId={data.gameId}
    isAuthenticated={authSession.isAuthenticated}
    {matchChatController}
    {opponentPresence}
    {opponentAfk}
    onSkipOpponent={handleSkipOpponent}
    onDropOpponent={handleDropOpponent}
    {gatewayStatus}
    serverInitiatedClose={gateway?.serverInitiatedClose ?? false}
    onReturnToMatchmaking={handleReturnToMatchmaking}
    {matchContext}
    onNextGame={handleNextGame}
  />
{:else}
  <div class="grid h-full place-items-center px-4 text-slate-400">
    Connecting to match...
  </div>
{/if}

<style>
  .game-resync-banner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.8rem;
    border-radius: 9999px;
    background: rgba(217, 119, 6, 0.9);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    pointer-events: none;
    animation: resync-fade-in 0.3s ease-out both;
  }

  .game-resync-banner__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: resync-pulse 1.2s ease-in-out infinite;
  }

  @keyframes resync-fade-in {
    from { opacity: 0; transform: translate(-50%, calc(-50% - 6px)); }
    to { opacity: 1; transform: translate(-50%, -50%); }
  }

  @keyframes resync-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* ---- Undo Proposal Banner ---- */

  .undo-proposal-banner {
    position: fixed;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.65rem 0.85rem 0.65rem 1.15rem;
    border-radius: 9999px;
    background: rgba(30, 30, 40, 0.97);
    border: 1px solid rgba(99, 102, 241, 0.6);
    box-shadow:
      0 6px 28px rgba(0, 0, 0, 0.55),
      0 0 0 4px rgba(99, 102, 241, 0.18);
    animation:
      resync-fade-in 0.3s ease-out both,
      proposal-pulse 2.4s ease-in-out 0.3s infinite;
    white-space: nowrap;
  }

  @keyframes proposal-pulse {
    0%,
    100% {
      box-shadow:
        0 6px 28px rgba(0, 0, 0, 0.55),
        0 0 0 4px rgba(99, 102, 241, 0.18);
      border-color: rgba(99, 102, 241, 0.6);
    }
    50% {
      box-shadow:
        0 6px 30px rgba(0, 0, 0, 0.6),
        0 0 0 8px rgba(99, 102, 241, 0.34);
      border-color: rgba(129, 140, 248, 0.9);
    }
  }

  .undo-proposal-banner__text {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .undo-proposal-banner__actions {
    display: flex;
    gap: 0.4rem;
  }

  .undo-proposal-banner__btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid transparent;
  }

  .undo-proposal-banner__btn--accept {
    background: rgba(99, 102, 241, 0.8);
    color: white;
    border-color: rgba(99, 102, 241, 0.6);
  }

  .undo-proposal-banner__btn--accept:hover {
    background: rgba(99, 102, 241, 1);
  }

  .undo-proposal-banner__btn--decline {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .undo-proposal-banner__btn--decline:hover {
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
  }
</style>
