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
  lastLogin: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  login: (email: string, role: AdminRole) => void;
  logout: () => void;
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdminUser: AdminUser = {
  id: 'admin_001',
  name: 'Alex Mercer (Super Admin)',
  email: 'admin@trinode.ai',
  role: 'Super Admin',
  mfaEnabled: true,
  lastLogin: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(defaultAdminUser);
  const [token, setToken] = useState<string | null>('jwt_admin_session_token_2026');

  const login = (email: string, role: AdminRole) => {
    const newUser: AdminUser = {
      id: `admin_${Date.now()}`,
      name: `${email.split('@')[0]} (${role})`,
      email,
      role,
      mfaEnabled: true,
      lastLogin: new Date().toISOString(),
    };
    setUser(newUser);
    setToken(`jwt_admin_${Date.now()}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return false;
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

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasPermission }}>
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
