'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { UserProfile } from '@/types/auth.types';
// Import moved to refreshUser function to avoid circular dependency

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: UserProfile) => void;
  logout: () => void;
  updateUser: (userData: UserProfile) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get('token');
  const isAuthenticated = !!user && !!token;
  
  // Debug authentication state
  console.log('🔐 AuthContext - Auth check:', {
    hasUser: !!user,
    hasToken: !!token,
    isAuthenticated,
    userFirstName: user?.firstName
  });

  const login = (token: string, userData: UserProfile) => {
    console.log('🔐 AuthContext.login called with:', { token: token ? 'present' : 'missing', userData });
    Cookies.set('token', token, { expires: 7 }); // 7 days
    console.log('🔐 Token set in cookies:', Cookies.get('token') ? 'SUCCESS' : 'FAILED');
    setUser(userData);
    console.log('🔐 User state updated in AuthContext');
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  const updateUser = (userData: UserProfile) => {
    setUser(userData);
  };

  const refreshUser = async () => {
    try {
      console.log('🔍 AuthContext: Calling getProfile API...');
      const { getProfile } = await import('@/hooks/apis/auth');
      const userData = await getProfile();
      console.log('🔍 AuthContext: getProfile response:', userData);
      setUser(userData);
    } catch (error) {
      console.error('🔍 AuthContext: Failed to refresh user data:', error);
      logout();
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('token');
      console.log('🔍 AuthContext: Token check:', token ? 'present' : 'missing');
      
      if (token) {
        try {
          console.log('🔍 AuthContext: Attempting to refresh user...');
          await refreshUser();
          console.log('🔍 AuthContext: User refresh completed');
        } catch (error) {
          console.error('🔍 AuthContext: Auth initialization failed:', error);
          logout();
        }
      } else {
        console.log('🔍 AuthContext: No token found, skipping refresh');
      }
      
      console.log('🔍 AuthContext: Setting isLoading to false');
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
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