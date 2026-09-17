import React from 'react';
import { 
  LineChart, 
  Users, 
  Cpu, 
  BarChart2, 
  Activity, 
  TrendingUp, 
  Zap, 
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { AnimatedCounter } from '../common/AnimatedCounter';

const dauData = [
  { day: 'Mon', dau: 1420, newUsers: 140 },
  { day: 'Tue', dau: 1580, newUsers: 185 },
  { day: 'Wed', dau: 1690, newUsers: 210 },
  { day: 'Thu', dau: 1820, newUsers: 245 },
  { day: 'Fri', dau: 1930, newUsers: 280 },
  { day: 'Sat', dau: 1750, newUsers: 195 },
  { day: 'Sun', dau: 1890, newUsers: 220 },
];

const featureUsageData = [
  { name: 'AI Assistant Studio', value: 38 },
  { name: 'Live Markets Explorer', value: 34 },
  { name: 'Portfolio Tracker', value: 14 },
  { name: 'News Intelligence', value: 8 },
  { name: 'Anomaly ML Audit', value: 6 },
];

const COLORS = ['#FF8000', '#FF5E00', '#FF3300', '#00F0FF', '#10B981'];

export const AnalyticsModule: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Platform Analytics & User Trends
            </h1>
            <GlowBadge variant="orange" size="sm" pulse>
              REALTIME METRICS
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Track daily active user growth, feature usage allocation, AI inference latency, and popular asset query volume.
          </p>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">DAU / WAU Ratio</div>
          <div className="text-3xl font-extrabold text-white font-mono">
            <AnimatedCounter value={38.4} decimals={1} suffix="%" />
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Retention Cohort</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">New Registrations (7D)</div>
          <div className="text-3xl font-extrabold text-orange-400 font-mono">
            <AnimatedCounter value={1475} />
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">+18.5% Growth Week-over-Week</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Avg AI Inference Latency</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">24ms</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2">Optimal System Speed</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Most Searched Coin</div>
          <div className="text-3xl font-extrabold text-white font-mono">BTC / SOL</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">42% of total search traffic</div>
        </GlassCard>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DAU & Registration Area Chart */}
        <GlassCard className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-400" />
              Daily Active Users & New Registrations
            </h3>
            <span className="text-xs text-slate-400 font-mono">1,930 Active Today</span>
          </div>

          <div className="h-64 w-full bg-[#050508] p-4 rounded-xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dauData}>
                <defs>
                  <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8000" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF8000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="dau" stroke="#FF8000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDau)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Feature Usage Allocation Pie */}
        <GlassCard className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-orange-400" />
              Feature Usage Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">5 Core Modules</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={featureUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {featureUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => `${val}% Usage`}
                  contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300">
            {featureUsageData.map((d, idx) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
