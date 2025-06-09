"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'merchant' | 'admin' | 'customer';
  businessName?: string;
  kycStatus?: 'pending' | 'verified' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('maya_token');
    const userData = localStorage.getItem('maya_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('maya_token');
        localStorage.removeItem('maya_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call your API
      const mockUsers = [
        {
          id: '1',
          name: 'John Merchant',
          email: 'merchant@example.com',
          role: 'merchant' as const,
          businessName: 'TechCorp Solutions',
          kycStatus: 'verified' as const
        },
        {
          id: '2',
          name: 'Admin User',
          email: 'admin@maya.com',
          role: 'admin' as const
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') {
        const token = 'mock-jwt-token';
        localStorage.setItem('maya_token', token);
        localStorage.setItem('maya_user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('maya_token');
    localStorage.removeItem('maya_user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}