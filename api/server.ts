import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'trinode_admin_secret_key_2026_pro';

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/admin/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    system: 'Tri-Node Admin Panel',
    version: '2.4.0-admin',
    timestamp: new Date().toISOString(),
    nodes: { dataNode: 'ONLINE', aiNode: 'ONLINE', userNode: 'ONLINE' },
  });
});

// Admin Dashboard Summary
app.get('/api/admin/dashboard', (req: Request, res: Response) => {
  res.json({
    totalUsers: 12482,
    activeUsers: 1930,
    aiRequestsToday: 8420,
    aiCostToday: '$42.80',
    trackedAssets: 20,
    newsArticles: 3241,
    openAnomalyAlerts: 17,
    apiHealth: '99.9%',
    dbHealth: 'Healthy (pgvector)',
    errorRate: '0.01%',
    timestamp: new Date().toISOString(),
  });
});

// Admin Users List & RBAC Management
app.get('/api/admin/users', (req: Request, res: Response) => {
  const users = [
    { id: 'usr_89234', name: 'Alex Mercer', email: 'alex.mercer@apex.io', status: 'Active', role: 'Super Admin', portfolioValue: '$142,850.40' },
    { id: 'usr_12049', name: 'Sarah Chen', email: 'sarah.chen@fintech.com', status: 'Active', role: 'User', portfolioValue: '$38,400.00' },
    { id: 'usr_66321', name: 'David Vance', email: 'david.vance@quantum.net', status: 'Active', role: 'AI Admin', portfolioValue: '$94,120.00' },
    { id: 'usr_44012', name: 'Elena Rostova', email: 'elena.r@capital.ch', status: 'Suspended', role: 'User', portfolioValue: '$12,500.00' },
  ];
  res.json({ users, count: users.length });
});

// Market Data Provider Health
app.get('/api/admin/market-data', (req: Request, res: Response) => {
  const providers = [
    { name: 'CoinGecko Pro API', endpoint: 'api.coingecko.com/v3', status: 'Operational', latency: 42, rateLimitUsed: '34%' },
    { name: 'Binance Websocket Feed', endpoint: 'stream.binance.com:9443', status: 'Operational', latency: 14, rateLimitUsed: '12%' },
    { name: 'Polygon.io FinTech Equities', endpoint: 'api.polygon.io/v2', status: 'Operational', latency: 85, rateLimitUsed: '62%' },
  ];
  res.json({ providers, timestamp: new Date().toISOString() });
});

// News Moderation Queue
app.get('/api/admin/news', (req: Request, res: Response) => {
  const articles = [
    { id: 'art-101', title: 'Institutional Spot ETF Net Inflows Exceed $420M', source: 'Bloomberg', status: 'Pending' },
    { id: 'art-102', title: 'Federal Reserve Signals Steady Rate Environment', source: 'Financial Times', status: 'Approved' },
  ];
  res.json({ articles, timestamp: new Date().toISOString() });
});

// AI Control & System Prompt Versioning
app.get('/api/admin/ai', (req: Request, res: Response) => {
  res.json({
    activeModel: 'Google Gemini 2.5 Pro',
    activePromptVersion: 'v2.4',
    dailyTokenUsage: 1420850,
    dailyCost: '$42.80',
    budgetMonthlyLimit: '$500.00',
    latencyAvg: '24ms',
    safetyGuardrails: 'Strict Compliance Active',
  });
});

// RAG Vector Knowledge Base
app.get('/api/admin/rag', (req: Request, res: Response) => {
  const documents = [
    { id: 'doc-1', title: 'Tri-Node Platform Technical Implementation Plan 2026', category: 'Architecture', chunks: 48, status: 'Indexed (pgvector)' },
    { id: 'doc-2', title: 'Cryptocurrency Glossary & Technical Terminology', category: 'Education', chunks: 124, status: 'Indexed (pgvector)' },
  ];
  res.json({ documents, vectorStore: 'PostgreSQL pgvector', indexType: 'HNSW Cosine' });
});

// Anomaly ML Queue
app.get('/api/admin/anomalies', (req: Request, res: Response) => {
  const anomalies = [
    { id: 'al-101', txHash: '0x94f8a...3b21', account: 'usr_89234', isolationScore: 88, ruleScore: 92, status: 'Pending Review' },
    { id: 'al-102', txHash: '0x77c4d...11ef', account: 'usr_66321', isolationScore: 62, ruleScore: 65, status: 'Pending Review' },
  ];
  res.json({ anomalies, model: 'Isolation Forest Algorithm' });
});

// Immutable Audit Logs
app.get('/api/admin/audit-logs', (req: Request, res: Response) => {
  const logs = [
    { id: 'log-1001', adminName: 'Alex Mercer (Super Admin)', action: 'UPDATE_SYSTEM_PROMPT', target: 'Node 2 System Prompt v2.4', timestamp: '2026-03-01 14:20:12 UTC' },
    { id: 'log-1002', adminName: 'David Vance (AI Admin)', action: 'UPLOAD_RAG_DOCUMENT', target: 'Doc: Market Liquidity Rules 2026', timestamp: '2026-03-01 12:45:00 UTC' },
  ];
  res.json({ logs, securityStatus: 'Immutable Log Active' });
});

// System Settings & Feature Flags
app.get('/api/admin/settings', (req: Request, res: Response) => {
  res.json({
    featureFlags: {
      enableRAG: true,
      enableAnomalyML: true,
      enablePublicRegistration: true,
      maintenanceMode: false,
    },
    rateLimiting: '100 requests / min',
    corsOrigins: ['http://localhost:3000', 'https://fintech-apex.vercel.app'],
  });
});

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'production' || require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Tri-Node Admin API] Server running on port ${PORT}`);
  });
}

export default app;
