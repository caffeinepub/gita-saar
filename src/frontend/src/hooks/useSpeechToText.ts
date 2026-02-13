import { useState, useEffect, useRef } from 'react';

export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support speech recognition - fail gracefully
      console.warn('Speech recognition not supported in this browser');
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event: any) => {
        // Handle errors gracefully without throwing
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          console.warn('Microphone permission denied');
        }
        
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, []);

  const startListening = () => {
    if (!isSupported) {
      console.warn('Speech recognition is not supported');
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
  };
}
