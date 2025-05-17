import { useState, useCallback, useEffect, useRef } from "react";

// Define types for SpeechRecognition since TypeScript doesn't have built-in types for this API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface UseVoiceSearchOptions {
  onResult?: (result: string) => void;
  continuous?: boolean;
  language?: string;
}

export function useVoiceSearch({ 
  onResult, 
  continuous = false, 
  language = 'en-US' 
}: UseVoiceSearchOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);
  
  // Keep a reference to the recognition instance
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition and check for browser support
  useEffect(() => {
    // Check browser compatibility
    const SpeechRecognition = window.SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;
    
    // Set the support flag based on whether SpeechRecognition is available
    setHasRecognitionSupport(!!SpeechRecognition);
    
    if (!SpeechRecognition) {
      setError(new Error("Speech recognition is not supported in this browser."));
      return;
    }
    
    // Clean up function to stop recognition when component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  // Start listening function
  const startListening = useCallback(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError(new Error("Speech recognition is not supported in this browser."));
      return;
    }
    
    try {
      // Create a new instance
      const recognition = new SpeechRecognition();
      
      // Configure
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = language;
      
      // Set up event handlers
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setError(null);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join("");
          
        setTranscript(transcript);
        
        // If this is a final result, call the onResult callback
        if (event.results[event.results.length - 1].isFinal) {
          if (onResult) {
            onResult(transcript);
          }
          
          if (!continuous) {
            recognition.stop();
          }
        }
      };
      
      recognition.onerror = (event: any) => {
        setError(new Error(event.error));
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      // Store the instance in the ref and start listening
      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Error starting speech recognition:", err);
      setError(err instanceof Error ? err : new Error("Unknown error starting speech recognition"));
      setIsListening(false);
    }
  }, [continuous, language, onResult]);
  
  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);
  
  return { 
    isListening, 
    transcript, 
    error, 
    startListening, 
    stopListening,
    hasRecognitionSupport  // Add this property to the returned object
  };
}
