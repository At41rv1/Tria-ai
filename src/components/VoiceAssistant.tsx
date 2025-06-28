import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface VoiceAssistantProps {
  onVoiceInput: (text: string) => void;
  isProcessing: boolean;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onVoiceInput, isProcessing }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      synthRef.current = speechSynthesis;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [onVoiceInput]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string) => {
    if (synthRef.current && text) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice for a soft, pleasant female voice
      const voices = synthRef.current.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('zira') ||
        (voice.gender && voice.gender === 'female')
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Expose speak function to parent component
  useEffect(() => {
    (window as any).triaSpeak = speak;
    return () => {
      delete (window as any).triaSpeak;
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing}
        className={`relative ${isListening ? 'bg-red-50 border-red-200 text-red-600' : 'hover:bg-gray-50'}`}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Stop</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Voice</span>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={isSpeaking ? stopSpeaking : undefined}
        disabled={!isSpeaking}
        className={`${isSpeaking ? 'bg-blue-50 border-blue-200 text-blue-600' : 'opacity-50'}`}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Stop</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Audio</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default VoiceAssistant;