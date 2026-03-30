<script lang="ts">
  import MessageSquarePlus from "@lucide/svelte/icons/message-square-plus";
  import X from "@lucide/svelte/icons/x";

  interface SimulatorSupportReminderProps {
    text: string;
    surface?: "toolbar" | "sidebar";
    onOpen?: () => void;
    onDismiss?: () => void;
  }

  let {
    text,
    surface = "toolbar",
    onOpen,
    onDismiss,
  }: SimulatorSupportReminderProps = $props();
</script>

<div class={`support-reminder support-reminder--${surface}`}>
  <button
    type="button"
    class="support-reminder__cta"
    onclick={onOpen}
    aria-label={`${text} Open bug report and feedback options.`}
  >
    <MessageSquarePlus class="support-reminder__icon size-3.5" />
    <span class="support-reminder__text">{text}</span>
  </button>

  <button
    type="button"
    class="support-reminder__dismiss"
    onclick={onDismiss}
    aria-label="Dismiss feedback reminder for one week"
  >
    <X class="size-3.5" />
  </button>
</div>

<style>
  .support-reminder {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 0.2rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.26);
    background: linear-gradient(180deg, rgba(14, 32, 54, 0.94), rgba(10, 21, 36, 0.96));
    color: #eff6ff;
    box-shadow: 0 10px 20px rgba(2, 6, 23, 0.24);
  }

  .support-reminder__cta,
  .support-reminder__dismiss {
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .support-reminder__cta {
    display: inline-flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    gap: 0.35rem;
    padding: 0.34rem 0.3rem 0.34rem 0.5rem;
    text-align: left;
  }

  .support-reminder__dismiss {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    margin-right: 0.1rem;
    padding: 0.28rem;
    border-radius: 999px;
    color: rgba(191, 219, 254, 0.78);
    transition: background 140ms ease, color 140ms ease;
  }

  .support-reminder__icon {
    flex: 0 0 auto;
    color: #7dd3fc;
  }

  .support-reminder__text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .support-reminder__cta:hover,
  .support-reminder__cta:focus-visible,
  .support-reminder__dismiss:hover,
  .support-reminder__dismiss:focus-visible {
    outline: none;
  }

  .support-reminder:has(.support-reminder__cta:hover),
  .support-reminder:has(.support-reminder__cta:focus-visible) {
    border-color: rgba(125, 211, 252, 0.52);
    background: linear-gradient(180deg, rgba(16, 39, 66, 0.98), rgba(10, 24, 42, 0.98));
  }

  .support-reminder__dismiss:hover,
  .support-reminder__dismiss:focus-visible {
    background: rgba(30, 41, 59, 0.86);
    color: #f8fafc;
  }

  .support-reminder--sidebar {
    max-width: min(14rem, 100%);
  }

  .support-reminder--toolbar {
    max-width: min(15rem, 100%);
  }

  @media (max-width: 767px) {
    .support-reminder--toolbar {
      max-width: min(11.5rem, 100%);
    }
  }
</style>
