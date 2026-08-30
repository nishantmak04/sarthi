'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, GraduationCap, Building2, Briefcase, Award, BookOpen, ArrowRight, Command } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SearchResult {
  id: string;
  type: 'student' | 'institute' | 'company' | 'skill' | 'certificate';
  title: string;
  subtitle: string;
  meta?: string;
}

const ALL_RESULTS: SearchResult[] = [
  // Students
  { id: 's1', type: 'student', title: 'Arjun Mehta', subtitle: 'B.Tech Computer Science · Rajiv Gandhi Polytechnic', meta: 'ID: STU-2024-0042' },
  { id: 's2', type: 'student', title: 'Priya Sharma', subtitle: 'Diploma in Electronics · NSDC Training Center', meta: 'ID: STU-2024-0087' },
  { id: 's3', type: 'student', title: 'Rahul Verma', subtitle: 'B.Sc Data Science · Delhi Technical Institute', meta: 'ID: STU-2024-0113' },
  { id: 's4', type: 'student', title: 'Anjali Singh', subtitle: 'MBA · Indian Institute of Management', meta: 'ID: STU-2024-0156' },
  { id: 's5', type: 'student', title: 'Vikram Patel', subtitle: 'B.E. Mechanical · Gujarat Polytechnic', meta: 'ID: STU-2024-0201' },
  // Institutes
  { id: 'i1', type: 'institute', title: 'Rajiv Gandhi Polytechnic', subtitle: 'Government Institute · Mumbai, Maharashtra', meta: 'INST-MH-0012' },
  { id: 'i2', type: 'institute', title: 'NSDC Training Center', subtitle: 'Skill Development · New Delhi', meta: 'INST-DL-0034' },
  { id: 'i3', type: 'institute', title: 'Delhi Technical Institute', subtitle: 'Technical Education · Delhi', meta: 'INST-DL-0056' },
  { id: 'i4', type: 'institute', title: 'Gujarat Polytechnic', subtitle: 'Government Institute · Ahmedabad, Gujarat', meta: 'INST-GJ-0078' },
  // Companies
  { id: 'c1', type: 'company', title: 'Tata Consultancy Services', subtitle: 'IT Services & Consulting · Mumbai', meta: 'COMP-MH-0001' },
  { id: 'c2', type: 'company', title: 'Infosys Limited', subtitle: 'IT Services · Bengaluru, Karnataka', meta: 'COMP-KA-0002' },
  { id: 'c3', type: 'company', title: 'Wipro Technologies', subtitle: 'IT Services · Bengaluru, Karnataka', meta: 'COMP-KA-0003' },
  { id: 'c4', type: 'company', title: 'HCL Technologies', subtitle: 'IT Services · Noida, Uttar Pradesh', meta: 'COMP-UP-0004' },
  // Skills
  { id: 'sk1', type: 'skill', title: 'Python Programming', subtitle: '1,240 verified students', meta: 'Technical Skill' },
  { id: 'sk2', type: 'skill', title: 'Data Analysis', subtitle: '890 verified students', meta: 'Technical Skill' },
  { id: 'sk3', type: 'skill', title: 'Web Development', subtitle: '1,560 verified students', meta: 'Technical Skill' },
  { id: 'sk4', type: 'skill', title: 'Machine Learning', subtitle: '430 verified students', meta: 'Technical Skill' },
  { id: 'sk5', type: 'skill', title: 'Communication Skills', subtitle: '2,100 verified students', meta: 'Soft Skill' },
  // Certificates
  { id: 'cert1', type: 'certificate', title: 'AWS Cloud Practitioner', subtitle: 'Amazon Web Services · Cloud Computing', meta: 'Industry Certification' },
  { id: 'cert2', type: 'certificate', title: 'Google Data Analytics', subtitle: 'Google · Data Science', meta: 'Professional Certificate' },
  { id: 'cert3', type: 'certificate', title: 'NSDC Skill Certificate', subtitle: 'National Skill Development Corporation', meta: 'Government Certificate' },
  { id: 'cert4', type: 'certificate', title: 'Microsoft Azure Fundamentals', subtitle: 'Microsoft · Cloud Computing', meta: 'Industry Certification' },
];

