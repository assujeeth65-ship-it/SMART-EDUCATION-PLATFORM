import React, { useState } from 'react';
import { ShieldCheck, LockKeyhole, ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLoginView: React.FC = () => {
  const { adminLogin, setShowAdminLogin, setRole } = useApp();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminLogin(loginId, password);
    setLoading(false);
    if (!result.ok) setError(result.error || 'Admin login failed.');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-[#90caf9] bg-white shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#2196f3] to-[#0d47a1] px-7 py-8 text-white text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-4"><ShieldCheck className="w-9 h-9" /></div>
          <h1 className="text-2xl font-black">Admin Login</h1>
          <p className="text-xs text-blue-100 mt-2">Secure access to Hackathon Circulation</p>
        </div>
        <form onSubmit={submit} className="p-7 space-y-4">
          <label className="block text-xs font-bold text-[#0d47a1]">Admin ID
            <input required value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Enter admin ID" autoComplete="username" className="mt-1 w-full px-4 py-3 rounded-xl border border-[#90caf9] bg-[#f7fbff] outline-none focus:ring-2 focus:ring-[#90caf9]" />
          </label>
          <label className="block text-xs font-bold text-[#0d47a1]">Password
            <div className="relative mt-1"><input required type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" autoComplete="current-password" className="w-full px-4 py-3 pr-11 rounded-xl border border-[#90caf9] bg-[#f7fbff] outline-none focus:ring-2 focus:ring-[#90caf9]" /><button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-3 text-gray-500" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
          </label>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>}
          <button disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white font-black text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"><LogIn className="w-4 h-4" />{loading ? 'Signing in…' : 'Login as Admin'}</button>
          <button type="button" onClick={() => { setShowAdminLogin(false); setRole('landing'); }} className="w-full py-2 text-xs font-bold text-gray-500 inline-flex items-center justify-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to platform</button>
          <p className="text-[10px] text-center text-gray-400 inline-flex items-center justify-center gap-1 w-full"><LockKeyhole className="w-3 h-3" /> Admin credentials are checked by the backend.</p>
        </form>
      </div>
    </div>
  );
};
