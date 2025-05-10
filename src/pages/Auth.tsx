import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { Wallet } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-700 p-3 rounded-full">
              <Wallet size={28} className="text-white" />
            </div>
          </div>
          
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t border-gray-200">
          <p>Maya Payment Gateway &copy; 2025. All rights reserved.</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-white text-sm opacity-80">
        Demo credentials: <span className="font-mono">john@example.com</span> / <span className="font-mono">password123</span>
      </div>
    </div>
  );
};

export default Auth;