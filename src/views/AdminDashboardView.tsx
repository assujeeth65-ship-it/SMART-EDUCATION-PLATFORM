import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { HackathonEvent } from '../types';
import {
  Calendar, Clock3, MapPin, Users, Plus, Pencil, Trash2, Eye, EyeOff,
  Megaphone, ShieldCheck, Search, X, Save, Trophy, ExternalLink
} from 'lucide-react';

const emptyEvent = {
  name: '',
  organizer: '',
  companyName: '',
  description: '',
  date: '',
  time: '',
  location: '',
  mode: 'Online' as HackathonEvent['mode'],
  registrationFee: 'Free',
  eligibility: 'Engineering & Technology Students',
  teamSize: '2 - 4 Members',
  deadline: '',
  problemStatement: '',
  rulesText: 'Original work only. Follow the event guidelines.'
};

export const AdminDashboardView: React.FC = () => {
  const { hackathons, addHackathonEvent, updateHackathonEvent, deleteHackathonEvent, toggleEventPublish } = useApp();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEvent);

  const visibleEvents = useMemo(() => hackathons.filter((event) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [event.name, event.organizer, event.companyName, event.mode].some(v => v?.toLowerCase().includes(q));
  }), [hackathons, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyEvent);
    setShowForm(true);
  };

  const openEdit = (event: HackathonEvent) => {
    setEditingId(event.id);
    setForm({
      name: event.name,
      organizer: event.organizer,
      companyName: event.companyName || '',
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      mode: event.mode,
      registrationFee: event.registrationFee,
      eligibility: event.eligibility,
      teamSize: event.teamSize,
      deadline: event.deadline,
      problemStatement: event.problemStatement,
      rulesText: event.rules.join('\n')
    });
    setShowForm(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.organizer.trim() || !form.date.trim() || !form.problemStatement.trim()) return;

    const event: HackathonEvent = {
      id: editingId || `hack-${Date.now()}`,
      type: form.companyName.trim() ? 'company' : 'institution',
      name: form.name.trim(),
      organizer: form.organizer.trim(),
      companyName: form.companyName.trim() || undefined,
      description: form.description.trim(),
      date: form.date.trim(),
      time: form.time.trim() || '09:00 AM IST',
      location: form.location.trim() || 'To be announced',
      mode: form.mode,
      registrationFee: form.registrationFee.trim() || 'Free',
      eligibility: form.eligibility.trim() || 'Engineering & Technology Students',
      teamSize: form.teamSize.trim() || '2 - 4 Members',
      roundsCount: 1,
      rounds: [{ roundNumber: 1, title: 'Hackathon', detail: 'Follow the published event schedule and instructions.' }],
      deadline: form.deadline.trim() || 'To be announced',
      problemStatement: form.problemStatement.trim(),
      rules: form.rulesText.split('\n').map(x => x.trim()).filter(Boolean),
      verified: true,
      registrationOpen: true
    };

    if (editingId) {
      updateHackathonEvent(event);
    } else {
      addHackathonEvent(event);
    }
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#90caf9] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin-only circulation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0d47a1] mt-3">Hackathon Circulation Center</h1>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">Create, verify, publish and monitor hackathon announcements that appear in the student Hackathons & Events section.</p>
          </div>
          <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0d47a1] text-white text-sm font-black hover:bg-[#083477]">
            <Plus className="w-4 h-4" /> Publish Hackathon
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <Stat icon={<Trophy />} label="Total Events" value={hackathons.length} />
          <Stat icon={<Megaphone />} label="Published" value={hackathons.filter(e => e.registrationOpen).length} />
          <Stat icon={<ShieldCheck />} label="Verified" value={hackathons.filter(e => e.verified).length} />
          <Stat icon={<Users />} label="Student Channel" value="LIVE" />
        </div>
      </section>

      <section className="rounded-3xl border border-[#90caf9] bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5">
          <div>
            <h2 className="text-lg font-black text-[#0d47a1]">Circulation Queue</h2>
            <p className="text-xs text-gray-500 mt-1">Only hackathon announcements are managed from this admin screen.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search event or organizer" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#90caf9] text-sm outline-none focus:ring-2 focus:ring-[#90caf9]" />
          </div>
        </div>

        <div className="space-y-3">
          {visibleEvents.map(event => (
            <article key={event.id} className="rounded-2xl border border-[#90caf9]/70 p-4 hover:border-[#2196f3] transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-1 rounded-lg bg-[#e3f2fd] text-[#0d47a1] text-[10px] font-black uppercase">{event.type === 'company' ? 'Company' : 'Institution'}</span>
                    {event.verified && <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black inline-flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>}
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${event.registrationOpen ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{event.registrationOpen ? 'Circulating' : 'Hidden'}</span>
                  </div>
                  <h3 className="text-base font-black text-[#0d47a1] mt-2 truncate">{event.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{event.organizer}{event.companyName ? ` • ${event.companyName}` : ''}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-600 mt-3">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#2196f3]" />{event.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock3 className="w-3.5 h-3.5 text-[#2196f3]" />{event.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2196f3]" />{event.mode}</span>
                    <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#2196f3]" />{event.teamSize}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <button onClick={() => toggleEventPublish(event.id)} className="px-3 py-2 rounded-xl border border-[#90caf9] text-xs font-bold text-[#0d47a1] inline-flex items-center gap-1.5">
                    {event.registrationOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {event.registrationOpen ? 'Stop circulation' : 'Publish'}
                  </button>
                  <button onClick={() => openEdit(event)} className="px-3 py-2 rounded-xl bg-[#e3f2fd] text-xs font-bold text-[#0d47a1] inline-flex items-center gap-1.5"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => { if (window.confirm(`Remove ${event.name} from circulation?`)) deleteHackathonEvent(event.id); }} className="px-3 py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-600 inline-flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            </article>
          ))}
          {!visibleEvents.length && <div className="text-center py-12 text-sm text-gray-500">No hackathons match your search.</div>}
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <form onSubmit={submit} className="max-w-3xl mx-auto mt-6 rounded-3xl bg-white border border-[#90caf9] shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div><h2 className="text-xl font-black text-[#0d47a1]">{editingId ? 'Update hackathon' : 'Publish hackathon'}</h2><p className="text-xs text-gray-500 mt-1">This information is what students receive in the circulation feed.</p></div>
              <button type="button" onClick={() => setShowForm(false)} className="p-2 rounded-xl bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Hackathon name" value={form.name} onChange={v => setForm({...form,name:v})} required />
              <Field label="Organizer" value={form.organizer} onChange={v => setForm({...form,organizer:v})} required />
              <Field label="Company / sponsor (optional)" value={form.companyName} onChange={v => setForm({...form,companyName:v})} />
              <Field label="Date" value={form.date} onChange={v => setForm({...form,date:v})} required />
              <Field label="Time" value={form.time} onChange={v => setForm({...form,time:v})} />
              <Field label="Location" value={form.location} onChange={v => setForm({...form,location:v})} />
              <Field label="Registration fee" value={form.registrationFee} onChange={v => setForm({...form,registrationFee:v})} />
              <Field label="Team size" value={form.teamSize} onChange={v => setForm({...form,teamSize:v})} />
              <Field label="Registration deadline" value={form.deadline} onChange={v => setForm({...form,deadline:v})} />
              <Field label="Eligibility" value={form.eligibility} onChange={v => setForm({...form,eligibility:v})} />
              <label className="text-xs font-bold text-[#0d47a1]">Mode<select value={form.mode} onChange={e => setForm({...form,mode:e.target.value as HackathonEvent['mode']})} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#90caf9] text-sm"><option>Online</option><option>Offline</option><option>Hybrid</option></select></label>
              <Field label="Problem statement" value={form.problemStatement} onChange={v => setForm({...form,problemStatement:v})} required multiline />
              <Field label="Description" value={form.description} onChange={v => setForm({...form,description:v})} multiline />
              <Field label="Rules (one per line)" value={form.rulesText} onChange={v => setForm({...form,rulesText:v})} multiline />
            </div>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl bg-gray-100 text-sm font-bold">Cancel</button><button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0d47a1] text-white text-sm font-black inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save & circulate</button></div>
          </form>
        </div>
      )}
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => <div className="rounded-2xl bg-[#f7fbff] border border-[#90caf9]/70 p-4"><div className="flex items-center gap-2 text-[#2196f3]"><span className="w-4 h-4">{icon}</span><span className="text-[10px] font-black uppercase">{label}</span></div><p className="text-xl font-black text-[#0d47a1] mt-2">{value}</p></div>;

const Field = ({ label, value, onChange, required, multiline }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; multiline?: boolean }) => <label className={`${multiline ? 'sm:col-span-2' : ''} text-xs font-bold text-[#0d47a1]`}>{label}{required && ' *'}{multiline ? <textarea required={required} value={value} onChange={e => onChange(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#90caf9] text-sm font-normal outline-none focus:ring-2 focus:ring-[#90caf9]" /> : <input required={required} value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#90caf9] text-sm font-normal outline-none focus:ring-2 focus:ring-[#90caf9]" />}</label>;
