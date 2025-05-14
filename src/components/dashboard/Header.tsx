import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome, {user?.username || 'User'}
          </h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.email || 'user@example.com'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;