# Gita Saar - App Structure and Flows

## Overview
Gita Saar is a mobile-first spiritual reflection platform that presents the Bhagavad Gita in a Gen-Z friendly format with a conversational Krishna chatbot, mood-based discovery, and comprehensive verse browsing.

## Architecture

### Tab Structure
The app uses a fixed bottom navigation with 4 main tabs:
1. **Home** - Hero section with primary CTAs
2. **Read Gita** - Browse all 18 chapters and verses
3. **Talk to Krishna** - AI chatbot with Hinglish personality
4. **Discover** - Mood-based verse curation

### State Management
- **Session Context**: Manages mood selection and chat history within browser session
- **React Query**: Handles all backend data fetching and caching
- **Local State**: Component-level UI state (scroll positions, view navigation)

### Scroll Preservation
The app preserves scroll position per tab during the session using a ref-based approach in App.tsx. When switching tabs, the current scroll position is saved and restored when returning to that tab.

## Page Flows

### Home Page
- Displays hero with headline and subtext
- Three primary CTAs:
  - "Open today's wisdom" → navigates to Read Gita tab with today's verse
  - "Find by mood" → navigates to Discover tab
  - "Talk to Krishna" → navigates to Chat tab
- Features section with quick access cards
- Footer with attribution and social links

### Read Gita Flow
1. **Chapter List View**: Shows all 18 chapters with English title, Sanskrit subtitle, verse count
2. **Chapter Detail View**: Lists all verses in selected chapter
3. **Verse Detail View**: Displays full VerseCard with 4-column layout
4. **Today's Wisdom**: Special view showing deterministic daily verse

Navigation: Chapters → Chapter Detail → Verse Detail (with back buttons)

### Talk to Krishna Flow
1. User enters message via text or voice input
2. Message sent to backend with optional mood context and session history
3. Backend returns:
   - Supportive Hinglish message
   - Selected verse (full VerseCard)
   - 1-2 follow-up questions
   - Action step
4. Follow-up questions are tappable to continue conversation
5. Chat maintains context within session

### Discover Flow
1. **Mood Selection**: 6 mood cards (Anxious, Lost, Angry, Sad, Motivated, Calm)
2. **Mood Detail View**: Shows curated verses for selected mood
3. **"Talk to Krishna about this"** CTA: Sets mood in session context and navigates to chat

## Component Breakdown

### Core Components
- **App.tsx**: Main shell with tab routing and scroll preservation
- **VerseCard**: Reusable 4-column verse display (Sanskrit, Hindi, English, Gen-Z interpretation + action step)
- **ChatThread**: Message list with user/Krishna bubbles
- **ChatComposer**: Text + voice input with Hinglish placeholders
- **FollowUpQuestions**: Tappable question chips
- **ChatSafetyModal**: Disclaimer about not being therapy

### Layout Components
- **ThemeToggle**: Light/dark mode switcher
- **BottomTabBar**: Fixed navigation (embedded in App.tsx)

### Page Components
- **HomePage**: Hero + features + footer
- **ReadGitaPage**: Chapter/verse navigation orchestrator
- **TalkToKrishnaPage**: Chat interface
- **DiscoverPage**: Mood selection + detail views

## Backend API Surface

### Query Methods (Read-only)
- `getAllChapters()` → Array<Chapter>
- `getVersesByChapter(chapterNumber: bigint)` → Array<Verse>
- `getVerse(chapter: bigint, verse: bigint)` → Verse | null
- `getTodaysVerse()` → Verse (deterministic by date)
- `getCuratedVersesByMood(mood: Mood)` → Array<Verse>
- `getMoodTaglines()` → Array<[Mood, string]>

### Update Methods (State-changing)
- `getChatbotResponse(userMessage: string, mood: Mood | null, sessionHistory: string[])` → ChatbotResponse

### Data Types
