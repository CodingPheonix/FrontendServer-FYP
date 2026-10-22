import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '../utils/auth-client';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userId: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const sessionResult = await authClient.getSession();
      if (sessionResult && sessionResult.data?.user) {
        const u = sessionResult.data.user;
        setUser({
          id: u.id,
          name: u.name,
          email: u.email
        });
      } else {
        // Fallback: check localStorage for cached user
        const cached = localStorage.getItem('phytoscan_user');
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.warn('Could not fetch active session:', err);
      const cached = localStorage.getItem('phytoscan_user');
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          setUser(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message || 'Login failed' };
      }

      if (data?.user) {
        const u = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        };
        setUser(u);
        localStorage.setItem('phytoscan_user', JSON.stringify(u));
        return { success: true };
      }

      return { success: false, error: 'User data not returned' };
    } catch (err: any) {
      return { success: false, error: err.message || 'An error occurred during login' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message || 'Registration failed' };
      }

      if (data?.user) {
        const u = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        };
        setUser(u);
        localStorage.setItem('phytoscan_user', JSON.stringify(u));
        return { success: true };
      }

      return { success: false, error: 'User data not returned' };
    } catch (err: any) {
      return { success: false, error: err.message || 'An error occurred during sign up' };
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error('Signout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('phytoscan_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user?.id || null,
        isLoading,
        login,
        register,
        logout,
        refreshSession: fetchSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
