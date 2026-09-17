import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Smartphone, 
  Clock, 
  FileText, 
  Check, 
  X,
  Zap,
  UserCheck
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface AdminAnomalyAlert {
  id: string;
  txHash: string;
  timestamp: string;
  account: string;
  amount: string;
  isolationScore: number; // 0-100
  ruleScore: number; // 0-100
  status: 'Pending Review' | 'Confirmed Fraud' | 'Dismissed';
  explanation: string;
  flaggedRules: string[];
  reviewerNotes?: string;
}

const initialAlerts: AdminAnomalyAlert[] = [
  {
    id: 'al-101',
    txHash: '0x94f8a...3b21',
    timestamp: '2 mins ago',
    account: 'usr_89234 (Alex Mercer)',
    amount: '$14,500 USDC',
    isolationScore: 88,
    ruleScore: 92,
    status: 'Pending Review',
    explanation:
      'High Anomaly score of 88/100 triggered by geographic velocity anomaly. User IP logged in Tokyo 4 minutes prior. Transfer amount represents +420% deviation from 30-day mean.',
    flaggedRules: [
      'Impossible Velocity (Tokyo -> Zurich in 4 mins)',
      'High Transfer Volume (+420%)',
      'Unrecognized Device Hash',
    ],
  },
  {
    id: 'al-102',
    txHash: '0x77c4d...11ef',
    timestamp: '14 mins ago',
    account: 'usr_66321 (David Vance)',
    amount: '85.0 SOL',
    isolationScore: 62,
    ruleScore: 65,
    status: 'Pending Review',
    explanation:
      'Suspicious score of 62/100 due to rapid burst of 6 consecutive transfers within 90 seconds from a new Linux user agent string.',
    flaggedRules: ['High Frequency Burst (6 tx / 90s)', 'New Browser Session'],
  },
  {
    id: 'al-103',
    txHash: '0x55b1a...88ff',
    timestamp: '42 mins ago',
    account: 'usr_90123 (Michael Sterling)',
    amount: '120.0 NVDA',
    isolationScore: 78,
    ruleScore: 80,
    status: 'Confirmed Fraud',
    explanation:
      'Transaction blocked and account locked due to multi-factor authentication bypass attempt.',
    flaggedRules: ['MFA Bypass Flag', 'IP Blacklist Match'],
    reviewerNotes: 'Confirmed malicious attempt by Support Admin.',
  },
];

export const AnomalyAuditModule: React.FC = () => {
  const [alerts, setAlerts] = useState<AdminAnomalyAlert[]>(initialAlerts);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending Review' | 'Confirmed Fraud' | 'Dismissed'>('All');
  const [auditModalAlert, setAuditModalAlert] = useState<AdminAnomalyAlert | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(
    (a) => activeFilter === 'All' || a.status === activeFilter
  );

  const handleUpdateAlertStatus = (status: 'Confirmed Fraud' | 'Dismissed') => {
    if (!auditModalAlert) return;

    setAlerts((prev) =>
      prev.map((a) =>
        a.id === auditModalAlert.id
          ? { ...a, status, reviewerNotes: noteInput || 'Reviewed by Admin Session' }
          : a
      )
    );

    setNotice(`Alert ${auditModalAlert.txHash} marked as '${status}'.`);
    setAuditModalAlert(null);
    setNoteInput('');
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Anomaly & Fraud Alert Queue
            </h1>
            <GlowBadge variant="red" size="sm" pulse icon={<ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}>
              ISOLATION FOREST ML ENGINE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Review synthetic transaction anomaly alerts sorted by risk score, audit machine learning feature vectors, and record reviewer decision logs.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {(['All', 'Pending Review', 'Confirmed Fraud', 'Dismissed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeFilter === st
                  ? 'bg-orange-500 text-white font-bold shadow-glow-orange'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Alert Cards Grid */}
      <div className="space-y-4">
        {filteredAlerts.map((al) => {
          const isHighRisk = al.isolationScore > 70;
          return (
            <GlassCard key={al.id} glow={isHighRisk ? 'red' : 'none'} className="space-y-4 p-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-extrabold text-sm">
                    {al.isolationScore}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-mono">Tx: {al.txHash}</h3>
                    <span className="text-xs font-mono text-slate-400">{al.account} • {al.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <GlowBadge variant={al.status === 'Pending Review' ? 'orange' : al.status === 'Confirmed Fraud' ? 'red' : 'green'} size="sm">
                    {al.status}
                  </GlowBadge>

                  <button
                    onClick={() => {
                      setAuditModalAlert(al);
                      setNoteInput(al.reviewerNotes || '');
                    }}
                    className="btn-primary px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Audit Anomaly</span>
                  </button>
                </div>
              </div>

              {/* Amount & Risk Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono bg-[#050508] p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-500 block">Transfer Amount:</span>
                  <span className="text-white font-bold text-sm">{al.amount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Isolation Forest ML Score:</span>
                  <span className="text-rose-400 font-bold text-sm">{al.isolationScore} / 100</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rule Engine Score:</span>
                  <span className="text-orange-400 font-bold text-sm">{al.ruleScore} / 100</span>
                </div>
              </div>

              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {al.explanation}
              </p>

              {/* Flagged Rules */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-rose-300">
                <span className="text-slate-400">Flagged Rules:</span>
                {al.flaggedRules.map((r, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    {r}
                  </span>
                ))}
              </div>

            </GlassCard>
          );
        })}
      </div>

      {/* Audit Modal */}
      {auditModalAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Review Anomaly Alert #{auditModalAlert.id}</h3>
              <button onClick={() => setAuditModalAlert(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 font-mono">
                <div><span className="text-slate-400">Tx Hash:</span> <span className="text-white font-bold">{auditModalAlert.txHash}</span></div>
                <div><span className="text-slate-400">Account:</span> <span className="text-white">{auditModalAlert.account}</span></div>
                <div><span className="text-slate-400">Amount:</span> <span className="text-white">{auditModalAlert.amount}</span></div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Reviewer Notes</label>
                <textarea
                  rows={3}
                  placeholder="Enter audit notes regarding this transaction..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleUpdateAlertStatus('Dismissed')}
                  className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold"
                >
                  Dismiss (False Positive)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateAlertStatus('Confirmed Fraud')}
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Confirm Fraud & Lock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
