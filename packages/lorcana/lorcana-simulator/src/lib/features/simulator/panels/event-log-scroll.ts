export interface ScrollMetrics {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

export function isScrolledNearBottom(
  { scrollHeight, scrollTop, clientHeight }: ScrollMetrics,
  thresholdPx = 24,
): boolean {
  return scrollHeight - scrollTop - clientHeight <= thresholdPx;
}

export function shouldAutoScrollOnNewRows(
  rowCount: number,
  previousRowCount: number,
  isPinnedToBottom: boolean,
): boolean {
  return rowCount > previousRowCount && isPinnedToBottom;
}