const TYPE_CONFIG = {
  student: { icon: GraduationCap, label: 'Student', color: 'text-primary', bg: 'bg-primary-light' },
  institute: { icon: Building2, label: 'Institute', color: 'text-secondary', bg: 'bg-secondary-light' },
  company: { icon: Briefcase, label: 'Company', color: 'text-accent', bg: 'bg-accent-light' },
  skill: { icon: BookOpen, label: 'Skill', color: 'text-warning', bg: 'bg-warning-light' },
  certificate: { icon: Award, label: 'Certificate', color: 'text-secondary', bg: 'bg-secondary-light' },
};

const RECENT_KEY = 'sarthi-recent-searches';

function getRecent(): SearchResult[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecent(item: SearchResult) {
  if (typeof window === 'undefined') return;
  const prev = getRecent().filter((r) => r.id !== item.id);
  const next = [item, ...prev].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(-1);
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }
    const q = query.toLowerCase();
    const filtered = ALL_RESULTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.meta?.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(filtered);
    setActiveIndex(-1);
  }, [query]);

  const displayItems = query.trim() ? results : recent;
  const showRecent = !query.trim() && recent.length > 0;
  const showEmpty = query.trim() && results.length === 0;

  const handleSelect = useCallback((item: SearchResult) => {
    saveRecent(item);
    setRecent(getRecent());
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, displayItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && displayItems[activeIndex]) {
      e.preventDefault();
      handleSelect(displayItems[activeIndex]);
    }
  }, [displayItems, activeIndex, handleSelect, onClose]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10, 15, 30, 0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed left-1/2 z-[9999] w-full max-w-2xl px-4 transition-all duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto' :'opacity-0 pointer-events-none'
        }`}
        style={{
          top: '10vh',
          transform: open ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.95)',
        }}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search students, institutes, companies, skills, certificates..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              >
                <X size={14} />
              </button>
            )}
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-muted border border-border rounded-lg text-xs text-muted-foreground font-500">
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Section header */}
            {(showRecent || displayItems.length > 0) && (
              <div className="px-4 pt-3 pb-1.5">
                <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider">
                  {showRecent ? 'Recent Searches' : 'Results'}
                </p>
              </div>
            )}

            {/* Items */}
            <div ref={listRef}>
              {displayItems.map((item, idx) => {
                const cfg = TYPE_CONFIG[item.type];
                const Icon = cfg.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-100 group ${
                      isActive ? 'bg-muted' : 'hover:bg-muted/60'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      {showRecent ? (
                        <Clock size={15} className="text-muted-foreground" />
                      ) : (
                        <Icon size={15} className={cfg.color} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-600 text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.meta && (
                        <span className={`text-xs font-500 px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                          {item.meta}
                        </span>
                      )}
                      <ArrowRight
                        size={14}
                        className={`text-muted-foreground transition-transform duration-150 ${
                          isActive ? 'translate-x-0.5 text-primary' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Empty state */}
            {showEmpty && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <Search size={20} className="text-muted-foreground" />
                </div>
                <p className="text-sm font-600 text-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for a student name, institute, company, skill, or certificate.
                </p>
              </div>
            )}

            {/* Default empty (no query, no recent) */}
            {!query.trim() && recent.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Start typing to search across students, institutes, companies, skills, and certificates.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {(['student', 'institute', 'company', 'skill', 'certificate'] as const).map((type) => {
                    const cfg = TYPE_CONFIG[type];
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={type}
                        onClick={() => setQuery(cfg.label)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-500 ${cfg.bg} ${cfg.color} hover:opacity-80 transition-opacity`}
                      >
                        <Icon size={12} />
                        {cfg.label}s
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">Esc</kbd>
                Close
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Command size={11} />
              <span>K to open</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
