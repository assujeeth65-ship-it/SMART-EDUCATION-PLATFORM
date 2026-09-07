import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { X, School, GraduationCap, ShieldCheck, ArrowRight, Sparkles, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { showAuthModal, setShowAuthModal, login, register, setRole, setShowAdminLogin } = useApp();
  const [mode, setMode] = useState<'choose' | 'login' | 'register' | 'success'>('choose');
  const [selectedRole, setSelectedRole] = useState<'school' | 'college'>('school');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [createdUserId, setCreatedUserId] = useState('');
  const [annaColleges, setAnnaColleges] = useState<string[]>([]);
  const [collegeSearch, setCollegeSearch] = useState('');
  const [loadingColleges, setLoadingColleges] = useState(false);

  useEffect(() => {
    if (mode !== 'register' || selectedRole !== 'college' || annaColleges.length) return;
    setLoadingColleges(true);
    fetch('/api/colleges/anna-university')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('College list unavailable')))
      .then(data => setAnnaColleges(Array.isArray(data?.colleges) ? data.colleges : []))
      .catch(() => setAnnaColleges([]))
      .finally(() => setLoadingColleges(false));
  }, [mode, selectedRole, annaColleges.length]);

  const filteredAnnaColleges = useMemo(() => {
    const q = collegeSearch.trim().toLowerCase();
    if (!q) return annaColleges;
    return annaColleges.filter(name => name.toLowerCase().includes(q));
  }, [annaColleges, collegeSearch]);
  const [form, setForm] = useState({
    fullName: '', emailOrMobile: '', password: '', preferredLanguage: 'English',
    schoolName: '', board: 'CBSE', grade: 'Class 10', medium: 'English',
    collegeName: '', university: '', degree: 'B.Tech', department: '', year: '1st Year', semester: 'Semester 1', regulation: 'Regulation 2021'
  });

  useEffect(() => {
    if (showAuthModal) { setMode('choose'); setError(''); setPassword(''); setLoginId(''); }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const close = () => { setShowAuthModal(false); setMode('choose'); setError(''); };
  const chooseRole = (role: 'school' | 'college') => { setSelectedRole(role); setMode('register'); setError(''); };
  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const profile = selectedRole === 'school'
      ? { studentName: form.fullName, schoolName: form.schoolName, board: form.board, grade: form.grade, academicYear: '2026–2027', medium: form.medium, preferredLanguage: form.preferredLanguage }
      : { studentName: form.fullName, collegeName: form.collegeName, university: form.university, degree: form.degree, department: form.department, year: form.year, semester: form.semester, regulation: form.regulation, preferredLanguage: form.preferredLanguage };
    const result = await register({ role: selectedRole, fullName: form.fullName, emailOrMobile: form.emailOrMobile, password: form.password, profile });
    if (!result.ok) { setError(result.error || 'Registration failed.'); return; }
    setCreatedUserId(result.userId || '');
    setMode('success');
  };
  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const result = await login(loginId, password);
    if (!result.ok) { setError(result.error || 'Login failed.'); return; }
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#90caf9] overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#2196f3] to-[#0d47a1] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /><h3 className="font-bold">Smart Education Account</h3></div>
          <button onClick={close} className="p-1 rounded-full hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {mode === 'choose' && <div className="space-y-5">
            <div className="text-center"><span className="text-xs font-bold text-[#2196f3] uppercase tracking-wider">One account • Your progress</span><h2 className="text-2xl font-black text-[#0d47a1] mt-1">Register or Login</h2><p className="text-xs text-gray-500 mt-1">Register once. Your profile, learning progress, quiz results and AI history stay linked to your account.</p></div>
            <div className="grid md:grid-cols-2 gap-4">
              <button onClick={() => chooseRole('school')} className="p-5 rounded-2xl border-2 border-[#90caf9]/60 hover:border-[#2196f3] bg-[#e3f2fd]/40 text-[#0d47a1] text-left"><School className="w-8 h-8 text-[#2196f3] mb-3"/><b>School Student</b><p className="text-xs text-gray-600 mt-1">Register a personal school learning account.</p><span className="text-xs font-bold text-[#2196f3] mt-3 inline-flex items-center gap-1">Create account <ArrowRight className="w-3 h-3"/></span></button>
              <button onClick={() => chooseRole('college')} className="p-5 rounded-2xl border-2 border-[#90caf9]/60 hover:border-[#2196f3] bg-[#e3f2fd]/40 text-[#0d47a1] text-left"><GraduationCap className="w-8 h-8 text-[#0d47a1] mb-3"/><b>College Student</b><p className="text-xs text-gray-600 mt-1">Register a personal college learning account.</p><span className="text-xs font-bold text-[#0d47a1] mt-3 inline-flex items-center gap-1">Create account <ArrowRight className="w-3 h-3"/></span></button>
            </div>
            <button onClick={() => { setMode('login'); setError(''); }} className="w-full py-3 rounded-xl border border-[#90caf9] text-[#0d47a1] font-bold text-sm flex items-center justify-center gap-2"><LogIn className="w-4 h-4"/> I already have an account</button>
            <button onClick={() => { close(); setShowAdminLogin(true); }} className="w-full text-[11px] text-gray-500 hover:text-[#0d47a1] flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3"/> Admin Login</button>
          </div>}

          {mode === 'login' && <form onSubmit={submitLogin} className="space-y-4">
            <div><h2 className="text-xl font-black text-[#0d47a1]">Welcome back</h2><p className="text-xs text-gray-500">Use the same User ID, email/mobile and password you registered with.</p></div>
            <input required value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="User ID / Email / Mobile" className="w-full px-4 py-3 text-sm rounded-xl bg-[#e3f2fd]/50 border border-[#90caf9] outline-none" />
            <div className="relative"><input required type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 pr-11 text-sm rounded-xl bg-[#e3f2fd]/50 border border-[#90caf9] outline-none"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">{showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</button></div>
            {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white font-bold text-sm">Login securely</button>
            <button type="button" onClick={() => setMode('choose')} className="w-full text-xs text-gray-500">← Back</button>
          </form>}

          {mode === 'register' && <form onSubmit={submitRegister} className="space-y-3">
            <div><span className="text-[10px] font-bold text-[#2196f3] uppercase">{selectedRole === 'school' ? 'School' : 'College'} account</span><h2 className="text-xl font-black text-[#0d47a1]">Create your account</h2><p className="text-xs text-gray-500">These details are saved to your account. Do not use someone else's credentials.</p></div>
            <div className="grid md:grid-cols-2 gap-3">
              <input required value={form.fullName} onChange={e => setForm({...form, fullName:e.target.value})} placeholder="Full name" className="input" />
              <input required value={form.emailOrMobile} onChange={e => setForm({...form, emailOrMobile:e.target.value})} placeholder="Email or mobile" className="input" />
              <input required minLength={6} type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="Password (6+ characters)" className="input" />
              <select value={form.preferredLanguage} onChange={e => setForm({...form, preferredLanguage:e.target.value})} className="input"><option>English</option><option>Tamil</option><option>Hindi</option><option>Telugu</option></select>
              {selectedRole === 'school' ? <>
                <input required value={form.schoolName} onChange={e => setForm({...form, schoolName:e.target.value})} placeholder="School name" className="input" />
                <select value={form.board} onChange={e => setForm({...form, board:e.target.value})} className="input"><option>CBSE</option><option>ICSE</option><option>Tamil Nadu State Board</option><option>Other State Board</option></select>
                <select value={form.grade} onChange={e => setForm({...form, grade:e.target.value})} className="input"><option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option></select>
                <input required value={form.medium} onChange={e => setForm({...form, medium:e.target.value})} placeholder="Medium of instruction" className="input" />
              </> : <>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[11px] font-bold text-[#0d47a1]">Anna University College / Institute</label>
                  <input value={collegeSearch} onChange={e => setCollegeSearch(e.target.value)} placeholder="Search college / institute" className="input" />
                  <button
                    type="button"
                    className={`w-full input text-left flex items-center justify-between gap-3 ${form.collegeName ? 'text-[#0d47a1] font-bold bg-[#e3f2fd]' : 'text-gray-500'}`}
                    onClick={() => setCollegeSearch(form.collegeName || collegeSearch)}
                  >
                    <span className="truncate">{form.collegeName || (loadingColleges ? 'Loading Anna University institutions...' : 'Select your college / institute')}</span>
                    <span className="text-[10px] shrink-0">{form.collegeName ? 'Selected' : 'Choose'}</span>
                  </button>
                  <div className="max-h-56 overflow-y-auto rounded-xl border border-[#90caf9] bg-white shadow-sm">
                    {filteredAnnaColleges.length ? filteredAnnaColleges.map(college => (
                      <button
                        type="button"
                        key={college}
                        onClick={() => setForm({...form, collegeName: college, university: 'Anna University'})}
                        className={`w-full px-3 py-2 text-left text-xs border-b last:border-b-0 border-[#e3f2fd] hover:bg-[#e3f2fd] ${form.collegeName === college ? 'bg-[#e3f2fd] text-[#0d47a1] font-bold' : 'text-gray-700'}`}
                      >
                        {form.collegeName === college ? '✓ ' : ''}{college}
                      </button>
                    )) : <p className="p-3 text-xs text-gray-500">{loadingColleges ? 'Loading colleges...' : 'No college matches your search.'}</p>}
                  </div>
                  <p className="text-[10px] text-gray-500">Selected college stays displayed in the button above. Search the list and click a college to select it.</p>
                </div>
                <input type="hidden" value={form.university} readOnly />
                <input required value={form.department} onChange={e => setForm({...form, department:e.target.value})} placeholder="Department" className="input" />
                <input required value={form.semester} onChange={e => setForm({...form, semester:e.target.value})} placeholder="Semester" className="input" />
              </>}
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white font-bold text-sm flex items-center justify-center gap-2"><UserPlus className="w-4 h-4"/> Register account</button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-xs text-[#0d47a1] font-semibold">Already registered? Login</button>
          </form>}

          {mode === 'success' && <div className="text-center py-8 space-y-4"><div className="w-14 h-14 mx-auto rounded-full bg-[#2196f3] text-white flex items-center justify-center"><UserPlus className="w-7 h-7"/></div><h2 className="text-xl font-black text-[#0d47a1]">Registration successful</h2><p className="text-xs text-gray-600">Save this User ID. You can use it every time you log in.</p><div className="p-4 rounded-2xl bg-[#e3f2fd] border border-[#90caf9]"><p className="text-[10px] uppercase font-bold text-gray-500">Your User ID</p><p className="text-2xl font-black tracking-wider text-[#0d47a1]">{createdUserId}</p></div><button onClick={() => { setLoginId(createdUserId); setMode('login'); }} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white font-bold text-sm">Continue to Login</button></div>}
        </div>
      </div>
      <style>{`.input{width:100%;padding:0.75rem 1rem;font-size:.875rem;border-radius:.75rem;background:rgba(227,242,253,.5);border:1px solid #90caf9;outline:none}.input:focus{box-shadow:0 0 0 2px #2196f3}`}</style>
    </div>
  );
};
