import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, User2, Info } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 md:relative md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-end items-center h-16">
          <Link to="/" className="flex flex-col items-center text-indigo-600 hover:text-indigo-800">
            <Brain className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/assessment" className="flex flex-col items-center text-indigo-600 hover:text-indigo-800">
            <Activity className="h-6 w-6" />
            <span className="text-xs mt-1">Assessment</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-indigo-600 hover:text-indigo-800">
            <User2 className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link to="/about" className="flex flex-col items-center text-indigo-600 hover:text-indigo-800">
            <Info className="h-6 w-6" />
            <span className="text-xs mt-1">About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};