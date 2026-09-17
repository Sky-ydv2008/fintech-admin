import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Search, 
  Bell, 
  Lock, 
  Cpu, 
  Database,
  RefreshCw,
  Zap
} from 'lucide-react';
import { GlowBadge } from '../common/GlowBadge';
import { useAuth } from '../../context/AuthContext';

interface AdminNavbarProps {
  onRefreshData?: () => void;
  onOpenRoleModal?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onRefreshData, onOpenRoleModal }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      
      {/* Search & System Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <GlowBadge variant="orange" pulse icon={<Zap className="w-3.5 h-3.5 text-orange-400" />}>
            SYSTEM HEALTH: 99.9%
          </GlowBadge>
          <GlowBadge variant="green" size="sm">
            MFA VERIFIED
          </GlowBadge>
        </div>
      </div>

      {/* Action Controls & Admin Role Matrix Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onRefreshData}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
          title="Force Sync All Nodes"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Sync Data</span>
        </button>

        <button
          onClick={onOpenRoleModal}
          className="px-3.5 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-orange-300 text-xs font-semibold flex items-center gap-2 shadow-glow-orange transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>Switch Role / Permissions</span>
        </button>
      </div>

    </header>
  );
};
