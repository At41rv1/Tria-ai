import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, ArrowLeft, Users, Brain, Settings, Mic, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import UserButton from './UserButton';

const ChatSelector = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium hidden sm:inline">Back to Home</span>
            <span className="font-medium sm:hidden">Back</span>
          </Link>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Experience
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Select your preferred AI interaction mode</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {currentUser && (
              <Link 
                to="/settings" 
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
              >
                <Settings size={20} />
              </Link>
            )}
            <UserButton />
          </div>
        </div>
      </div>

      {/* Chat Options */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              How would you like to chat today?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Choose between personalized learning assistance or engaging conversation with our AI companions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Study Mode */}
            <Link 
              to="/study-chat"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="text-white" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Study Mode</h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                  AI tutors that work together in real-time to understand your unique learning style, pace, and curiosity, 
                  guiding you from confusion to mastery with personalized educational support.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4">
                  <div className="flex items-center justify-center text-indigo-600 bg-indigo-50 px-3 sm:px-4 py-2 rounded-full">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">Adaptive Learning</span>
                  </div>
                  <div className="flex items-center justify-center text-purple-600 bg-purple-50 px-3 sm:px-4 py-2 rounded-full">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">Personalized Tutoring</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Conversation Mode */}
            <Link 
              to="/chat"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Conversation with Ram & Laxman</h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                  Engage in dynamic three-way conversations with Ram and Laxman - two distinct AI personalities 
                  that bring intelligence, humor, and engaging dialogue to every interaction.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4">
                  <div className="flex items-center justify-center text-purple-600 bg-purple-50 px-3 sm:px-4 py-2 rounded-full">
                    <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">Voice Enabled</span>
                  </div>
                  <div className="flex items-center justify-center text-pink-600 bg-pink-50 px-3 sm:px-4 py-2 rounded-full">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">AI Personalities</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;