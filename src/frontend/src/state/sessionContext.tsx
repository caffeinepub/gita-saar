import { createContext, useContext, useState, ReactNode } from 'react';
import { Mood } from '@/backend';

type SessionContextType = {
  mood: Mood | null;
  setMood: (mood: Mood | null) => void;
  sessionHistory: string[];
  addToHistory: (message: string) => void;
  resetSession: () => void;
  pendingMessage: string | null;
  setPendingMessage: (message: string | null) => void;
  consumePendingMessage: () => string | null;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood | null>(null);
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const addToHistory = (message: string) => {
    setSessionHistory((prev) => [...prev, message]);
  };

  const resetSession = () => {
    setMood(null);
    setSessionHistory([]);
    setPendingMessage(null);
  };

  const consumePendingMessage = () => {
    const msg = pendingMessage;
    setPendingMessage(null);
    return msg;
  };

  return (
    <SessionContext.Provider
      value={{
        mood,
        setMood,
        sessionHistory,
        addToHistory,
        resetSession,
        pendingMessage,
        setPendingMessage,
        consumePendingMessage,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
