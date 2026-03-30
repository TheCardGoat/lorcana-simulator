export interface PendingEffectsPopoverStateSnapshot {
  itemCount: number;
  bagCount: number;
  pendingCount: number;
  actionableSignature: string;
  previousItemCount: number;
  previousActionableSignature: string;
}

export function shouldDefaultPendingEffectsCollapsed({
  itemCount,
  bagCount,
  pendingCount,
}: Pick<PendingEffectsPopoverStateSnapshot, "itemCount" | "bagCount" | "pendingCount">): boolean {
  return itemCount === 1 || (itemCount === 2 && bagCount === 1 && pendingCount === 1);
}

export function shouldAutoOpenPendingEffects(
  snapshot: PendingEffectsPopoverStateSnapshot,
): boolean {
  const { itemCount, actionableSignature, previousItemCount, previousActionableSignature } =
    snapshot;

  if (itemCount === 0) {
    return false;
  }

  if (shouldDefaultPendingEffectsCollapsed(snapshot)) {
    return false;
  }

  return (
    previousItemCount === 0 ||
    (actionableSignature.length > 0 && actionableSignature !== previousActionableSignature)
  );
}
