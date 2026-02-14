import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Verse, Mood, Chapter } from '@/backend';

export function useGetAllChapters() {
  const { actor, isFetching } = useActor();

  return useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not initialized');
      return actor.getAllChapters();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetVersesByChapter(chapterNumber: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Verse[]>({
    queryKey: ['verses', chapterNumber],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not initialized');
      return actor.getVersesByChapter(BigInt(chapterNumber));
    },
    enabled: !!actor && !isFetching && !!chapterNumber,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetVerse(chapter: number, verse: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Verse | null>({
    queryKey: ['verse', chapter, verse],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not initialized');
      return actor.getVerse(BigInt(chapter), BigInt(verse));
    },
    enabled: !!actor && !isFetching && !!chapter && !!verse,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetTodaysVerse() {
  const { actor, isFetching } = useActor();

  return useQuery<Verse | null>({
    queryKey: ['todaysVerse'],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not initialized');
      return actor.getTodaysVerse();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetCuratedVersesByMood(mood: Mood) {
  const { actor, isFetching } = useActor();

  return useQuery<Verse[]>({
    queryKey: ['curatedVerses', mood],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not initialized');
      return actor.getCuratedVersesByMood(mood);
    },
    enabled: !!actor && !isFetching && !!mood,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useChatbotResponse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userMessage,
      mood,
      sessionHistory,
    }: {
      userMessage: string;
      mood: Mood | null;
      sessionHistory: string[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getChatbotResponse(userMessage, mood, sessionHistory);
    },
    onSuccess: () => {
      // Optionally invalidate related queries
    },
  });
}
