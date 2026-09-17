import React, { useState } from 'react';
import { 
  Newspaper, 
  CheckCircle2, 
  XCircle, 
  EyeOff, 
  Sparkles, 
  Tag, 
  Star, 
  Clock, 
  X,
  Zap,
  Check
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface AdminNewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  status: 'Pending' | 'Approved' | 'Hidden';
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  topicTag: string;
  isFeatured: boolean;
  aiSummary: string;
}

const initialArticles: AdminNewsArticle[] = [
  {
    id: 'art-101',
    title: 'Institutional Spot ETF Net Inflows Exceed $420 Million in Single Session',
    source: 'Bloomberg Markets',
    publishedAt: '18 mins ago',
    status: 'Pending',
    sentiment: 'Bullish',
    topicTag: 'Crypto Institutional',
    isFeatured: true,
    aiSummary: 'Spot Bitcoin and Ethereum ETFs registered heavy net inflows today as institutional asset managers allocated fresh capital.',
  },
  {
    id: 'art-102',
    title: 'Federal Reserve Signals Steady Rate Environment Amid Balanced Employment Figures',
    source: 'Financial Times',
    publishedAt: '1 hour ago',
    status: 'Approved',
    sentiment: 'Neutral',
    topicTag: 'Fed Macro',
    isFeatured: false,
    aiSummary: 'Federal Reserve officials indicated interest rates will remain unchanged through the upcoming monetary policy meeting.',
  },
  {
    id: 'art-103',
    title: 'Unverified Rumor Regarding Regional Exchange Insolvency Surfaces on Forums',
    source: 'Unverified Social',
    publishedAt: '2 hours ago',
    status: 'Hidden',
    sentiment: 'Bearish',
    topicTag: 'Unverified Speculation',
    isFeatured: false,
    aiSummary: 'Social forum rumors regarding liquidity constraints. Flagged by automated content moderation filters.',
  },
];

export const NewsManagementModule: React.FC = () => {
  const [articles, setArticles] = useState<AdminNewsArticle[]>(initialArticles);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Hidden'>('All');
  const [previewArticle, setPreviewArticle] = useState<AdminNewsArticle | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filteredArticles = articles.filter(
    (a) => activeFilter === 'All' || a.status === activeFilter
  );

  const setArticleStatus = (id: string, newStatus: 'Approved' | 'Hidden' | 'Pending') => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setNotice(`Article status updated to '${newStatus}'.`);
    setTimeout(() => setNotice(null), 3000);
  };

  const toggleFeatured = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isFeatured: !a.isFeatured } : a))
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              News & Content Moderation
            </h1>
            <GlowBadge variant="orange" size="sm" pulse>
              CONTENT ADMIN CONTROL
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Review ingested news feeds, moderate unverified claims, edit topic tags, trigger AI summary synthesis, and manage featured platform content.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {(['All', 'Pending', 'Approved', 'Hidden'] as const).map((st) => (
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

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((art) => (
          <GlassCard key={art.id} className="space-y-3 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-orange-400 font-bold">{art.source}</span>
                <span>•</span>
                <span>{art.publishedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <GlowBadge variant={art.status === 'Approved' ? 'green' : art.status === 'Hidden' ? 'red' : 'orange'} size="sm">
                  {art.status}
                </GlowBadge>

                <button
                  onClick={() => toggleFeatured(art.id)}
                  className={`p-1 rounded hover:bg-white/10 ${art.isFeatured ? 'text-amber-400' : 'text-slate-500'}`}
                  title="Toggle Featured Content"
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">{art.title}</h3>

            <p className="text-xs text-slate-300 leading-relaxed">{art.aiSummary}</p>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Topic:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {art.topicTag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setArticleStatus(art.id, 'Approved')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold"
                >
                  Approve
                </button>

                <button
                  onClick={() => setArticleStatus(art.id, 'Hidden')}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-semibold"
                >
                  Hide / Reject
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
};
