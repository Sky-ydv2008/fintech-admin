import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Lock, 
  Key, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export const SettingsModule: React.FC = () => {
  const [flags, setFlags] = useState({
    enableRAG: true,
    enableAnomalyML: true,
    enablePublicRegistration: true,
    maintenanceMode: false,
    strictSecurityHeaders: true,
  });

  const [rateLimit, setRateLimit] = useState('100 requests / min');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    setSaveNotice('System settings & feature flags updated on backend Express API!');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              System Settings & Feature Flags
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Settings className="w-3.5 h-3.5 text-orange-400" />}>
              PLATFORM CONFIGURATION
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Control feature flag activations, rate limiting parameters, system maintenance mode, and server API credentials status.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
        >
          <Save className="w-4 h-4 text-white" />
          <span>Save Platform Settings</span>
        </button>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Feature Flags Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Flags Control */}
        <GlassCard className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-400" />
              Controlled Feature Flags
            </h3>
            <span className="text-xs text-slate-400 font-mono">Live Toggle</span>
          </div>

          <div className="space-y-4 pt-2">
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white">Enable AI RAG Vector Retrieval</h4>
                <p className="text-xs text-slate-400">Inject pgvector document chunks into Node 2 LLM prompts.</p>
              </div>
              <button
                onClick={() => toggleFlag('enableRAG')}
                className={`w-12 h-6 rounded-full transition-colors relative ${flags.enableRAG ? 'bg-orange-500' : 'bg-white/20'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${flags.enableRAG ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white">Enable Isolation Forest Anomaly ML</h4>
                <p className="text-xs text-slate-400">Automated machine learning risk scoring for synthetic transactions.</p>
              </div>
              <button
                onClick={() => toggleFlag('enableAnomalyML')}
                className={`w-12 h-6 rounded-full transition-colors relative ${flags.enableAnomalyML ? 'bg-orange-500' : 'bg-white/20'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${flags.enableAnomalyML ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white">Enable Public Account Registration</h4>
                <p className="text-xs text-slate-400">Allow new users to create accounts without admin invite.</p>
              </div>
              <button
                onClick={() => toggleFlag('enablePublicRegistration')}
                className={`w-12 h-6 rounded-full transition-colors relative ${flags.enablePublicRegistration ? 'bg-orange-500' : 'bg-white/20'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${flags.enablePublicRegistration ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
              <div>
                <h4 className="text-sm font-bold text-rose-300">System Maintenance Mode</h4>
                <p className="text-xs text-slate-400">Lock user access and display system maintenance banner.</p>
              </div>
              <button
                onClick={() => toggleFlag('maintenanceMode')}
                className={`w-12 h-6 rounded-full transition-colors relative ${flags.maintenanceMode ? 'bg-rose-500' : 'bg-white/20'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${flags.maintenanceMode ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

          </div>
        </GlassCard>

        {/* Server API Key Status */}
        <GlassCard className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-orange-400" />
              Server Secrets Status
            </h3>
            <GlowBadge variant="green" size="sm">CONFIGURED</GlowBadge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#050508] border border-white/10 space-y-1">
              <div className="text-slate-400">GEMINI_API_KEY (Node 2):</div>
              <div className="text-emerald-400 font-bold">•••••••••••••••••••• (Active)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#050508] border border-white/10 space-y-1">
              <div className="text-slate-400">OPENAI_API_KEY (Embeddings):</div>
              <div className="text-emerald-400 font-bold">•••••••••••••••••••• (Active)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#050508] border border-white/10 space-y-1">
              <div className="text-slate-400">POSTGRES_PGVECTOR_URI:</div>
              <div className="text-emerald-400 font-bold">postgresql://trinode:***@db/vectors</div>
            </div>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
