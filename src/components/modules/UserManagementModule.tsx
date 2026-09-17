import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Ban, 
  RefreshCw, 
  UserCheck, 
  PieChart, 
  Bookmark, 
  X,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { AdminRole } from '../../context/AuthContext';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Suspended';
  role: 'User' | AdminRole;
  createdAt: string;
  portfolioValue: string;
  watchlistCount: number;
  aiRequestsCount: number;
  lastActive: string;
}

const initialUsers: AdminUserRecord[] = [
  { id: 'usr_89234', name: 'Alex Mercer', email: 'alex.mercer@apex.io', status: 'Active', role: 'Super Admin', createdAt: '2026-01-15', portfolioValue: '$142,850.40', watchlistCount: 5, aiRequestsCount: 142, lastActive: '2 mins ago' },
  { id: 'usr_12049', name: 'Sarah Chen', email: 'sarah.chen@fintech.com', status: 'Active', role: 'User', createdAt: '2026-02-01', portfolioValue: '$38,400.00', watchlistCount: 3, aiRequestsCount: 89, lastActive: '18 mins ago' },
  { id: 'usr_66321', name: 'David Vance', email: 'david.vance@quantum.net', status: 'Active', role: 'AI Admin', createdAt: '2026-02-10', portfolioValue: '$94,120.00', watchlistCount: 8, aiRequestsCount: 310, lastActive: '1 hour ago' },
  { id: 'usr_44012', name: 'Elena Rostova', email: 'elena.r@capital.ch', status: 'Suspended', role: 'User', createdAt: '2026-02-14', portfolioValue: '$12,500.00', watchlistCount: 2, aiRequestsCount: 15, lastActive: '3 days ago' },
  { id: 'usr_90123', name: 'Michael Sterling', email: 'm.sterling@global.org', status: 'Active', role: 'Content Admin', createdAt: '2026-02-20', portfolioValue: '$210,000.00', watchlistCount: 12, aiRequestsCount: 204, lastActive: '5 mins ago' },
];

export const UserManagementModule: React.FC = () => {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Suspended'>('All');
  const [activeUserDetail, setActiveUserDetail] = useState<AdminUserRecord | null>(null);
  const [roleModalUser, setRoleModalUser] = useState<AdminUserRecord | null>(null);
  const [newRole, setNewRole] = useState<AdminRole>('Analyst');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || u.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newSt = u.status === 'Active' ? 'Suspended' : 'Active';
          setNotice(`User ${u.email} status changed to ${newSt}.`);
          return { ...u, status: newSt };
        }
        return u;
      })
    );
    setTimeout(() => setNotice(null), 3000);
  };

  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleModalUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === roleModalUser.id ? { ...u, role: newRole } : u))
    );
    setNotice(`Assigned role '${newRole}' to ${roleModalUser.email}.`);
    setRoleModalUser(null);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              User & Account Control
            </h1>
            <GlowBadge variant="orange" size="sm" pulse>
              12,482 TOTAL USERS
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Search user accounts, review portfolio metadata, assign RBAC administrative roles, and reset active sessions.
          </p>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user ID, email, name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {(['All', 'Active', 'Suspended'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === st
                    ? 'bg-orange-500 text-white font-bold shadow-glow-orange'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Toast */}
      {notice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* User Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-4 px-6 font-semibold">User Details</th>
                <th className="py-4 px-4 font-semibold">Account Role</th>
                <th className="py-4 px-4 font-semibold">Portfolio Valuation</th>
                <th className="py-4 px-4 font-semibold">AI Usage Count</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Last Active</th>
                <th className="py-4 px-6 text-right font-semibold">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredUsers.map((u) => {
                const isActive = u.status === 'Active';

                return (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xs">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">{u.email} • {u.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[11px] border ${
                        u.role === 'Super Admin'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : u.role === 'User'
                          ? 'bg-white/5 text-slate-300 border-white/10'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-white">{u.portfolioValue}</td>
                    <td className="py-4 px-4 font-mono text-slate-300">{u.aiRequestsCount} Queries</td>

                    <td className="py-4 px-4 font-mono">
                      <GlowBadge variant={isActive ? 'green' : 'red'} size="sm">
                        {u.status}
                      </GlowBadge>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-400">{u.lastActive}</td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setRoleModalUser(u)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono"
                          title="Assign RBAC Role"
                        >
                          Role
                        </button>

                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300'
                              : 'bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
                          }`}
                        >
                          {isActive ? 'Suspend' : 'Unsuspend'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Assign Role Modal */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Assign Admin Role</h3>
              <button onClick={() => setRoleModalUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignRole} className="space-y-4">
              <div className="text-xs text-slate-300 font-mono">
                Target User: <strong className="text-white">{roleModalUser.email}</strong>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Select Role Permission</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminRole)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Super Admin" className="bg-[#0B0C12]">Super Admin (Full Access)</option>
                  <option value="Content Admin" className="bg-[#0B0C12]">Content Admin (News & Moderation)</option>
                  <option value="AI Admin" className="bg-[#0B0C12]">AI Admin (Prompts & RAG Vectors)</option>
                  <option value="Support Admin" className="bg-[#0B0C12]">Support Admin (Users & Anomalies)</option>
                  <option value="Analyst" className="bg-[#0B0C12]">Analyst (Read-Only Metrics)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setRoleModalUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  Confirm Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
