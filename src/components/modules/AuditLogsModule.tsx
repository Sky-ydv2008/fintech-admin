import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Download, 
  UserCheck, 
  Cpu, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  metadata: string;
  ipDevice: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  { id: 'log-1001', adminId: 'admin_team_lipsa', adminName: 'Lipsarani Bisoyi (Super Admin)', action: 'UPDATE_SYSTEM_PROMPT', target: 'Node 2 System Prompt v2.4', timestamp: '2026-03-01 14:20:12 UTC', metadata: 'Updated refusal guardrails and disclaimers', ipDevice: '192.168.1.1 (Chrome MacOS)' },
  { id: 'log-1002', adminId: 'admin_team_shivam', adminName: 'Shivam Yadav (Super Admin)', action: 'UPLOAD_RAG_DOCUMENT', target: 'Doc: Market Liquidity Rules 2026', timestamp: '2026-03-01 12:45:00 UTC', metadata: 'Generated 48 chunks in pgvector index', ipDevice: '185.220.101.5 (Firefox Linux)' },
  { id: 'log-1003', adminId: 'admin_team_aryan', adminName: 'Aryan Gupta (Super Admin)', action: 'APPROVE_NEWS_ARTICLE', target: 'Article #art-101', timestamp: '2026-03-01 08:15:00 UTC', metadata: 'Approved for public ticker feed', ipDevice: '104.28.14.2 (Safari iOS)' },
  { id: 'log-1004', adminId: 'admin_004', adminName: 'Support Admin', action: 'CONFIRM_FRAUD_ALERT', target: 'Tx: 0x55b1a...88ff', timestamp: '2026-03-01 09:30:15 UTC', metadata: 'Isolation score 78/100 confirmed malicious', ipDevice: '82.165.22.9 (Windows Edge)' },
];

export const AuditLogsModule: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Immutable Audit Logs
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Lock className="w-3.5 h-3.5 text-orange-400" />}>
              SECURITY COMPLIANCE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Tamper-evident audit trail recording every privileged administrator action, target user/resource, UTC timestamp, and security metadata.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search action, admin, or target..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={() => alert('Exporting audit log snapshot...')}
            className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Privileged Activity History</h3>
          <span className="text-xs font-mono text-slate-400">{logs.length} Immutable Log Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 uppercase text-slate-400 bg-white/[0.02] text-[11px]">
                <th className="py-4 px-6 font-semibold">Timestamp (UTC)</th>
                <th className="py-4 px-4 font-semibold">Administrator</th>
                <th className="py-4 px-4 font-semibold">Action Performed</th>
                <th className="py-4 px-4 font-semibold">Target Resource</th>
                <th className="py-4 px-4 font-semibold">Metadata Details</th>
                <th className="py-4 px-6 text-right font-semibold">IP & Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-slate-400 whitespace-nowrap">{log.timestamp}</td>

                  <td className="py-4 px-4 text-white font-bold whitespace-nowrap">
                    {log.adminName}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-200 font-semibold">{log.target}</td>

                  <td className="py-4 px-4 text-slate-300 max-w-xs truncate">{log.metadata}</td>

                  <td className="py-4 px-6 text-right text-slate-500 text-[11px] whitespace-nowrap">
                    {log.ipDevice}
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
