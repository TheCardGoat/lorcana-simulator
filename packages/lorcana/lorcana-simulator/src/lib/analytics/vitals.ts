/**
 * Core Web Vitals reporter — LCP, CLS, INP, FCP.
 *
 * Implemented directly on top of PerformanceObserver to avoid pulling in the
 * `web-vitals` dependency. Reports each vital exactly once when it stabilises
 * (page hidden / pagehide), which mirrors Google's recommended methodology.
 */

import { trackEvent } from "./analytics.js";
import type { WebVitalParams } from "./types.js";

type VitalName = WebVitalParams["name"];

interface VitalThresholds {
  good: number;
  poor: number;
}

const THRESHOLDS: Record<VitalName, VitalThresholds> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

function rate(name: VitalName, value: number): WebVitalParams["rating"] {
  const t = THRESHOLDS[name];
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
}

function report(name: VitalName, value: number): void {
  // Keep CLS on its standard unitless scale (e.g. 0.12) so it stays comparable
  // to Core Web Vitals reports elsewhere. Other vitals are ms — round to int.
  const reportedValue = name === "CLS" ? Math.round(value * 10000) / 10000 : Math.round(value);
  trackEvent("web_vital", {
    name,
    value: reportedValue,
    rating: rate(name, value),
  });
}

interface SafePerformanceObserver {
  observe: (options: PerformanceObserverInit) => void;
  disconnect: () => void;
}

function safeObserve(
  type: string,
  cb: (entries: PerformanceEntry[]) => void,
  options: { buffered?: boolean; durationThreshold?: number } = {},
): SafePerformanceObserver | null {
  if (typeof PerformanceObserver === "undefined") return null;
  const { buffered = true, durationThreshold } = options;
  try {
    const observer = new PerformanceObserver((list) => cb(list.getEntries()));
    observer.observe({
      type,
      buffered,
      ...(durationThreshold != null ? { durationThreshold } : {}),
    } as PerformanceObserverInit);
    return observer;
  } catch {
    return null;
  }
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface EventTimingEntry extends PerformanceEntry {
  interactionId?: number;
}

interface NavigationTimingEntry extends PerformanceEntry {
  responseStart: number;
}

let started = false;

/**
 * Start observing Web Vitals. Safe to call multiple times — idempotent.
 * Must be called from the browser only (no-op on SSR).
 */
export function startVitalsReporting(): void {
  if (started || typeof window === "undefined") return;
  started = true;

  let lcpValue = 0;
  let clsValue = 0;
  let fcpValue: number | null = null;
  let ttfbValue: number | null = null;
  let inpValue = 0;

  const lcpObs = safeObserve("largest-contentful-paint", (entries) => {
    const last = entries[entries.length - 1];
    if (last) lcpValue = last.startTime;
  });

  const clsObs = safeObserve("layout-shift", (entries) => {
    for (const e of entries as LayoutShiftEntry[]) {
      if (!e.hadRecentInput) clsValue += e.value;
    }
  });

  const fcpObs = safeObserve("paint", (entries) => {
    for (const e of entries) {
      if (e.name === "first-contentful-paint") fcpValue = e.startTime;
    }
  });

  const navObs = safeObserve("navigation", (entries) => {
    const nav = entries[0] as NavigationTimingEntry | undefined;
    if (nav) ttfbValue = nav.responseStart;
  });

  // The default durationThreshold for PerformanceEventTiming is 104ms — any
  // interaction faster than that is dropped, biasing INP toward only slow
  // sessions. 40ms is the minimum the spec allows; matches web-vitals' default.
  const inpObs = safeObserve(
    "event",
    (entries) => {
      for (const e of entries as EventTimingEntry[]) {
        if (e.interactionId && e.duration > inpValue) inpValue = e.duration;
      }
    },
    { durationThreshold: 40 },
  );

  let flushed = false;
  const reportSnapshot = (): void => {
    if (lcpValue > 0) report("LCP", lcpValue);
    report("CLS", clsValue);
    if (fcpValue != null) report("FCP", fcpValue);
    if (ttfbValue != null) report("TTFB", ttfbValue);
    if (inpValue > 0) report("INP", inpValue);
  };
  const finalize = (): void => {
    if (flushed) return;
    flushed = true;
    reportSnapshot();
    lcpObs?.disconnect();
    clsObs?.disconnect();
    fcpObs?.disconnect();
    navObs?.disconnect();
    inpObs?.disconnect();
  };

  // pagehide fires for terminal unload AND for bfcache freeze (event.persisted
  // = true). For bfcache we emit a snapshot but keep observers alive so a
  // pageshow restore can keep measuring; on a real unload we disconnect.
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) {
      reportSnapshot();
    } else {
      finalize();
    }
  });
  // bfcache restore — reset accumulators and re-allow snapshot/final flushes
  // so the resumed session contributes its own metrics.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    flushed = false;
    lcpValue = 0;
    clsValue = 0;
    fcpValue = null;
    ttfbValue = null;
    inpValue = 0;
  });
}
