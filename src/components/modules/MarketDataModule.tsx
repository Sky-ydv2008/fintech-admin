import React, { useState } from 'react';
import { 
  BarChart2, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  Settings, 
  Check, 
  X,
  Zap,
  Clock
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface ProviderStatus {
  id: string;
  name: string;
  endpoint: string;
  status: 'Operational' | 'Degraded' | 'Offline';
  latency: number;
  rateLimitUsed: number; // %
  lastSync: string;
  errorRate: string;
}

const initialProviders: ProviderStatus[] = [
  { id: 'p1', name: 'CoinGecko Pro API', endpoint: 'api.coingecko.com/v3', status: 'Operational', latency: 42, rateLimitUsed: 34, lastSync: '12 seconds ago', errorRate: '0.02%' },
  { id: 'p2', name: 'Binance Websocket Feed', endpoint: 'stream.binance.com:9443', status: 'Operational', latency: 14, rateLimitUsed: 12, lastSync: 'Realtime Live', errorRate: '0.00%' },
  { id: 'p3', name: 'Polygon.io FinTech Equities', endpoint: 'api.polygon.io/v2', status: 'Operational', latency: 85, rateLimitUsed: 62, lastSync: '45 seconds ago', errorRate: '0.10%' },
  { id: 'p4', name: 'Financial Modeling Prep', endpoint: 'financialmodelingprep.com', status: 'Degraded', latency: 240, rateLimitUsed: 88, lastSync: '3 mins ago', errorRate: '1.45%' },
];

export const MarketDataModule: React.FC = () => {
  const [providers, setProviders] = useState<ProviderStatus[]>(initialProviders);
  const [refreshInterval, setRefreshInterval] = useState('30s');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('All connected market data pipelines resynced successfully!');
      setTimeout(() => setSyncNotice(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Market Data & Provider Health
            </h1>
            <GlowBadge variant="orange" size="sm" pulse>
              NODE 1 DATA ENGINE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Monitor external price provider feeds, websocket stream health, API rate limits, and ingestion refresh intervals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-slate-400">Sync Interval:</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="bg-transparent font-bold text-orange-400 focus:outline-none"
            >
              <option value="10s" className="bg-[#0B0C12]">10 Seconds</option>
              <option value="30s" className="bg-[#0B0C12]">30 Seconds</option>
              <option value="60s" className="bg-[#0B0C12]">60 Seconds</option>
              <option value="5m" className="bg-[#0B0C12]">5 Minutes</option>
            </select>
          </div>

          <button
            onClick={handleForceSync}
            disabled={isSyncing}
            className="btn-primary px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Force Resync Feeds'}</span>
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providers.map((p) => {
          const isOperational = p.status === 'Operational';
          return (
            <GlassCard key={p.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{p.name}</h3>
                <GlowBadge variant={isOperational ? 'green' : 'red'} size="sm">
                  {p.status}
                </GlowBadge>
              </div>

              <div className="text-[11px] font-mono text-slate-400 truncate border-b border-white/5 pb-2">
                {p.endpoint}
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-orange-400 font-bold">{p.latency}ms</span>
                </div>

                <div className="flex justify-between">
                  <span>Rate Limit Capacity:</span>
                  <span>{p.rateLimitUsed}% Used</span>
                </div>

                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.rateLimitUsed > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${p.rateLimitUsed}%` }}
                  />
                </div>

                <div className="flex justify-between pt-1">
                  <span>Last Sync:</span>
                  <span className="text-slate-400">{p.lastSync}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Data Quality Warnings Box */}
      <GlassCard className="p-6 space-y-4 border-amber-500/30 bg-amber-500/5">
        <div className="flex items-center gap-2 font-bold text-white text-base border-b border-amber-500/20 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Active Data Quality & Rate Limit Warnings</span>
        </div>

        <div className="space-y-3 text-xs text-slate-300 font-sans">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <strong className="text-white font-mono">Financial Modeling Prep API:</strong> Rate limit capacity at 88%. Consider upgrading tier or expanding proxy caching window.
            </div>
            <span className="text-amber-400 font-mono text-[11px]">WARNING</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <strong className="text-white font-mono">Orderbook Liquidity Depth:</strong> CoinGecko volume sync latency spiked to 240ms during high volatility period.
            </div>
            <span className="text-slate-400 font-mono text-[11px]">INFO</span>
          </div>
        </div>
      </GlassCard>

    </div>
  );
};
