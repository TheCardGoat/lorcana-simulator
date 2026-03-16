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
