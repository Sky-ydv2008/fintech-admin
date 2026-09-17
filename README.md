# TRI-NODE • Admin Panel & Control Center

> **Tagline:** *AI × FinTech Platform Management System.*  
> **Repository:** [https://github.com/Sky-ydv2008/fintech-admin](https://github.com/Sky-ydv2008/fintech-admin)  
> **Parent Platform Repo:** [https://github.com/Sky-ydv2008/fintech-apex](https://github.com/Sky-ydv2008/fintech-apex)

---

## 🌟 Overview

The **Tri-Node Admin Panel** provides administrators, AI engineers, content moderators, and support analysts with secure control over the entire Tri-Node financial intelligence ecosystem.

Engineered with the exact same visual design language as `fintech-apex` (dark `#050508` obsidian theme, warm orange-amber glow, glassmorphic UI cards, 3D WebGL Canvas orb, and high-density analytical tables).

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

| Role | Access Level & Permissions |
| :--- | :--- |
| **Super Admin** | Full unconstrained access across all 11 admin modules, RBAC role assignment, system configuration, audit logs |
| **Content Admin** | News moderation approval queue, educational content editing, topic tags, featured article toggles |
| **AI Admin** | AI Control Center, system prompt versioning (v1.0 - v2.4), token cost budgets, RAG knowledge vector uploads |
| **Support Admin** | User lookup & suspension, session resetting, transaction anomaly alert review |
| **Analyst** | Read-only platform analytics, market data stream health, AI conversation monitoring |

---

## 🧩 Admin Management Modules Included

1. **Admin Overview Dashboard (`AdminDashboard.tsx`):** Total Users (12,482), Active Users (1,930), AI Requests Today (8,420), Open Anomaly Alerts (17), API/DB Health (99.9%), 3D WebGL Admin Orb visual, and real-time alert feed.
2. **User & Account Control (`UserManagementModule.tsx`):** Search users by ID/email/name, suspend/unsuspend accounts, assign RBAC roles, inspect user portfolio metadata, zero raw password leakage.
3. **Market Data Sync & Health (`MarketDataModule.tsx`):** CoinGecko, Binance, and Polygon provider health, API latency meters, rate limit utilization bars, refresh interval configuration (10s, 30s, 60s, 5m), force resync triggers.
4. **News & Content Moderation (`NewsManagementModule.tsx`):** News approval queue (Pending, Approved, Hidden), AI summary generator previewer, topic tagging, featured article toggles.
5. **AI Control Center & Prompt Versioning (`AIControlCenterModule.tsx`):** Model selection (Gemini 2.5 Pro, GPT-4o, Local Llama 3), versioned system prompt editor with publish history, token cost budget tracker ($500/mo limit), safety guardrails, prompt evaluation test lab.
6. **RAG Knowledge Base & pgvector (`RAGKnowledgeModule.tsx`):** Document upload workflow, chunking & vector embedding index status, cosine similarity retrieval test tool (enter query -> match pgvector vectors -> display similarity score e.g. 0.94), document archive/restore controls.
7. **AI Conversation & Quality Monitor (`AIConversationMonitorModule.tsx`):** Aggregate AI metrics, user feedback ratio (96.4% helpful), flagged query audit, privacy safeguards (pseudonymized user hashes).
8. **Anomaly & Fraud ML Audit (`AnomalyAuditModule.tsx`):** Anomaly alert queue sorted by Isolation Forest risk score (0-100), feature vector breakdown (geographic velocity, volume deviation, device hash), reviewer note logger, audit decision markers.
9. **Platform Analytics (`AnalyticsModule.tsx`):** DAU / WAU trend charts, 7-day registration growth, feature usage allocation pie chart, inference latency distribution.
10. **Immutable Audit Logs (`AuditLogsModule.tsx`):** Immutable-style activity history log (`adminId`, `action`, `target`, `timestamp`, `metadata`, `ipDevice`), search/filter controls, export logs trigger.
11. **System Settings & Feature Flags (`SettingsModule.tsx`):** Global feature flag toggles (RAG vectoring, Isolation Forest ML, Maintenance Mode, Public Signups), server secrets status representation, rate limit parameters.

---

## 🛠️ Local Setup & Development

```bash
# 1. Clone repository
git clone https://github.com/Sky-ydv2008/fintech-admin.git
cd fintech-admin

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Open http://localhost:3001 in your browser
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel (Recommended)
This repository includes a pre-configured `vercel.json`:
1. Import `Sky-ydv2008/fintech-admin` in Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy!

### Deploy to Render
This repository includes `render.yaml`:
1. Create a Web Service on Render pointing to `Sky-ydv2008/fintech-admin`.
2. Build command: `npm install && npm run build`
3. Start command: `npm run server`

---

*Prepared for Team Tri-Node • 2026*
