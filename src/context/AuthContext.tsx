// src/context/AuthContext.tsx
// Manages authentication state across the app

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { placesAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  savedPlaces?: string[]; // optional list of saved place IDs
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  // update saved places in context
  setSaved: (placeId: string, saved: boolean) => void;
  refreshSaved: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Update single place's saved status in context and localStorage
  const setSaved = (placeId: string, saved: boolean) => {
    if (!user) return;
    const current = user.savedPlaces || [];
    let updated: string[];
    if (saved) {
      if (!current.includes(placeId)) {
        updated = [...current, placeId];
      } else {
        updated = current;
      }
    } else {
      updated = current.filter(id => id !== placeId);
    }
    const newUser = { ...user, savedPlaces: updated };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // fetch savedPlaces from backend and refresh context
  const refreshSaved = async () => {
    if (!token) return;
    try {
      const data = await placesAPI.getSavedPlaces();
      if (data.success && user) {
        const newUser = { ...user, savedPlaces: data.savedPlaces.map((p: any) => p._id) };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    } catch (err) {
      console.error('refreshSaved error', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        login,
        logout,
        setSaved,
        refreshSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
