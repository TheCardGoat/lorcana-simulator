<script lang="ts">
  import type { PlayerStats } from "../types";
  import { cn } from "$lib/utils.js";
  import Trophy from "@lucide/svelte/icons/trophy";
  import Flame from "@lucide/svelte/icons/flame";
  import Target from "@lucide/svelte/icons/target";
  import Shield from "@lucide/svelte/icons/shield";
  import Zap from "@lucide/svelte/icons/zap";
  import Crown from "@lucide/svelte/icons/crown";
  import Swords from "@lucide/svelte/icons/swords";
  import Clock from "@lucide/svelte/icons/clock";

  interface Props {
    stats: PlayerStats;
  }

  let { stats }: Props = $props();

  type MilestoneDef = {
    id: string;
    label: string;
    description: string;
    icon: typeof Trophy;
    unlocked: boolean;
    progress: number;
    target: number;
  };

  const milestones = $derived<MilestoneDef[]>([
    {
      id: "first-blood",
      label: "First Blood",
      description: "Play your first game",
      icon: Zap,
      unlocked: stats.gamesPlayed >= 1,
      progress: Math.min(1, stats.gamesPlayed),
      target: 1,
    },
    {
      id: "ten-games",
      label: "Getting Started",
      description: "Play 10 games",
      icon: Target,
      unlocked: stats.gamesPlayed >= 10,
      progress: Math.min(1, stats.gamesPlayed / 10),
      target: 10,
    },
    {
      id: "century",
      label: "Century",
      description: "Play 100 games",
      icon: Shield,
      unlocked: stats.gamesPlayed >= 100,
      progress: Math.min(1, stats.gamesPlayed / 100),
      target: 100,
    },
    {
      id: "on-fire",
      label: "On Fire",
      description: "Win 5 games in a row",
      icon: Flame,
      unlocked: stats.highestWinStreak >= 5,
      progress: Math.min(1, stats.highestWinStreak / 5),
      target: 5,
    },
    {
      id: "inferno",
      label: "Inferno",
      description: "Win 10 games in a row",
      icon: Flame,
      unlocked: stats.highestWinStreak >= 10,
      progress: Math.min(1, stats.highestWinStreak / 10),
      target: 10,
    },
    {
      id: "consistent",
      label: "Consistent",
      description: "55%+ win rate (50+ games)",
      icon: Target,
      unlocked: stats.gamesPlayed >= 50 && stats.winRate >= 55,
      progress: stats.gamesPlayed >= 50 ? Math.min(1, stats.winRate / 55) : stats.gamesPlayed / 50,
      target: 1,
    },
    {
      id: "veteran",
      label: "Veteran",
      description: "Play 500 games",
      icon: Crown,
      unlocked: stats.gamesPlayed >= 500,
      progress: Math.min(1, stats.gamesPlayed / 500),
      target: 500,
    },
    {
      id: "dedicated",
      label: "Dedicated",
      description: "Play a game today",
      icon: Clock,
      unlocked: stats.gamesToday >= 1,
      progress: Math.min(1, stats.gamesToday / 1),
      target: 1,
    },
    {
      id: "gladiator",
      label: "Gladiator",
      description: "Win 100 games",
      icon: Swords,
      unlocked: stats.gamesWon >= 100,
      progress: Math.min(1, stats.gamesWon / 100),
      target: 100,
    },
    {
      id: "active-week",
      label: "Active Week",
      description: "Play 10 games this week",
      icon: Clock,
      unlocked: stats.gamesThisWeek >= 10,
      progress: Math.min(1, stats.gamesThisWeek / 10),
      target: 10,
    },
  ]);

  const unlockedCount = $derived(milestones.filter((m) => m.unlocked).length);
  const totalCount = $derived(milestones.length);
</script>

<div class="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
  <div class="mb-3 flex items-center justify-between">
    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Milestones</p>
    <span class="text-xs tabular-nums text-slate-500">
      {unlockedCount}/{totalCount}
    </span>
  </div>

  <div class="grid gap-2">
    {#each milestones as milestone}
      {@const Icon = milestone.icon}
      <div
        class={cn(
          "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
          milestone.unlocked
            ? "border-amber-400/20 bg-amber-950/20"
            : "border-white/[0.04] bg-transparent",
        )}
      >
        <div
          class={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            milestone.unlocked ? "bg-amber-400/20" : "bg-white/[0.04]",
          )}
        >
          <Icon
            class={cn(
              "size-4",
              milestone.unlocked ? "text-amber-300" : "text-slate-600",
            )}
          />
        </div>
        <div class="min-w-0 flex-1">
          <p
            class={cn(
              "text-sm font-medium",
              milestone.unlocked ? "text-amber-100" : "text-slate-400",
            )}
          >
            {milestone.label}
          </p>
          <p class="text-xs text-slate-500">{milestone.description}</p>
        </div>
        {#if milestone.unlocked}
          <Trophy class="size-4 shrink-0 text-amber-300" />
        {:else}
          <span class="text-xs tabular-nums text-slate-600">
            {milestone.progress >= 1 ? "" : `${Math.round(milestone.progress * 100)}%`}
          </span>
        {/if}
      </div>
    {/each}
  </div>
</div>
