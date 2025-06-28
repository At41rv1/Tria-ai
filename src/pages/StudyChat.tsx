import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Home, ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModelSelector from '../components/ModelSelector';
import UserButton from '../components/UserButton';
import VoiceAssistant from '../components/VoiceAssistant';

interface Message {
  id: string;
  sender: 'user' | 'tutor1' | 'tutor2';
  content: string;
  timestamp: Date;
}

const StudyChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3.1-8b-instant');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGroqAPI = async (prompt: string, apiKey: string, tutorName: string) => {
    const systemPrompt = tutorName === 'Tutor1' 
      ? "You are an expert AI tutor who specializes in breaking down complex concepts into simple, understandable steps. You focus on understanding the student's learning style and providing clear, structured explanations. Always encourage questions and provide examples. Work collaboratively with other tutors to provide comprehensive learning support."
      : "You are an engaging AI tutor who excels at making learning fun and memorable through analogies, stories, and interactive explanations. You help students connect new concepts to things they already know. You work with other tutors to ensure students get well-rounded educational support.";

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process that request.';
    } catch (error) {
      console.error(`Error calling Groq API for ${tutorName}:`, error);
      return `Sorry, I'm having trouble connecting right now. Please try again!`;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const conversationContext = messages.slice(-5).map(msg => 
      `${msg.sender === 'user' ? 'Student' : msg.sender === 'tutor1' ? 'Tutor1' : 'Tutor2'}: ${msg.content}`
    ).join('\n') + `\nStudent: ${userMessage.content}`;

    try {
      const tutor1Response = await callGroqAPI(
        `Learning context:\n${conversationContext}\n\nPlease provide educational support as Tutor1. Focus on clear explanations and structured learning.`,
        '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',
        'Tutor1'
      );

      const tutor1Message: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor1',
        content: tutor1Response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, tutor1Message]);

      // Speak Tutor1's response
      if ((window as any).triaSpeak) {
        (window as any).triaSpeak(`Structured Tutor says: ${tutor1Response}`);
      }

      setTimeout(async () => {
        const updatedContext = conversationContext + `\nTutor1: ${tutor1Response}`;
        
        const tutor2Response = await callGroqAPI(
          `Learning context:\n${updatedContext}\n\nPlease provide additional educational support as Tutor2. You can build on Tutor1's explanation with engaging examples and connections.`,
          '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',
          'Tutor2'
        );

        const tutor2Message: Message = {
          id: (Date.now() + 2).toString(),
          sender: 'tutor2',
          content: tutor2Response,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, tutor2Message]);
        
        // Speak Tutor2's response after Tutor1
        setTimeout(() => {
          if ((window as any).triaSpeak) {
            (window as any).triaSpeak(`Creative Tutor says: ${tutor2Response}`);
          }
        }, 2000);
        
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error in learning session:', error);
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInput(text);
    handleSendMessage(text);
  };

  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'You';
      case 'tutor1':
        return 'Structured Tutor';
      case 'tutor2':
        return 'Creative Tutor';
      default:
        return 'Unknown';
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg';
      case 'tutor1':
        return 'bg-white text-gray-800 border border-indigo-200 shadow-md';
      case 'tutor2':
        return 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-800 border border-purple-200 shadow-md';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSenderAvatar = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'tutor1':
        return 'bg-gradient-to-r from-indigo-600 to-indigo-700';
      case 'tutor2':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/chat-selector" 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium hidden sm:inline">Back to Chat Options</span>
              <Home size={20} className="sm:hidden" />
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Study Mode
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">AI-Powered Learning Experience</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <VoiceAssistant onVoiceInput={handleVoiceInput} isProcessing={isLoading} />
            <ModelSelector 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <UserButton />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="text-white" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome to Study Mode!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm sm:text-base">
                  Ask any question and our AI tutors will work together to help you understand and learn effectively.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12">
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Structured Tutor</p>
                    <p className="text-xs sm:text-sm text-gray-500">Clear & Organized</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Creative Tutor</p>
                    <p className="text-xs sm:text-sm text-gray-500">Engaging & Fun</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-6 ${getSenderColor(message.sender)} backdrop-blur-sm`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 ${getSenderAvatar(message.sender)} rounded-full flex items-center justify-center`}>
                    <User className="text-white" size={16} />
                  </div>
                  <span className="font-semibold text-sm">{getSenderName(message.sender)}</span>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 max-w-[75%] shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Tutors are thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-3 sm:space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your tutors anything you want to learn..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-lg placeholder-gray-500 text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyChat;