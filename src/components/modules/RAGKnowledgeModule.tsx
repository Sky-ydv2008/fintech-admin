import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Search, 
  CheckCircle2, 
  Archive, 
  RefreshCw, 
  FileText, 
  Layers, 
  Zap, 
  X,
  Sparkles
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface RAGDocument {
  id: string;
  title: string;
  category: string;
  source: string;
  version: string;
  uploadDate: string;
  chunksCount: number;
  status: 'Indexed (pgvector)' | 'Processing' | 'Archived';
}

const initialDocuments: RAGDocument[] = [
  { id: 'doc-1', title: 'Tri-Node Platform Technical Implementation Plan 2026', category: 'Architecture', source: 'Internal PDF', version: 'v1.0', uploadDate: '2026-02-10', chunksCount: 48, status: 'Indexed (pgvector)' },
  { id: 'doc-2', title: 'Cryptocurrency Glossary & Technical Terminology', category: 'Education', source: 'Approved Research', version: 'v2.1', uploadDate: '2026-02-15', chunksCount: 124, status: 'Indexed (pgvector)' },
  { id: 'doc-3', title: 'Isolation Forest Anomaly Detection ML Specification', category: 'Security ML', source: 'Data Science Team', version: 'v1.2', uploadDate: '2026-02-22', chunksCount: 32, status: 'Indexed (pgvector)' },
  { id: 'doc-4', title: 'Federal Reserve Monetary Policy & Macro Economic Framework', category: 'Macroeconomics', source: 'Fed Public Record', version: 'v1.0', uploadDate: '2026-02-28', chunksCount: 64, status: 'Indexed (pgvector)' },
];

export const RAGKnowledgeModule: React.FC = () => {
  const [documents, setDocuments] = useState<RAGDocument[]>(initialDocuments);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Education');
  
  // Vector retrieval test state
  const [retrievalQuery, setRetrievalQuery] = useState('Isolation Forest anomaly score calculation');
  const [retrievalResults, setRetrievalResults] = useState<{ chunk: string; document: string; similarity: number }[] | null>(null);
  const [isSearchingVector, setIsSearchingVector] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    const newDoc: RAGDocument = {
      id: `doc-${Date.now()}`,
      title: docTitle,
      category: docCategory,
      source: 'Admin Upload',
      version: 'v1.0',
      uploadDate: new Date().toISOString().slice(0, 10),
      chunksCount: Math.floor(Math.random() * 50) + 20,
      status: 'Indexed (pgvector)',
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setShowUploadModal(false);
    setDocTitle('');
    setNotice(`Document "${newDoc.title}" chunked & stored in pgvector index!`);
    setTimeout(() => setNotice(null), 3000);
  };

  const toggleArchiveStatus = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const newSt = d.status === 'Archived' ? 'Indexed (pgvector)' : 'Archived';
          return { ...d, status: newSt };
        }
        return d;
      })
    );
  };

  const handleRunVectorRetrievalTest = () => {
    setIsSearchingVector(true);
    setRetrievalResults(null);

    setTimeout(() => {
      setRetrievalResults([
        {
          document: 'Isolation Forest Anomaly Detection ML Specification',
          chunk: 'Chunk #14: Isolation Forest isolates anomalies by randomly selecting a feature and split value. Anomalous transactions require fewer splits than normal baseline behaviors.',
          similarity: 0.942,
        },
        {
          document: 'Tri-Node Platform Technical Implementation Plan 2026',
          chunk: 'Chunk #22: Transaction Anomaly Detection uses Isolation Forest ML model to evaluate risk score between 0 and 100 based on device, location velocity, and volume deviation.',
          similarity: 0.885,
        },
      ]);
      setIsSearchingVector(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              RAG Knowledge Base & pgvector Index
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Database className="w-3.5 h-3.5 text-orange-400" />}>
              POSTGRESQL PGVECTOR
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage vector-indexed documentation, chunk embeddings, cosine similarity search indices, and test retrieval accuracy.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
        >
          <Upload className="w-4 h-4 text-white" />
          <span>Upload RAG Document</span>
        </button>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Vector Retrieval Test Tool */}
      <GlassCard className="p-6 space-y-4 border-orange-500/30">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Search className="w-5 h-5 text-orange-400" />
            <span>pgvector Cosine Similarity Retrieval Test Tool</span>
          </div>
          <GlowBadge variant="orange" size="sm">VECTOR RETRIEVAL BENCH</GlowBadge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={retrievalQuery}
              onChange={(e) => setRetrievalQuery(e.target.value)}
              placeholder="Enter search query to test vector cosine similarity retrieval..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
            <button
              onClick={handleRunVectorRetrievalTest}
              disabled={isSearchingVector}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange disabled:opacity-50 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSearchingVector ? 'Searching Vector Index...' : 'Test Retrieval'}</span>
            </button>
          </div>

          {/* Results Display */}
          {retrievalResults && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
                Top Matched Chunks (k=2):
              </div>
              {retrievalResults.map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#050508] border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-slate-200">{res.document}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Similarity: {(res.similarity * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">{res.chunk}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Documents Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Indexed RAG Document Repository</h3>
          <span className="text-xs font-mono text-slate-400">{documents.length} Documents Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-4 px-6 font-semibold">Document Title & Source</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Version</th>
                <th className="py-4 px-4 font-semibold">Upload Date</th>
                <th className="py-4 px-4 font-semibold">Chunks Count</th>
                <th className="py-4 px-4 font-semibold">Embedding Status</th>
                <th className="py-4 px-6 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-white">{doc.title}</div>
                    <div className="text-[11px] font-mono text-slate-400">{doc.source} • {doc.id}</div>
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {doc.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-400">{doc.version}</td>
                  <td className="py-4 px-4 font-mono text-slate-400">{doc.uploadDate}</td>
                  <td className="py-4 px-4 font-mono font-bold text-orange-400">{doc.chunksCount} Chunks</td>

                  <td className="py-4 px-4 font-mono">
                    <GlowBadge variant={doc.status.includes('Indexed') ? 'green' : 'neutral'} size="sm">
                      {doc.status}
                    </GlowBadge>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleArchiveStatus(doc.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono"
                    >
                      {doc.status === 'Archived' ? 'Restore' : 'Archive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Upload RAG Knowledge Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Market Liquidity Rules 2026"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Architecture" className="bg-[#0B0C12]">Architecture</option>
                  <option value="Education" className="bg-[#0B0C12]">Education</option>
                  <option value="Security ML" className="bg-[#0B0C12]">Security ML</option>
                  <option value="Macroeconomics" className="bg-[#0B0C12]">Macroeconomics</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  Upload & Chunk Vector Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
