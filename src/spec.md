# Specification

## Summary
**Goal:** Improve the Read Gita chapter verse table to show full verse content without truncation, and fully populate verse data across all 18 chapters.

**Planned changes:**
- Update the ChapterDetailView verse table so all 5 columns wrap long text with no clamping/ellipsis on both desktop and mobile, with rows expanding vertically and cell content top-aligned.
- Populate backend verse data for every verse in every chapter (1–18) so chapter verse counts match returned verse list sizes and verse lookups return complete, non-empty text fields.
- Ensure curated verse lookups by mood only reference verses that exist in the full dataset.

**User-visible outcome:** Users can view every chapter’s complete set of verses, and read the full Sanskrit/translation/interpretation/action-step text directly in the chapter table on both desktop and mobile without any truncated rows.
