import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Home, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModelSelector from '../components/ModelSelector';
import UserButton from '../components/UserButton';
import VoiceAssistant from '../components/VoiceAssistant';
import { useAuth } from '../contexts/HybridAuthContext';
import { saveChatMessage, getChatHistory } from '../lib/database';

interface Message {
  id: string;
  sender: 'user' | 'ram' | 'laxman';
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3.1-8b-instant');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when user logs in
  useEffect(() => {
    const loadChatHistory = async () => {
      if (currentUser) {
        try {
          const history = await getChatHistory(currentUser.id, 'triple', 20);
          const formattedHistory = history.map(msg => ({
            id: msg.id,
            sender: msg.sender as 'user' | 'ram' | 'laxman',
            content: msg.content,
            timestamp: msg.createdAt
          }));
          setMessages(formattedHistory);
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      }
    };

    loadChatHistory();
  }, [currentUser]);

  const callGroqAPI = async (prompt: string, apiKey: string, senderName: string) => {
    const systemPrompt = senderName === 'Ram' 
      ? "You are Ram, a dedicated AI assistant who gives perfect answers with a touch of fun and engagement. You're intelligent, helpful, and make conversations enjoyable. Keep responses conversational and friendly. When other AIs respond, acknowledge them naturally in the conversation."
      : "You are Laxman, a funny and witty AI assistant who delivers perfect answers with humor and lightness. You add entertainment value while being accurate and helpful. Keep responses conversational and add appropriate humor. When other AIs respond, engage with them naturally like friends would.";

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
      console.error(`Error calling Groq API for ${senderName}:`, error);
      return `Sorry, I'm having trouble connecting right now. Please try again!`;
    }
  };

  const saveMessage = async (sender: string, content: string) => {
    if (currentUser) {
      try {
        await saveChatMessage(currentUser.id, sender, content, 'triple');
      } catch (error) {
        console.error('Error saving message:', error);
      }
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
    await saveMessage('user', userMessage.content);
    setInput('');
    setIsLoading(true);

    const conversationContext = messages.slice(-5).map(msg => 
      `${msg.sender === 'user' ? 'User' : msg.sender === 'ram' ? 'Ram' : 'Laxman'}: ${msg.content}`
    ).join('\n') + `\nUser: ${userMessage.content}`;

    try {
      const ramResponse = await callGroqAPI(
        `Here's our conversation so far:\n${conversationContext}\n\nPlease respond as Ram. Keep it conversational and engaging.`,
        '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',
        'Ram'
      );

      const ramMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ram',
        content: ramResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, ramMessage]);
      await saveMessage('ram', ramMessage.content);

      // Speak Ram's response
      if ((window as any).triaSpeak) {
        (window as any).triaSpeak(`Ram says: ${ramResponse}`);
      }

      setTimeout(async () => {
        const updatedContext = conversationContext + `\nRam: ${ramResponse}`;
        
        const laxmanResponse = await callGroqAPI(
          `Here's our conversation so far:\n${updatedContext}\n\nPlease respond as Laxman. You can respond to both the user and Ram's message. Keep it funny and engaging while being helpful.`,
          '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',
          'Laxman'
        );

        const laxmanMessage: Message = {
          id: (Date.now() + 2).toString(),
          sender: 'laxman',
          content: laxmanResponse,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, laxmanMessage]);
        await saveMessage('laxman', laxmanMessage.content);
        
        // Speak Laxman's response after Ram
        setTimeout(() => {
          if ((window as any).triaSpeak) {
            (window as any).triaSpeak(`Laxman says: ${laxmanResponse}`);
          }
        }, 2000);
        
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error in conversation:', error);
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
      case 'ram':
        return 'Ram';
      case 'laxman':
        return 'Laxman';
      default:
        return 'Unknown';
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg';
      case 'ram':
        return 'bg-white text-gray-800 border border-indigo-200 shadow-md';
      case 'laxman':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 border border-purple-200 shadow-md';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSenderAvatar = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'ram':
        return 'bg-gradient-to-r from-indigo-600 to-indigo-700';
      case 'laxman':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium hidden sm:inline">Back to Home</span>
              <Home size={20} className="sm:hidden" />
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tria AI Chat
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Voice-Enabled AI Experience</p>
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

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome to Tria AI!</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm sm:text-base">
                    Start a conversation with Ram and Laxman. Use voice input or type your message!
                    {currentUser && <span className="block mt-2 text-green-600">✓ Your chat history will be saved</span>}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12">
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Ram</p>
                    <p className="text-xs sm:text-sm text-gray-500">Dedicated & Intelligent</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Laxman</p>
                    <p className="text-xs sm:text-sm text-gray-500">Funny & Witty</p>
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
                  <span className="text-sm text-gray-600 font-medium">AIs are thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-3 sm:space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message to Ram and Laxman..."
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

export default Chat;