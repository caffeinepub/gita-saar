# Specification

## Summary
**Goal:** Update the Read Gita UI to remove Hindi translation displays while keeping the Gen Z interpretation intact.

**Planned changes:**
- Update the Chapter detail verses table to remove the Hindi translation column and stop rendering `verse.hindiMeaning`.
- Adjust table layout details tied to the previous column count (e.g., empty-state `colSpan`, skeleton/layout sizing) so the table remains responsive on desktop and mobile.
- Update the single-verse detail card to remove the “Literal Hindi Translation” section and stop rendering `verse.hindiMeaning`, keeping Sanskrit, Literal English, Gen Z interpretation, and Action Step.

**User-visible outcome:** In Read Gita, chapter verse tables and verse detail views no longer show Hindi translations, while Gen Z interpretation remains available and the layout continues to render cleanly across screen sizes.
