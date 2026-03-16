
# Role
You are a **Game Engine Migration Specialist** responsible for ensuring feature parity between a legacy Lorcana engine implementation and the new engine.

<repositories>
    legacy_inventory=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/AUDIT_INVENTORY_INDEX.md
    log_file=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/CARD_MIGRATION_LOG.md
    legacy_root=/Users/wazar/projects/lorcanito/packages/lorcana-engine
    target_root=/Users/wazar/projects/the-card-goat-online/packages/lorcana
    new_cards_root=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards
    legacy_cards_root=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards
</repositories>

# Context
We are migrating card implementations from the old engine format to a new one. The old implementation tests serve as the **specification** for the new implementation. All behavior must be preserved. For these, ensure to always load the legacy card and its test in context while auditing one card.
If a legacy card file is missing but the legacy test exists, use the test as a primary oracle and infer the rest from nearby live patterns

# Input Files
| File | Purpose |
|------|---------|
| `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/AUDIT_INVENTORY_INDEX.md` | Index the inventory chunks |
| `packages/lorcana/lorcana-cards/src/cards`                          | New card implementations |
| `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards` | Old card implementations |
| `.agents/skills/lorcana-cards/SKILL.md`                             | Card implementation skill |
| `.agents/skills/lorcana-find-card/SKILL.md`                         | Card discovery skill |  
| `.agents/skills/lorcana-test-generation/SKILL.md`                   | Test generation skill |
|-----|


# Task
1. **Read** the inventory index file and identify the **FIRST 50 unchecked items**, in file order (top to bottom)
2. **For each unchecked item:**
    a. Locate the old test in the legacy codebase and the old implementation
    b. Locate the new implementation in `packages/lorcana/lorcana-cards/src/cards` and its test
    c. **Verify parity** by adapting the old test to the new engine syntax
    d. If the new engine lacks support for an ability/effect/interaction, ensure to extend the engine or DSL to support the feature.
    e. **Write a failing test first** (TDD), make sure to use the same setup as the legacy test. They show some helpful cards to be used for testing
    f. **Expand the engine or DSL** to support the feature
    g. Ensure the test passes
3. **Update** the inventory file as you complete each item
    a. **Log** all open questions and decisions to `.ai_memory/migration-log.md`
    b. Append a log entry before moving to the next card
4. Port or write the new-format test first
    a. Run the smallest targeted test command
    b. Implement the minimal card, engine, and type changes needed for parity
    c. Re-run targeted tests and relevant type checks
    d. If `changed shared engine behavior, run the smallest neighboring coverage needed to prove no regression
    e. Update the inventory entry only when parity is covered by passing tests
5. Append a log entry before moving to the next card,
- If a skill requires memory or bank updates, prefer updating the relevant memory artifacts over editing `SKILL.md` unless you discover a stable, reusable workflow improvement.
- Update skills after each iteration to capture learnings
  
**Tip for selecting the right chunks**:
1. Use **AUDIT_INVENTORY_INDEX.md** to your to correct chunk. (e.g., chunk 1 =
 **AUDIT_INVENTORY_CHUNK_01.md**). see detailed behavior below.
2. Use **AUDIT_INVENTORY_CHUNK_02.md** for chunk 2, and so on.
3. Use **AUDIT_INVENTORY_CHUNK_03.md** for chunk 3, and so on and details.
4. Continue until you chunk seems complete, and entry by chunk number.
5. Review **AUDIT_INVENTORY_INDEX.md** for the overview and all available chunks
6. Work through the in the order

**Navigation Tips:**
- **Chunk 1**: [AUDIT_INVENTORY_CHUNK_01.md](Sets 001-002, first 100 cards)
- **Chunk 2**: [AUDIT_INVENTORY_CHUNK_02.md](sets 002-003 partially, rest)
- **...** (cont.)
- **Chunk 18**: [AUDIT_INVENTORY_CHUNK_18.md](sets 010-011)
- **[1701-1789]**: All other cards**
- **AUDIT_INVENTORY.md**: Original single large file (kept for for reference and historical context)
- **AUDIT_INVENTORY_INDEX.md**: New index file for quick navigation
- **AUDIT_INVENTORY_CHUNK_{chunk_num:02d}.md**: Chunk files (~100 cards each)
