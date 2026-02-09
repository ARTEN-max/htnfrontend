/**
 * Authentication context for managing user login state
 * Provides authentication state and login/logout functions throughout the app
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const HARDCODED_USERNAME = 'hacker';
const HARDCODED_PASSWORD = 'htn2026';
const AUTH_STORAGE_KEY = 'htn_auth';

/**
 * AuthProvider component that wraps the app and provides authentication context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check localStorage for persisted auth state
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored === 'true';
  });

  /**
   * Attempts to log in with the provided credentials
   * @param username - The username to authenticate
   * @param password - The password to authenticate
   * @returns true if login successful, false otherwise
   */
  const login = (username: string, password: string): boolean => {
    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  };

  /**
   * Logs out the current user
   */
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Sync state with localStorage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        setIsAuthenticated(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * @returns AuthContextType with authentication state and functions
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
