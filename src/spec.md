# Specification

## Summary
**Goal:** Make Ask Krishna’s chat replies more Krishna-like, conversational, and able to respond naturally to greetings while keeping responses stable and valid.

**Planned changes:**
- Update `backend/main.mo` `getChatbotResponse(userMessage, mood, sessionHistory)` so `supportiveMessage` is an original, conversational Krishna-voiced reply that synthesizes Gita teachings (not direct verse text), and always returns a valid `ChatbotResponse` with non-empty `supportiveMessage`, at least one `followUpQuestions` item, and a non-empty `actionStep` (even when no verse is selected or input is empty).
- Add greeting/small-talk handling in `getChatbotResponse` so greetings like “Hi/Hello/Hey” produce a friendly greeting plus a check-in question (e.g., “How are you doing today?”) and small-talk-appropriate follow-up questions, without requiring a selected verse.
- Adjust the “no verse” helper text in `frontend/src/components/chat/ChatThread.tsx` to be a single concise plain-English sentence with no emojis, consistent with the updated conversational tone.

**User-visible outcome:** Users receive more natural, Krishna-like conversational guidance (including friendly greeting responses), and the chat UI displays plain-English helper text when no verse is available.
