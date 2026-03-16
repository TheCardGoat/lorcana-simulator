# Lorcana Card Localization

This document describes the card localization system for supporting multiple languages in the Lorcana card database.

## Overview

The localization system uses Ravensburger's multi-language API to provide card text in 4 languages:

- **en** - English (canonical source)
- **de** - German
- **fr** - French
- **it** - Italian

## Architecture

### Key Insight: culture_invariant_id

Ravensburger provides a `culture_invariant_id` that is **stable across all languages**. This allows us to:

1. Keep a single canonical card database (English)
2. Store only translatable strings for other languages
3. Merge at runtime based on the stable ID

### What Gets Localized

| Field                | Localized | Notes                              |
| -------------------- | --------- | ---------------------------------- |
| `name`               | ✅        | Card name                          |
| `version`            | ✅        | Card subtitle/version              |
| `fullName`           | ✅        | Combined name + version            |
| `rulesText`          | ✅        | Card abilities text                |
| `text`               | ✅        | Structured rules text (`CardText`) |
| `flavorText`         | ✅        | Flavor text                        |
| `searchableKeywords` | ✅        | Franchise names                    |
| Game mechanics       | ❌        | cost, strength, willpower, lore    |
| Card images          | ❌        | Same images used globally          |

## File Structure

```
packages/lorcana-cards/
├── data/inputs/
│   ├── ravensburger-input.json          # EN (canonical)
│   ├── ravensburger-input-de.json       # DE
│   ├── ravensburger-input-fr.json       # FR
│   └── ravensburger-input-it.json       # IT
├── src/data/
│   ├── canonical-cards.json             # Game cards (EN only)
│   ├── localization-de.json             # DE translations
│   ├── localization-fr.json             # FR translations
│   ├── localization-it.json             # IT translations
│   └── index.ts                         # Data utilities
└── scripts/
    ├── fetch-inputs.ts                  # Fetch all locales
    └── generate-localization.ts         # Generate translation files
```

## Usage

### 1. Fetch All Locales

```bash
bun run fetch
# or
bun run fetch:all-locales
```

This downloads card data from all 4 Ravensburger API endpoints.

### 2. Generate Localization Files

```bash
bun run generate-localization
```

This creates the lightweight `localization-{locale}.json` files containing only translatable strings.

### 3. Update Everything

```bash
bun run update-translations
```

This runs both fetch and generate in sequence.

## API Usage

### Basic Localization (Async)

```typescript
import { getLocalizedCard, loadLocalization } from "@tcg/lorcana-cards/data";

// Load German localization
await loadLocalization("de");

// Get localized card
const card = await getLocalizedCard("100", "de");
console.log(card.fullName); // "Lilo - Schneekünstlerin"
```

### Server-Side Rendering (Sync)

```typescript
import { serverLoadLocalization, getLocalizedCardSync } from "$lib/stores/lorcana-locale.svelte";

export const load: PageServerLoad = async ({ params }) => {
  const locale = "de";
  const localization = await serverLoadLocalization(locale);
  const card = getLocalizedCardSync(params.id, locale, localization);

  return { card, locale };
};
```

### Svelte Components

```svelte
<script>
  import { locale, useLocalizedCard, LocaleSelector } from "$lib/stores/lorcana-locale.svelte";

  const card = getCanonicalCard("100");
  const localizedCard = useLocalizedCard(card);
</script>

<LocaleSelector />

<h1>{$localizedCard.fullName}</h1>
<p>{$localizedCard.rulesText}</p>
```

## Performance

### File Sizes

| File                 | Size    |
| -------------------- | ------- |
| canonical-cards.json | ~3.5 MB |
| localization-de.json | ~0.7 MB |
| localization-fr.json | ~0.7 MB |
| localization-it.json | ~0.7 MB |

### Lazy Loading

Localization files are lazy-loaded on demand:

- Users only download the language they need
- English users download ~3.5 MB
- Other locales download ~4.2 MB (EN + localization)

### Caching

- Localization data is cached in memory after first load
- Use `clearLocalizationCache()` to free memory if needed

## Supported Locales

```typescript
const SUPPORTED_LOCALES = ["en", "de", "fr", "it"] as const;
type SupportedLocale = "en" | "de" | "fr" | "it";
```

### Simulator UI Locale Resolution

Core simulator supports UI locales that do not all exist in card-data payloads. Use
`resolveSimulatorCardLocale()` to map UI locale -> card locale in a deterministic way:

```typescript
import { resolveSimulatorCardLocale } from "@tcg/lorcana-cards/data";

resolveSimulatorCardLocale("de");
// => { uiLocale: "de", cardLocale: "de", usesFallback: false }

resolveSimulatorCardLocale("es");
// => {
//      uiLocale: "es",
//      cardLocale: "en",
//      usesFallback: true,
//      fallbackReason: "ui-locale-unsupported-by-card-data"
//    }
```

Current simulator mappings:

- `en` -> `en`
- `de` -> `de`
- `it` -> `it`
- `es` -> `en` (fallback)
- `pt-br` -> `en` (fallback)

## TypeScript Types

```typescript
interface LocalizedCardData {
  name: string;
  version: string;
  rulesText: string;
  text: CardText;
  flavorText: string;
  searchableKeywords: string[];
}

type LocalizationData = Record<string, LocalizedCardData>;
```

## Scripts Reference

| Script                          | Description                |
| ------------------------------- | -------------------------- |
| `bun run fetch`                 | Fetch EN data only         |
| `bun run fetch:all-locales`     | Fetch all 4 locales        |
| `bun run generate-localization` | Generate translation files |
| `bun run update-translations`   | Fetch + generate           |

## Future Enhancements

- **URL-based locale**: Support `/de/cards/...` URLs
- **Localized search**: Search in user's language
- **SEO**: Handle meta tags for different locales
- **Image localization**: Handle cards with text in images
