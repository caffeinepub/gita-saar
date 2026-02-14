# Specification

## Summary
**Goal:** Populate Bhagavad Gita Chapter 1 with a complete verse dataset (verses 1–72) including full interpretations for all fields used by the app.

**Planned changes:**
- Update `backend/main.mo` to include Verse records for Chapter 1 verses 1:1 through 1:72 with non-empty values for `sanskrit`, `hindiMeaning`, `englishMeaning`, `genZKrishnaInterpretation`, and `actionStep`.
- Update Chapter 1 metadata in `backend/main.mo` so `getAllChapters()` returns `verseCount: 72` for Chapter 1.

**User-visible outcome:** Users can load Bhagavad Gita Chapter 1 and access every verse from 1 to 72, each showing Sanskrit text, Hindi/English meaning, a Gen-Z Krishna interpretation, and an action step; Chapter 1 displays the correct verse count.
