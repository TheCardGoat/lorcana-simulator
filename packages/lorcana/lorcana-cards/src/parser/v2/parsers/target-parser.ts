/**
 * Target parser utilities for v2 parser tests.
 */

import {
  normalizeLorcanaTarget,
  type LorcanaCardTarget,
  type LorcanaPlayerTarget,
  type LorcanaTargetDSL,
} from "@tcg/lorcana-types/targeting";
import { parseAtomicEffect } from "../effects/atomic";

/**
 * Parse target from effect text and normalize to canonical Lorcana TargetDSL.
 */
export function parseTarget(text: string): LorcanaTargetDSL | null {
  const effect = parseAtomicEffect(text);
  if (effect && "target" in effect) {
    return normalizeLorcanaTarget((effect as { target: unknown }).target) ?? null;
  }
  return null;
}

/**
 * Parse target with optional modifier.
 */
export function parseTargetWithModifier(text: string): LorcanaTargetDSL | null {
  return parseTarget(text);
}

/**
 * Parse character target from text.
 */
export function parseCharacterTarget(text: string): LorcanaCardTarget | null {
  const lowerText = text.toLowerCase();
  const result: LorcanaCardTarget = {
    selector: "chosen",
    count: 1,
    owner: "any",
    zones: ["play"],
    cardTypes: ["character"],
  };

  if (
    lowerText.includes("chosen opposing") ||
    lowerText.includes("opponent's chosen") ||
    lowerText.includes("chosen opposing character")
  ) {
    result.owner = "opponent";
  } else if (
    lowerText.includes("chosen character of yours") ||
    lowerText.includes("your chosen character")
  ) {
    result.owner = "you";
  } else if (lowerText.includes("your characters")) {
    result.owner = "you";
    result.selector = "all";
    result.count = "all";
  } else if (lowerText.includes("this character")) {
    result.selector = "self";
    result.context = { self: true };
  }

  if (lowerText.includes("all characters") || lowerText.includes("all opposing characters")) {
    result.selector = "all";
    result.count = "all";
    if (lowerText.includes("opposing")) {
      result.owner = "opponent";
    }
  } else if (
    lowerText.includes("each character") ||
    lowerText.includes("each opposing character")
  ) {
    result.selector = "each";
    result.count = "all";
    if (lowerText.includes("opposing")) {
      result.owner = "opponent";
    }
  } else if (lowerText.includes("another character") || lowerText.includes("other character")) {
    result.excludeSelf = true;
  }

  return result;
}

/**
 * Parse item target from text.
 */
export function parseItemTarget(text: string): LorcanaCardTarget | null {
  const effect = parseAtomicEffect(text);
  if (!(effect && "target" in effect)) {
    return null;
  }

  const result: LorcanaCardTarget = {
    selector: "chosen",
    count: 1,
    owner: "any",
    zones: ["play"],
    cardTypes: ["item"],
  };

  const lowerText = text.toLowerCase();

  if (lowerText.includes("chosen opposing") || lowerText.includes("opponent's chosen")) {
    result.owner = "opponent";
  } else if (lowerText.includes("chosen item of yours") || lowerText.includes("your chosen")) {
    result.owner = "you";
  }

  if (lowerText.includes("all items")) {
    result.selector = "all";
    result.count = "all";
  } else if (lowerText.includes("each item")) {
    result.selector = "each";
    result.count = "all";
  }

  return result;
}

/**
 * Parse location target from text.
 */
export function parseLocationTarget(text: string): LorcanaCardTarget | null {
  const effect = parseAtomicEffect(text);
  if (!(effect && "target" in effect)) {
    return null;
  }

  const result: LorcanaCardTarget = {
    selector: "chosen",
    count: 1,
    owner: "any",
    zones: ["play"],
    cardTypes: ["location"],
  };

  const lowerText = text.toLowerCase();

  if (lowerText.includes("chosen opposing") || lowerText.includes("opponent's chosen")) {
    result.owner = "opponent";
  } else if (lowerText.includes("chosen location of yours") || lowerText.includes("your chosen")) {
    result.owner = "you";
  }

  if (lowerText.includes("all locations")) {
    result.selector = "all";
    result.count = "all";
  }

  return result;
}

/**
 * Parse player target from text and normalize to canonical PlayerTargetDSL.
 */
export function parsePlayerTarget(text: string): LorcanaPlayerTarget | null {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("you draw") ||
    lowerText.includes("you gain") ||
    lowerText.includes("you lose") ||
    lowerText.startsWith("you ")
  ) {
    return { selector: "you" };
  }
  if (
    lowerText.includes("opponent draw") ||
    lowerText.includes("opponent gain") ||
    lowerText.includes("opponent lose") ||
    lowerText.startsWith("opponent ")
  ) {
    return { selector: "opponent" };
  }
  if (lowerText.includes("each player")) {
    return { selector: "each-player" };
  }
  if (lowerText.includes("each opponent")) {
    return { selector: "each-opponent" };
  }

  return null;
}
