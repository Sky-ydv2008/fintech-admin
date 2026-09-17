import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  History, 
  Play, 
  Save, 
  Check, 
  RefreshCw,
  Zap,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface PromptVersion {
  version: string;
  updatedAt: string;
  author: string;
  systemPrompt: string;
  isActive: boolean;
}

const initialPromptVersions: PromptVersion[] = [
  {
    version: 'v2.4 (Active)',
    updatedAt: '2026-03-01 14:20 UTC',
    author: 'Alex Mercer (AI Admin)',
    systemPrompt:
      'You are Tri-Node AI, a high-precision cryptocurrency and fintech intelligence assistant. Analyze market feeds, technical indicators, and news summaries. Always append informational disclaimers.',
    isActive: true,
  },
  {
    version: 'v2.3 (Archived)',
    updatedAt: '2026-02-18 09:15 UTC',
    author: 'David Vance',
    systemPrompt:
      'You are an AI financial assistant for Tri-Node. Answer user questions regarding crypto prices and basic technical indicators.',
    isActive: false,
  },
];

export const AIControlCenterModule: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash / Pro');
  const [promptVersions, setPromptVersions] = useState<PromptVersion[]>(initialPromptVersions);
  const [activePromptText, setActivePromptText] = useState(initialPromptVersions[0].systemPrompt);
  
  // Evaluation Lab state
  const [evalTestInput, setEvalTestInput] = useState('Why is Bitcoin surging today?');
  const [evalOutput, setEvalOutput] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const handleSaveNewPrompt = () => {
    const newVer: PromptVersion = {
      version: `v2.${promptVersions.length + 1} (Active)`,
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      author: 'Current AI Admin Session',
      systemPrompt: activePromptText,
      isActive: true,
    };

    setPromptVersions((prev) => [
      newVer,
      ...prev.map((p) => ({ ...p, isActive: false, version: p.version.replace(' (Active)', ' (Archived)') })),
    ]);

    setSaveNotice('System prompt updated & published to Node 2 AI Engine!');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setEvalOutput(null);

    setTimeout(() => {
      setEvalOutput(
        `**Model Output Evaluation (Confidence 99.2%):**\n\n` +
        `Bitcoin (BTC) is demonstrating bullish momentum driven by $420M net inflow into spot ETFs and lower CPI inflation metrics. Resistance at $94,000.\n\n` +
        `• Safety Compliance: PASS (Zero financial advice violation)\n` +
        `• Grounded Vector Matching: 0.94 Cosine Similarity\n` +
        `• Response Latency: 24ms`
      );
      setIsEvaluating(false);
    }, 1100);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              AI Control Center & Prompt Versioning
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Zap className="w-3.5 h-3.5 text-orange-400" />}>
              NODE 2 LLM ENGINE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure approved LLM inference models, edit versioned system prompts, monitor token budget costs, and run prompt evaluation test suites.
          </p>
        </div>

        {/* Model Selection */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-slate-400">Active LLM Model:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-transparent font-bold text-orange-400 focus:outline-none"
          >
            <option value="Gemini 2.5 Flash / Pro" className="bg-[#0B0C12]">Google Gemini 2.5 Pro</option>
            <option value="OpenAI GPT-4o" className="bg-[#0B0C12]">OpenAI GPT-4o</option>
            <option value="Local Llama 3 FinTech" className="bg-[#0B0C12]">Local Llama 3 FinTech (8B)</option>
          </select>
        </div>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Monthly AI Token Budget</div>
          <div className="text-2xl font-extrabold text-white font-mono">$42.80 / $500.00</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full w-[8.5%]" />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">8.5% Budget Utilized</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Tokens Synthesized Today</div>
          <div className="text-2xl font-extrabold text-orange-400 font-mono">1,420,850</div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">Avg 168 tokens per request</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Inference Latency</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">24ms</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-2">High Throughput Operational</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Safety Guardrails</div>
          <div className="text-xl font-extrabold text-white font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>ACTIVE (Strict)</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">Zero financial advice disclaimers enforced</div>
        </GlassCard>
      </div>

      {/* System Prompt Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor Box */}
        <GlassCard className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-400" />
              Active System Prompt Editor
            </h3>
            <span className="text-xs text-orange-400 font-mono font-bold">v2.4 Production</span>
          </div>

          <textarea
            rows={7}
            value={activePromptText}
            onChange={(e) => setActivePromptText(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#050508] border border-white/10 text-xs sm:text-sm font-mono text-slate-100 focus:outline-none focus:border-orange-500/50 leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 font-mono">Changes take effect immediately on Node 2 API</span>
            <button
              onClick={handleSaveNewPrompt}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
            >
              <Save className="w-4 h-4" />
              <span>Publish System Prompt Version</span>
            </button>
          </div>
        </GlassCard>

        {/* Prompt Version History */}
        <GlassCard className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-orange-400" />
              Version History
            </h3>
            <span className="text-xs text-slate-400 font-mono">{promptVersions.length} Versions Logged</span>
          </div>

          <div className="space-y-3">
            {promptVersions.map((pv, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                  pv.isActive
                    ? 'bg-orange-500/10 border-orange-500/40 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className={pv.isActive ? 'text-orange-400' : 'text-slate-300'}>{pv.version}</span>
                  <span className="text-[10px] text-slate-500">{pv.updatedAt}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{pv.systemPrompt}</div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

      {/* Prompt Evaluation Testing Lab */}
      <GlassCard className="p-6 space-y-4 border-orange-500/30">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Play className="w-5 h-5 text-orange-400" />
            <span>Prompt Evaluation & Safety Test Suite</span>
          </div>
          <GlowBadge variant="orange" size="sm">TEST BENCH</GlowBadge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-mono text-slate-400">Test Input Prompt Query:</label>
            <input
              type="text"
              value={evalTestInput}
              onChange={(e) => setEvalTestInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleRunEvaluation}
              disabled={isEvaluating}
              className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-orange disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Running Inference Test...' : 'Run Test Evaluation'}</span>
            </button>
          </div>

          <div className="lg:col-span-7 bg-[#050508] p-4 rounded-xl border border-white/10 min-h-[120px] text-xs font-mono space-y-2">
            <div className="text-slate-400 uppercase text-[10px] tracking-wider">Evaluation Output:</div>
            {evalOutput ? (
              <div className="text-slate-200 whitespace-pre-line font-sans leading-relaxed">
                {evalOutput}
              </div>
            ) : (
              <div className="text-slate-500 italic pt-4">Click "Run Test Evaluation" to test active system prompt safety and similarity matching.</div>
            )}
          </div>
        </div>
      </GlassCard>

    </div>
  );
};
