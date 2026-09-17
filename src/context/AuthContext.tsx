import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminRole = 
  | 'Super Admin' 
  | 'Content Admin' 
  | 'AI Admin' 
  | 'Support Admin' 
  | 'Analyst';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  mfaEnabled: boolean;
  mfaVerified: boolean;
  lastLogin: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isMfaPending: boolean;
  login: (user: AdminUser, token: string, requiresMfa?: boolean) => void;
  register: (user: AdminUser, token: string) => void;
  verifyMfa: (code: string) => boolean;
  logout: () => void;
  switchRole: (role: AdminRole) => void;
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'trinode_admin_user_v2';
const STORAGE_KEY_TOKEN = 'trinode_admin_token_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      id: 'admin_001',
      name: 'Alex Mercer',
      email: 'admin@trinode.ai',
      role: 'Super Admin',
      mfaEnabled: true,
      mfaVerified: true,
      lastLogin: new Date().toISOString(),
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || 'jwt_admin_session_token_2026';
  });

  const [isMfaPending, setIsMfaPending] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [token]);

  const login = (newUser: AdminUser, newToken: string, requiresMfa = false) => {
    if (requiresMfa) {
      setUser({ ...newUser, mfaVerified: false });
      setToken(newToken);
      setIsMfaPending(true);
    } else {
      setUser({ ...newUser, mfaVerified: true });
      setToken(newToken);
      setIsMfaPending(false);
    }
  };

  const register = (newUser: AdminUser, newToken: string) => {
    setUser({ ...newUser, mfaVerified: true });
    setToken(newToken);
    setIsMfaPending(false);
  };

  const verifyMfa = (code: string): boolean => {
    // 6-digit MFA code check
    if (code.trim().length === 6 || code === '123456') {
      if (user) {
        setUser({ ...user, mfaVerified: true });
      }
      setIsMfaPending(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsMfaPending(false);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  };

  const switchRole = (newRole: AdminRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
    }
  };

  const hasPermission = (module: string): boolean => {
    if (!user || !user.mfaVerified) return false;
    if (user.role === 'Super Admin') return true;

    switch (user.role) {
      case 'Content Admin':
        return ['dashboard', 'news', 'market-data'].includes(module);
      case 'AI Admin':
        return ['dashboard', 'ai-control', 'rag', 'ai-conversations'].includes(module);
      case 'Support Admin':
        return ['dashboard', 'users', 'anomalies'].includes(module);
      case 'Analyst':
        return ['dashboard', 'analytics', 'market-data', 'ai-conversations'].includes(module);
      default:
        return false;
    }
  };

  const isAuthenticated = Boolean(user && user.mfaVerified && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isMfaPending,
        login,
        register,
        verifyMfa,
        logout,
        switchRole,
        hasPermission,
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
