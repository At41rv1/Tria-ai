import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle, Mic, Brain } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-200 shadow-lg text-indigo-700 text-sm mb-8 hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              Next-Generation AI Experience
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 animate-fade-in delay-300">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tria AI
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6 animate-fade-in delay-500 leading-relaxed">
            Three Minds, One Perfect Conversation
          </p>
          
          <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-3xl mx-auto animate-fade-in delay-700 leading-relaxed px-4">
            Experience the future of AI interaction with voice-enabled conversations, intelligent tutoring, and personalities that truly understand you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat-selector" 
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-gray-500 text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Free • Voice Enabled • Smart
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 animate-fade-in delay-1000">
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 text-sm text-gray-700">
              <Mic className="w-4 h-4 mr-2 text-indigo-600" />
              Voice Assistant
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 text-sm text-gray-700">
              <Brain className="w-4 h-4 mr-2 text-purple-600" />
              Smart Learning
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 text-sm text-gray-700">
              <Users className="w-4 h-4 mr-2 text-pink-600" />
              Multi-AI Chat
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Meet Your AI Companions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three distinct personalities working in perfect harmony to provide you with the most engaging AI experience ever created.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Ram</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                Ram brings depth to every conversation, making complex topics accessible and enjoyable 
                with his engaging personality and thoughtful responses.
              </p>
              <div className="flex items-center text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full w-fit">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Intelligent & Reliable</span>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Laxman</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                The witty conversationalist who combines perfect accuracy with humor and lightness. 
                Laxman transforms every interaction into an entertaining experience while maintaining 
                exceptional helpfulness and providing insightful, engaging responses.
              </p>
              <div className="flex items-center text-purple-600 bg-purple-50 px-4 py-2 rounded-full w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Witty & Entertaining</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mic className="text-white" size={40} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Voice-Enabled Conversations</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Experience truly natural AI interactions with voice input and output. Speak naturally and hear responses 
                in a perfect, soft female voice that makes every conversation feel personal and engaging.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                  <Mic className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Voice Input</span>
                </div>
                <div className="flex items-center text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Instant Response</span>
                </div>
                <div className="flex items-center text-pink-600 bg-pink-50 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Natural Voice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Ready for the Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the next generation of AI interaction with voice-enabled conversations and intelligent companions
          </p>
          <Link 
            to="/chat-selector" 
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full text-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Experience Tria AI
            <MessageCircle className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Tria AI - The Future of Conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;