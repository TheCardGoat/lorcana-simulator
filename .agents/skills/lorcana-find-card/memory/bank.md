# Lorcana Find Card Memory Bank

## Guardrails

- Always return both definition and test paths when they exist.
- Keep ranking deterministic and explain top-score reasons.
- Prefer recent sets only as a tie-breaker, not as primary score.

## Entries

## 2026-03-05 - skill-hardening-baseline

- task: Establish deterministic lookup/similarity contract and memory loop.
- failure: Legacy workflow referenced missing helper command and alias behavior.
- root_cause: Skill drift after toolchain changes.
- corrective_action: Replaced with explicit scoring model and output schema.
- preventive_guardrail: Disallow undocumented helper command dependencies.
- verification: structural check only (files updated).
- handoff_notes: Downstream skills consume this schema directly.

## 2026-03-15 - apostrophe-slug-normalization

- task: Resolve a migration target for `World's Greatest Criminal Mind` while reconciling legacy inventory against current card paths.
- failure: The inventory marked the target as missing because the legacy slug used `world-s-...` while the current repo uses `worlds-...`.
- root_cause: Apostrophe normalization differs between legacy and current card slugs.
- corrective_action: Verified the target by deterministic path lookup and continued with the normalized current slug instead of trusting the inventory marker.
- preventive_guardrail: When an inventory item with punctuation looks missing, check alternate slug normalization before concluding the target file is absent.
- verification: `rg --files /Users/wazar/projects/lorcanito/packages/lorcana-engine | rg '031-world.?s-greatest-criminal-mind.test.ts'`; `rg --files packages/lorcana/lorcana-cards/src/cards | rg '031-worlds-greatest-criminal-mind(\\.test)?\\.ts'`
- handoff_notes: Downstream migration skills should treat inventory `MISSING` labels as advisory when punctuation-normalized slugs differ across repos.

## 2026-03-15 - set-011-location-apostrophe-variants

- task: Reconcile the final set-011 migration batch against inventory entries for `Scrooge's Counting House` and `Beast's Castle`.
- failure: The legacy inventory used `scrooge-s` and `beast-s` card paths while the current repo uses `scrooges` and `beasts`.
- root_cause: Apostrophe stripping differs between the legacy generator and the current repo slug normalization.
- corrective_action: Verified the current card and test files by deterministic path lookup and updated the inventory references to the current repo slugs.
- preventive_guardrail: For migration tracking, compare both legacy and current punctuation-normalized path variants before treating a location or card path mismatch as missing work.
- verification: `rg -n '134-.*office|136-.*winter-gardens|scrooges-counting-house|beasts-castle' /Users/wazar/projects/lorcanito/packages/lorcana-engine/CARD_TEST_INVENTORY.md`; `rg --files packages/lorcana/lorcana-cards/src/cards/011/locations | rg '134|136'`
- handoff_notes: Downstream inventory cleanup should normalize tracker card paths to the current repo slug when the test entry is already migrated.

## 2026-03-15 - deck-fixture-crosscheck-beats-inventory

- task: Ensure every simulator deck-fixture card was fully migrated, not just the currently selected inventory batch.
- failure: The fixture audit initially surfaced the 10 tracked inventory cards, but `Rapunzel - Gifted with Healing` was still in deck fixtures with `missingImplementation`/`missingTests` and no inventory row.
- root_cause: Simulator deck-fixture coverage and audit-inventory coverage can drift independently.
- corrective_action: Cross-checked the fixture-resolved card pool against missing flags and inventory entries, then treated untracked fixture cards as in-scope migration work.
- preventive_guardrail: For deck-fixture migration tasks, compare the resolved fixture pool against both inventory rows and `missingImplementation`/`missingTests` scans before assuming the tracked batch is exhaustive.
- verification: `rg -n '001/characters/018|003/characters/016|003/characters/184|005/characters/157|005/characters/193|005/characters/195|006/characters/053|006/characters/144|006/characters/191|007/characters/010|007/characters/193' packages/lorcana/lorcana-cards/src/cards/AUDIT_INVENTORY.md`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/characters/018-rapunzel-gifted-with-healing.test.ts ./src/cards/007/characters/010-tramp-street-smart-dog.test.ts ./src/cards/007/characters/193-mulan-disguised-soldier.test.ts`
- handoff_notes: If a fixture card lacks an inventory row, add or update the inventory during the same batch so future audits stay aligned.

## 2026-03-18 - set-006-apostrophe-slug-drift

- task: Resolve chunk-10 inventory entries that claimed `MISSING` for set-006 cards while validating the first 10 unchecked items.
- failure: Inventory rows used apostrophe-split slugs like `king-s-sensor-core`, `pooh-s-home`, and `mama-odie-s-home` even though the current repo already had executable cards/tests under normalized slugs.
- root_cause: Legacy and current slug normalization differ for possessives, and the inventory preserved the legacy spelling.
- corrective_action: Verified the existing current-repo files, updated the inventory rows to the normalized slugs, and completed the batch against the real paths.
- preventive_guardrail: When a chunk says `MISSING` for a possessive-name card, check the normalized no-apostrophe slug variant in the current repo before treating it as missing work.
- verification: `rg --files packages/lorcana/lorcana-cards/src/cards/006 | rg '200-kings-sensor-core|034-hundred-acre-island-poohs-home|069-mystical-tree-mama-odies-home'`; targeted 10-file Bun test batch in chunk 10.
- handoff_notes: Downstream migration batches should normalize inventory file paths to current repo slugs as soon as the executable target is confirmed.

## 2026-03-22 - sebastian-loyal-crab-implementation

- task: Implement test for Sebastian - Loyal Crab (010-016), a vanilla character card.
- failure: No failure; CLI similarity lookup returned correct card and similar vanilla cards for reference.
- root_cause: N/A - straightforward implementation.
- corrective_action: Created test file following vanilla card pattern (play, quest for lore, verify non-inkable constraint). Card definition already existed and matched legacy exactly.
- preventive_guardrail: For vanilla cards, always check `inkable` property to decide whether to test ink action.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/010/characters/016-sebastian-loyal-crab.test.ts` - 2 pass.
- handoff_notes: No legacy test existed for this card; implementation follows established vanilla card test pattern.

## 2026-04-11 - the-958 merlin lookup validation

- task: Resolve `Merlin - Intellectual Visionary` deterministically while triaging THE-958 (shift-trigger report).
- failure: No lookup failure occurred, but regression triage risk was false ambiguity between similarly named Merlin cards.
- root_cause: Multiple Merlin printings can exist across sets and reports often omit set/number identifiers.
- corrective_action: Used similarity CLI fast path and captured canonical id plus definition/test paths (`005-159-merlin-intellectual-visionary`) before writing simulator-level regression coverage.
- preventive_guardrail: For bug triage on named characters with many printings, always lock to canonical id and file paths first, then build or run regressions against that resolved card.
- verification: `bun packages/lorcana/lorcana-cards/src/cards/similarity.ts --query "Merlin - Intellectual Visionary" --limit 8`.
- handoff_notes: Downstream test-generation/fix work should reference the resolved set-005 Merlin files to avoid cross-print confusion.
