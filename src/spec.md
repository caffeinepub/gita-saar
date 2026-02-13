# Specification

## Summary
**Goal:** Fix the Read Gita section runtime/error state so chapters and verses load reliably, and add consistent, recoverable error handling in Read Gita-related views.

**Planned changes:**
- Identify and fix the root cause of the Read Gita loading error so chapter list, chapter verses, and verse details can be navigated without backend call failures or uncaught exceptions.
- Add consistent frontend error states and a Retry action for failed loads in ChapterDetailView, VerseDetailView, and Today’s Wisdom, while preserving existing non-error empty states.
- Harden backend Read Gita query methods (getAllChapters, getVersesByChapter, getVerse, getTodaysVerse) to avoid trapping on missing data and always return the expected types.

**User-visible outcome:** Opening Read Gita shows chapters without errors, selecting a chapter and verse works reliably, and if any Read Gita/TODAY’s Wisdom fetch fails the user sees a clear English message with a Retry button instead of a crash or stuck state.
