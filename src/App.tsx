import React, { useState } from 'react';
import { AuthProvider, useAuth, AdminRole } from './context/AuthContext';
import { AdminSidebar, AdminTab } from './components/navigation/AdminSidebar';
import { AdminNavbar } from './components/navigation/AdminNavbar';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserManagementModule } from './components/modules/UserManagementModule';
import { MarketDataModule } from './components/modules/MarketDataModule';
import { NewsManagementModule } from './components/modules/NewsManagementModule';
import { AIControlCenterModule } from './components/modules/AIControlCenterModule';
import { RAGKnowledgeModule } from './components/modules/RAGKnowledgeModule';
import { AIConversationMonitorModule } from './components/modules/AIConversationMonitorModule';
import { AnomalyAuditModule } from './components/modules/AnomalyAuditModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { AuditLogsModule } from './components/modules/AuditLogsModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { X, ShieldCheck } from 'lucide-react';

const AdminAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { user, login } = useAuth();

  const handleRoleSwitch = (role: AdminRole) => {
    if (user) {
      login(user.email, role);
      setShowRoleModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans flex selection:bg-orange-500/30 selection:text-orange-300">
      
      {/* Sidebar Navigation */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <AdminNavbar
          onRefreshData={() => alert('All connected node pipelines resynced!')}
          onOpenRoleModal={() => setShowRoleModal(true)}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-y-auto pb-12">
          {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} />}
          {activeTab === 'users' && <UserManagementModule />}
          {activeTab === 'market-data' && <MarketDataModule />}
          {activeTab === 'news' && <NewsManagementModule />}
          {activeTab === 'ai-control' && <AIControlCenterModule />}
          {activeTab === 'rag' && <RAGKnowledgeModule />}
          {activeTab === 'ai-conversations' && <AIConversationMonitorModule />}
          {activeTab === 'anomalies' && <AnomalyAuditModule />}
          {activeTab === 'analytics' && <AnalyticsModule />}
          {activeTab === 'audit-logs' && <AuditLogsModule />}
          {activeTab === 'settings' && <SettingsModule />}
        </main>
      </div>

      {/* Role Permission Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span>Test RBAC Role Permission Matrix</span>
              </div>
              <button onClick={() => setShowRoleModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="text-slate-300 font-sans">
                Select an administrative role to test fine-grained RBAC permissions on the sidebar & modules:
              </p>

              {(['Super Admin', 'Content Admin', 'AI Admin', 'Support Admin', 'Analyst'] as AdminRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    user?.role === r
                      ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow-orange'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{r}</span>
                  {user?.role === r && <span className="text-orange-400 font-bold">CURRENT</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminAppContent />
    </AuthProvider>
  );
};

export default App;
