import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  Newspaper, 
  Cpu, 
  Database, 
  MessageSquare, 
  ShieldAlert, 
  LineChart, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import { useAuth, AdminRole } from '../../context/AuthContext';

export type AdminTab = 
  | 'dashboard' 
  | 'users' 
  | 'market-data' 
  | 'news' 
  | 'ai-control' 
  | 'rag' 
  | 'ai-conversations' 
  | 'anomalies' 
  | 'analytics' 
  | 'audit-logs' 
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, hasPermission } = useAuth();

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Admin Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'users', label: 'Users & Accounts', icon: <Users className="w-4 h-4" /> },
    { id: 'market-data', label: 'Market Sync & Feeds', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'news', label: 'News & Content', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'ai-control', label: 'AI Control Center', icon: <Cpu className="w-4 h-4" />, badge: 'Prompts' },
    { id: 'rag', label: 'RAG Knowledge Base', icon: <Database className="w-4 h-4" />, badge: 'pgvector' },
    { id: 'ai-conversations', label: 'AI Conversations', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'anomalies', label: 'Anomaly ML Audit', icon: <ShieldAlert className="w-4 h-4" />, badge: '17 Alerts' },
    { id: 'analytics', label: 'Platform Analytics', icon: <LineChart className="w-4 h-4" /> },
    { id: 'audit-logs', label: 'Immutable Audit Logs', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings & Flags', icon: <Settings className="w-4 h-4" /> },
  ];

  const roleColors: Record<AdminRole, string> = {
    'Super Admin': 'bg-red-500/20 text-red-400 border-red-500/40',
    'Content Admin': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    'AI Admin': 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    'Support Admin': 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    'Analyst': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  };

  return (
    <aside className="w-64 bg-[#06070B] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40">
      
      <div className="p-5 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_20px_rgba(255,94,0,0.4)]">
            <span className="text-white font-mono font-extrabold text-base">3N</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                TRI<span className="text-orange-500">-</span>NODE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">
              PLATFORM CONTROL
            </p>
          </div>
        </div>

        {/* Navigation Item List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const allowed = hasPermission(item.id);

            return (
              <button
                key={item.id}
                onClick={() => allowed && setActiveTab(item.id)}
                disabled={!allowed}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/40 shadow-glow-orange'
                    : allowed
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* User Profile Footer */}
      {user && (
        <div className="p-4 border-t border-white/10 bg-[#080910] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className={`text-[10px] font-mono px-1.5 py-0.2 rounded border inline-block mt-0.5 ${roleColors[user.role]}`}>
                {user.role}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 text-xs font-medium transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      )}

    </aside>
  );
};
