import React from 'react';
import { 
  Users, 
  UserCheck, 
  Cpu, 
  DollarSign, 
  BarChart2, 
  Newspaper, 
  ShieldAlert, 
  Activity, 
  Database, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight,
  Zap,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { AdminOrb } from '../hero/AdminOrb';
import { AdminTab } from '../navigation/AdminSidebar';

const systemActivityData = [
  { time: '00:00', requests: 420, latency: 28 },
  { time: '04:00', requests: 680, latency: 32 },
  { time: '08:00', requests: 1250, latency: 31 },
  { time: '12:00', requests: 2400, latency: 35 },
  { time: '16:00', requests: 1980, latency: 29 },
  { time: '20:00', requests: 1690, latency: 27 },
  { time: '24:00', requests: 8420, latency: 26 },
];

const mockAlerts = [
  { id: 'al-1', txHash: '0x94f8a...3b21', score: 88, reason: 'Geographic velocity anomaly (Tokyo -> Zurich in 4 mins)', status: 'HIGH RISK' },
  { id: 'al-2', txHash: '0x77c4d...11ef', score: 62, reason: 'High frequency transaction burst (6 tx / 90s)', status: 'SUSPICIOUS' },
  { id: 'al-3', txHash: '0x55b1a...88ff', score: 78, reason: 'Transfer amount deviation (+420% from 30-day mean)', status: 'HIGH RISK' },
];

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              System Control Dashboard
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Zap className="w-3.5 h-3.5 text-orange-400" />}>
              ALL 3 NODES NOMINAL
            </GlowBadge>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Real-time control center monitoring platform users, AI LLM synthesis load, database vector health, and anomaly risk queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('ai-control')}
            className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
          >
            <Cpu className="w-4 h-4 text-white" />
            <span>AI Control Center</span>
          </button>
        </div>
      </div>

      {/* Top System Health Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Users */}
        <GlassCard glow="orange">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            <AnimatedCounter value={12482} />
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>1,930 Active Today (+12.4%)</span>
          </div>
        </GlassCard>

        {/* AI Requests */}
        <GlassCard>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>AI Requests Today</span>
            <Cpu className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-extrabold text-orange-400 font-mono">
            <AnimatedCounter value={8420} />
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>Avg Latency: 28ms</span>
          </div>
        </GlassCard>

        {/* Open Anomalies */}
        <GlassCard glow="red">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Open Anomaly Alerts</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">
            <AnimatedCounter value={17} />
          </div>
          <div className="text-[11px] text-rose-400 font-mono mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Requires Review</span>
          </div>
        </GlassCard>

        {/* API Health */}
        <GlassCard>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>API & Database Health</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            99.9%
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>PostgreSQL pgvector: Operational</span>
          </div>
        </GlassCard>

      </div>

      {/* Main Grid: Visual Orb + Request Volume Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* TriNode Admin Orb Visual */}
        <GlassCard glow="orange" className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Tri-Node Admin Shield
            </h3>
            <GlowBadge variant="orange" size="sm">LIVE MONITOR</GlowBadge>
          </div>

          <AdminOrb />

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-white/10">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-orange-400 font-bold">NODE 01</div>
              <div className="text-[10px] text-slate-400">DATA STREAM</div>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-orange-400 font-bold">NODE 02</div>
              <div className="text-[10px] text-slate-400">AI LLM CORE</div>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-orange-400 font-bold">NODE 03</div>
              <div className="text-[10px] text-slate-400">USER ENGINE</div>
            </div>
          </div>
        </GlassCard>

        {/* AI Load & Request Trend Chart */}
        <GlassCard className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-orange-400" />
              AI Request Volume & Latency (24H)
            </h3>
            <span className="text-xs text-slate-400 font-mono">8,420 Requests Today</span>
          </div>

          <div className="h-64 w-full bg-[#050508] p-4 rounded-xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemActivityData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8000" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF8000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#FF8000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* Live Anomaly Alert Feed Box */}
      <GlassCard className="p-6 space-y-4 border-rose-500/30">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Open Transaction Anomaly Alerts</span>
          </div>
          <button
            onClick={() => onNavigate('anomalies')}
            className="text-xs font-mono text-orange-400 hover:text-white flex items-center gap-1"
          >
            <span>Review All 17 Alerts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onNavigate('anomalies')}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                  <span>Tx: {alert.txHash}</span>
                  <span className="text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    Isolation Score: {alert.score}/100
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans">{alert.reason}</p>
              </div>

              <button className="px-3.5 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold shrink-0">
                Audit Anomaly
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
};
