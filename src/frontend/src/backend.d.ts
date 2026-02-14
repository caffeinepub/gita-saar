import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Verse {
    hindiMeaning: string;
    verse: bigint;
    actionStep: string;
    englishMeaning: string;
    chapter: bigint;
    genZKrishnaInterpretation: string;
    sanskrit: string;
}
export interface ChatbotResponse {
    selectedVerse?: Verse;
    supportiveMessage: string;
    actionStep: string;
    followUpQuestions: Array<string>;
}
export interface Chapter {
    sanskritSubtitle: string;
    englishTitle: string;
    verseCount: bigint;
    keyInsights: Array<string>;
    summary: string;
    number: bigint;
}
export enum Mood {
    sad = "sad",
    anxious = "anxious",
    angry = "angry",
    calm = "calm",
    lost = "lost",
    motivated = "motivated"
}
export interface backendInterface {
    getAllChapters(): Promise<Array<Chapter>>;
    getChatbotResponse(userMessage: string, mood: Mood | null, _sessionHistory: Array<string>): Promise<ChatbotResponse>;
    getCuratedVersesByMood(mood: Mood): Promise<Array<Verse>>;
    getMoodTaglines(): Promise<Array<[Mood, string]>>;
    getTodaysVerse(): Promise<Verse | null>;
    getVerse(chapter: bigint, verse: bigint): Promise<Verse | null>;
    getVersesByChapter(chapterNumber: bigint): Promise<Array<Verse>>;
}
