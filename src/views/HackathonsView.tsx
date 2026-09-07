import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HackathonEvent } from '../types';
import { 
  Trophy, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const HackathonsView: React.FC = () => {
  const { hackathons, speakText, voiceGender } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'institution' | 'company'>('all');
  const [selectedEvent, setSelectedEvent] = useState<HackathonEvent | null>(hackathons[0]);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredEvents = hackathons.filter((e) => {
    if (activeTab !== 'all' && e.type !== activeTab) return false;
    if (searchFilter && !e.name.toLowerCase().includes(searchFilter.toLowerCase()) && !e.organizer.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleSelectEvent = (event: HackathonEvent) => {
    setSelectedEvent(event);
    speakText(`Selected ${event.name}. Organized by ${event.organizer}. Registration deadline is ${event.deadline}. Team size: ${event.teamSize}.`);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1] mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>SIH26207 Verified Hackathon Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              Hackathons & Technical Events
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "Discover authenticated student hackathons organized by accredited institutions and leading companies."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Admin Verified Listings</span>
            </span>
          </div>
        </div>

        {/* Verification Architecture Callout */}
        <div className="mt-6 p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
          <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider block mb-2">
            Event Trust & Anti-Scam Verification Flow:
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Admin Request</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Organization Verification</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Event Submission</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Jury Review</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">Published Event</span>
          </div>
        </div>

        {/* Tabs & Search Filter */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center p-1 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#0d47a1] text-white shadow-sm' : 'text-[#0d47a1] hover:bg-white/60'
              }`}
            >
              All Events ({hackathons.length})
            </button>
            <button
              onClick={() => setActiveTab('institution')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'institution' ? 'bg-[#0d47a1] text-white shadow-sm' : 'text-[#0d47a1] hover:bg-white/60'
              }`}
            >
              Institution Hackathons
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'company' ? 'bg-[#0d47a1] text-white shadow-sm' : 'text-[#0d47a1] hover:bg-white/60'
              }`}
            >
              Company-Based Hackathons
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter events or organizer..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl bg-white border border-[#90caf9] text-[#0d47a1] focus:outline-none focus:ring-1 focus:ring-[#2196f3]"
            />
          </div>
        </div>

      </div>

      {/* EVENTS BROWSER: LIST & EXPANDED DETAIL VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Event Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredEvents.map((event) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div
                key={event.id}
                onClick={() => handleSelectEvent(event)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 ${
                  isSelected 
                    ? 'bg-white border-2 border-[#2196f3] shadow-lg' 
                    : 'glass-card border-[#90caf9]/70 hover:border-[#2196f3]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9]">
                      {event.type === 'company' ? 'Company Hackathon' : 'Institution Hackathon'}
                    </span>
                    <h4 className="text-sm font-black text-[#0d47a1] mt-1.5">{event.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{event.organizer} {event.companyName ? `• ${event.companyName}` : ''}</p>
                  </div>

                  {event.verified && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1 shrink-0">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2196f3]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2196f3]" />
                    <span>{event.mode}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#2196f3]" />
                    <span>Team: {event.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2196f3]" />
                    <span>Due: {event.deadline}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#2196f3]">
                  <span>Fee: {event.registrationFee}</span>
                  <span className="flex items-center gap-1">View Details ➔</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Event Dossier */}
        <div className="lg:col-span-7">
          {selectedEvent ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3] shadow-xl space-y-6">
              
              {/* Event Header */}
              <div className="pb-4 border-b border-[#e3f2fd] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2196f3] uppercase tracking-wider">
                    {selectedEvent.type === 'company' ? 'Company Sponsored Event' : 'University Hackathon'}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified by Admin</span>
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0d47a1]">{selectedEvent.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Location</span>
                  <p className="font-bold text-[#0d47a1] mt-0.5">{selectedEvent.mode}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Team Size</span>
                  <p className="font-bold text-[#0d47a1] mt-0.5">{selectedEvent.teamSize}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Registration</span>
                  <p className="font-bold text-emerald-700 mt-0.5">{selectedEvent.registrationFee}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Rounds</span>
                  <p className="font-bold text-[#0d47a1] mt-0.5">{selectedEvent.roundsCount} Stages</p>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] space-y-1.5">
                <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                  Official Problem Statement
                </h4>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {selectedEvent.problemStatement}
                </p>
              </div>

              {/* Round Details */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                  Competition Structure & Rounds
                </h4>
                <div className="space-y-2">
                  {selectedEvent.rounds.map((rnd) => (
                    <div key={rnd.roundNumber} className="p-3 rounded-2xl bg-white border border-[#90caf9]/80 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#2196f3] text-white font-black text-xs flex items-center justify-center shrink-0">
                        {rnd.roundNumber}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-[#0d47a1]">{rnd.title}</h5>
                        <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{rnd.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules & Eligibility */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-[#0d47a1] uppercase tracking-wider">Rules & Eligibility</h4>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                    <span>Eligibility: {selectedEvent.eligibility}</span>
                  </li>
                  {selectedEvent.rules.map((r, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action: Register */}
              <div className="pt-4 border-t border-[#e3f2fd] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-gray-500">
                  Deadline: <strong className="text-red-600">{selectedEvent.deadline}</strong>
                </div>

                <button
                  onClick={() => alert(`Redirecting to verified registration portal for: ${selectedEvent.name}`)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Register for Event</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 glass-card rounded-3xl">
              Select an event to view full requirements and rounds.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
