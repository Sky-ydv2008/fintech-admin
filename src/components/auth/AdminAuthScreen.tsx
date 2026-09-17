import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Key, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle, 
  Zap,
  Eye,
  EyeOff,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { useAuth, AdminRole, AdminUser } from '../../context/AuthContext';
import { AdminOrb } from '../hero/AdminOrb';

export const AdminAuthScreen: React.FC = () => {
  const { login, register, verifyMfa, isMfaPending } = useAuth();

  const [activeMode, setActiveMode] = useState<'login' | 'register' | 'mfa'>(
    isMfaPending ? 'mfa' : 'login'
  );

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@trinode.ai');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<AdminRole>('AI Admin');
  const [regSecretKey, setRegSecretKey] = useState('');

  // MFA Form State
  const [mfaCode, setMfaCode] = useState('');

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      // Create admin session & require MFA step
      const mockAdminUser: AdminUser = {
        id: `admin_${Date.now()}`,
        name: loginEmail.split('@')[0].toUpperCase(),
        email: loginEmail,
        role: loginEmail.includes('ai') ? 'AI Admin' : loginEmail.includes('content') ? 'Content Admin' : 'Super Admin',
        mfaEnabled: true,
        mfaVerified: false,
        lastLogin: new Date().toISOString(),
      };

      login(mockAdminUser, `jwt_token_${Date.now()}`, true);
      setLoading(false);
      setActiveMode('mfa');
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;

    // Validate security key
    if (regSecretKey.trim().toUpperCase() !== 'TRINODE-ADMIN-2026' && regSecretKey.trim() !== '2026') {
      setError('Invalid Admin Registration Security Key! Use "TRINODE-ADMIN-2026" or "2026".');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const newAdminUser: AdminUser = {
        id: `admin_${Date.now()}`,
        name: regName,
        email: regEmail,
        role: regRole,
        mfaEnabled: true,
        mfaVerified: true,
        lastLogin: new Date().toISOString(),
      };

      register(newAdminUser, `jwt_token_reg_${Date.now()}`);
      setLoading(false);
    }, 1000);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode) return;

    const success = verifyMfa(mfaCode);
    if (!success) {
      setError('Invalid 2FA Authenticator Code! Enter any 6-digit code or "123456".');
    }
  };

  const handleQuickDemoLogin = (role: AdminRole, email: string) => {
    setLoading(true);
    setTimeout(() => {
      const demoUser: AdminUser = {
        id: `admin_${Date.now()}`,
        name: `${role} Session`,
        email,
        role,
        mfaEnabled: true,
        mfaVerified: true,
        lastLogin: new Date().toISOString(),
      };
      login(demoUser, `jwt_demo_${Date.now()}`, false);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-orange-500/30 selection:text-orange-300">
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_30px_rgba(255,94,0,0.5)] mb-2">
            <span className="text-white font-mono font-extrabold text-2xl">3N</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
            Tri-Node Admin Access
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            AI × FinTech Platform Management System & Control Center
          </p>

          <div className="flex justify-center pt-1">
            <GlowBadge variant="orange" size="sm" pulse icon={<ShieldCheck className="w-3.5 h-3.5 text-orange-400" />}>
              SECURE RBAC JWT AUTHENTICATION
            </GlowBadge>
          </div>
        </div>

        {/* Main Glass Authentication Card */}
        <GlassCard glow="orange" className="p-8 space-y-6 border-orange-500/30 shadow-2xl relative">
          
          {/* Mode Tabs (Login vs Register) */}
          {activeMode !== 'mfa' && (
            <div className="flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => { setActiveMode('login'); setError(null); }}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  activeMode === 'login'
                    ? 'bg-orange-500 text-white shadow-glow-orange'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin Sign In
              </button>
              <button
                onClick={() => { setActiveMode('register'); setError(null); }}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  activeMode === 'register'
                    ? 'bg-orange-500 text-white shadow-glow-orange'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register Admin Account
              </button>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* MODE 1: ADMIN LOGIN FORM */}
          {activeMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Admin Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@trinode.ai"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-orange disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Authenticating Admin...' : 'Sign In To Control Center'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* MODE 2: ADMIN REGISTRATION FORM */}
          {activeMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Admin Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. David Vance"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Admin Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="david.vance@trinode.ai"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Requested Admin Role Permission</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as AdminRole)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C12] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Super Admin">Super Admin (Unconstrained Access)</option>
                  <option value="Content Admin">Content Admin (News & Moderation)</option>
                  <option value="AI Admin">AI Admin (Prompts & RAG Vectors)</option>
                  <option value="Support Admin">Support Admin (Users & Anomalies)</option>
                  <option value="Analyst">Analyst (Read-Only Metrics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Admin Registration Security Key <span className="text-orange-400">(Use "TRINODE-ADMIN-2026")</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="TRINODE-ADMIN-2026"
                    value={regSecretKey}
                    onChange={(e) => setRegSecretKey(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-orange-500 font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-orange disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Creating Admin Account...' : 'Register Admin Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* MODE 3: 2FA MFA CODE STEP */}
          {activeMode === 'mfa' && (
            <form onSubmit={handleMfaSubmit} className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mx-auto">
                <Key className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-lg font-bold text-white">2FA Authenticator Code Required</h3>
              <p className="text-xs text-slate-400">
                Enter your 6-digit TOTP security code to complete session authentication. <br />
                <span className="text-orange-400 font-mono font-bold">(Use any 6-digit code or "123456")</span>
              </p>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="123456"
                  className="w-48 text-center text-2xl font-mono tracking-widest px-4 py-3 rounded-xl bg-white/5 border border-orange-500/40 text-white focus:outline-none focus:border-orange-500 mx-auto block"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Verify 2FA Code & Launch Admin Panel
              </button>
            </form>
          )}

          {/* Quick Demo Role Logins */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase text-center tracking-wider font-bold">
              Instant Demo Role Shortcuts:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
              <button
                onClick={() => handleQuickDemoLogin('Super Admin', 'super@trinode.ai')}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold transition-all"
              >
                Super Admin
              </button>
              <button
                onClick={() => handleQuickDemoLogin('AI Admin', 'ai@trinode.ai')}
                className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 font-semibold transition-all"
              >
                AI Admin
              </button>
              <button
                onClick={() => handleQuickDemoLogin('Content Admin', 'content@trinode.ai')}
                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold transition-all"
              >
                Content Admin
              </button>
              <button
                onClick={() => handleQuickDemoLogin('Support Admin', 'support@trinode.ai')}
                className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-semibold transition-all"
              >
                Support Admin
              </button>
              <button
                onClick={() => handleQuickDemoLogin('Analyst', 'analyst@trinode.ai')}
                className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold transition-all col-span-2 sm:col-span-1"
              >
                Analyst
              </button>
            </div>
          </div>

        </GlassCard>

      </div>
    </div>
  );
};
