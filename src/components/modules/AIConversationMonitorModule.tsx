import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Clock, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface AIConversationRecord {
  id: string;
  userHash: string;
  querySnippet: string;
  responseSnippet: string;
  timestamp: string;
  latencyMs: number;
  feedback: 'Helpful' | 'Unhelpful' | 'Flagged';
  qualityScore: number; // 0 to 100
}

const mockConversations: AIConversationRecord[] = [
  { id: 'conv-101', userHash: 'usr_anon_89234', querySnippet: 'Why is Bitcoin surging past $92k today?', responseSnippet: 'Bitcoin momentum is driven by $420M spot ETF net inflows and low CPI print. Resistance at $94,000.', timestamp: '2 mins ago', latencyMs: 24, feedback: 'Helpful', qualityScore: 98 },
  { id: 'conv-102', userHash: 'usr_anon_12049', querySnippet: 'Explain RAG and pgvector retrieval process', responseSnippet: 'RAG extracts document chunks, generates embeddings, stores vectors in PostgreSQL pgvector, and retrieves context for LLM.', timestamp: '14 mins ago', latencyMs: 31, feedback: 'Helpful', qualityScore: 95 },
  { id: 'conv-103', userHash: 'usr_anon_66321', querySnippet: 'What is the exact price target for token XYZ next week?', responseSnippet: 'Future price movements cannot be guaranteed. Financial advice disclaimers apply. Technical indicators suggest consolidation.', timestamp: '28 mins ago', latencyMs: 29, feedback: 'Flagged', qualityScore: 78 },
  { id: 'conv-104', userHash: 'usr_anon_44012', querySnippet: 'How does Isolation Forest calculate transaction fraud risk?', responseSnippet: 'Isolation Forest isolates anomalies by randomly partitioning features. Anomalous vectors require fewer splits.', timestamp: '45 mins ago', latencyMs: 26, feedback: 'Helpful', qualityScore: 99 },
];

export const AIConversationMonitorModule: React.FC = () => {
  const [conversations, setConversations] = useState<AIConversationRecord[]>(mockConversations);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Helpful' | 'Flagged' | 'Unhelpful'>('All');

  const filteredConversations = conversations.filter(
    (c) => activeFilter === 'All' || c.feedback === activeFilter
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              AI Conversation & Quality Monitor
            </h1>
            <GlowBadge variant="orange" size="sm" pulse>
              NODE 2 CONVERSATION LOGS
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Track aggregate AI conversation metrics, monitor user helpful/unhelpful feedback, review flagged queries under privacy safeguards.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {(['All', 'Helpful', 'Flagged', 'Unhelpful'] as const).map((fb) => (
            <button
              key={fb}
              onClick={() => setActiveFilter(fb)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeFilter === fb
                  ? 'bg-orange-500 text-white font-bold shadow-glow-orange'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {fb}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Total Conversations Logged</div>
          <div className="text-3xl font-extrabold text-white font-mono">8,420</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">100% Privacy Hash Masked</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Helpful Feedback Ratio</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">96.4%</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>High Quality Rating</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Avg AI Inference Latency</div>
          <div className="text-3xl font-extrabold text-orange-400 font-mono">28ms</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Node 2 LLM Cluster</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Flagged Responses</div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">3 Queries</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Disclaimers enforced</div>
        </GlassCard>
      </div>

      {/* Privacy Guardrail Banner */}
      <div className="p-4 rounded-xl glass-card border-emerald-500/30 flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero PII Exposure: All user IDs are pseudonymized into cryptographic hashes.</span>
        </div>
        <span>Compliance Active</span>
      </div>

      {/* Conversation Log Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-4 px-6 font-semibold">User Hash / Time</th>
                <th className="py-4 px-4 font-semibold">Query Snippet</th>
                <th className="py-4 px-4 font-semibold">AI Response Output</th>
                <th className="py-4 px-4 font-semibold">Latency</th>
                <th className="py-4 px-4 font-semibold">Quality Score</th>
                <th className="py-4 px-6 text-right font-semibold">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredConversations.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-mono">
                    <div className="font-bold text-white">{c.userHash}</div>
                    <div className="text-[11px] text-slate-400">{c.timestamp}</div>
                  </td>

                  <td className="py-4 px-4 max-w-xs font-semibold text-slate-200">
                    "{c.querySnippet}"
                  </td>

                  <td className="py-4 px-4 max-w-sm text-slate-300 line-clamp-2">
                    {c.responseSnippet}
                  </td>

                  <td className="py-4 px-4 font-mono text-orange-400 font-bold">{c.latencyMs}ms</td>

                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                    {c.qualityScore} / 100
                  </td>

                  <td className="py-4 px-6 text-right">
                    <GlowBadge variant={c.feedback === 'Helpful' ? 'green' : c.feedback === 'Flagged' ? 'orange' : 'red'} size="sm">
                      {c.feedback}
                    </GlowBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
};
