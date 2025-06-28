import React from 'react';
import { Link } from 'react-router-dom';
import UserButton from './UserButton';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tria AI
            </span>
            <div className="text-xs text-gray-500 font-medium">Next-Gen AI</div>
          </div>
        </Link>
        
        <UserButton />
      </div>
    </header>
  );
};

export default Header;