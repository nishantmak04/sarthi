'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Plus } from 'lucide-react';

const skills = [
  { id: 'sk-python', name: 'Python', level: 'Advanced', pct: 85, verified: true, source: 'NSDC Training Center', date: '15 Jan 2024', category: 'Programming' },
  { id: 'sk-react', name: 'React.js', level: 'Advanced', pct: 80, verified: true, source: 'Rajiv Gandhi Polytechnic', date: '10 Mar 2024', category: 'Frontend' },
  { id: 'sk-sql', name: 'SQL', level: 'Intermediate', pct: 70, verified: true, source: 'NSDC Training Center', date: '20 Jan 2024', category: 'Database' },
  { id: 'sk-nodejs', name: 'Node.js', level: 'Intermediate', pct: 65, verified: true, source: 'NSDC Training Center', date: '05 Feb 2024', category: 'Backend' },
  { id: 'sk-aws', name: 'AWS', level: 'Beginner', pct: 50, verified: true, source: 'Amazon Web Services', date: '12 Aug 2024', category: 'Cloud' },
  { id: 'sk-js', name: 'JavaScript', level: 'Advanced', pct: 88, verified: true, source: 'Infosys Internship', date: '01 Aug 2023', category: 'Programming' },
  { id: 'sk-html', name: 'HTML/CSS', level: 'Expert', pct: 95, verified: true, source: 'Rajiv Gandhi Polytechnic', date: '15 Jun 2023', category: 'Frontend' },
  { id: 'sk-git', name: 'Git & GitHub', level: 'Intermediate', pct: 72, verified: true, source: 'Infosys Internship', date: '01 Aug 2023', category: 'DevOps' },
  { id: 'sk-docker', name: 'Docker', level: 'Beginner', pct: 35, verified: false, source: 'Self-reported', date: '—', category: 'DevOps' },
  { id: 'sk-comm', name: 'Communication', level: 'Advanced', pct: 82, verified: true, source: 'TCS', date: '01 Sep 2024', category: 'Soft Skills' },
  { id: 'sk-problem', name: 'Problem Solving', level: 'Advanced', pct: 80, verified: true, source: 'TCS', date: '01 Sep 2024', category: 'Soft Skills' },
  { id: 'sk-ts', name: 'TypeScript', level: 'Intermediate', pct: 60, verified: false, source: 'Self-reported', date: '—', category: 'Programming' },
  { id: 'sk-mongo', name: 'MongoDB', level: 'Beginner', pct: 40, verified: false, source: 'Self-reported', date: '—', category: 'Database' },
  { id: 'sk-next', name: 'Next.js', level: 'Intermediate', pct: 55, verified: false, source: 'Self-reported', date: '—', category: 'Frontend' },
];

const levelColors: Record<string, string> = {
  Expert: 'bg-secondary-light text-secondary',
  Advanced: 'bg-primary-light text-primary',
  Intermediate: 'bg-accent-light text-accent',
  Beginner: 'bg-muted text-muted-foreground',
};

const levelBarColors: Record<string, string> = {
  Expert: 'bg-secondary',
  Advanced: 'bg-primary',
  Intermediate: 'bg-accent',
  Beginner: 'bg-muted-foreground',
};

function SkillBar({ skill, active }: { skill: typeof skills[0]; active: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setWidth(skill.pct), 200);
    return () => clearTimeout(timer);
  }, [active, skill.pct]);

  return (
    <div className="bg-card border border-border rounded-xl p-4 card-hover">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <p className="text-sm font-700 text-foreground truncate">{skill.name}</p>
          {skill.verified ? (
            <CheckCircle size={13} className="text-secondary shrink-0" />
          ) : (
            <Clock size={13} className="text-warning shrink-0" />
          )}
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-600 shrink-0 ${levelColors[skill.level]}`}>
          {skill.level}
        </span>
      </div>

      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${levelBarColors[skill.level]}`}
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground truncate">{skill.source}</p>
        <span className="text-xs font-700 text-foreground tabular-nums">{skill.pct}%</span>
      </div>
    </div>
  );
}

export default function SkillsTab() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = skills.filter((s) => {
    if (filter === 'verified') return s.verified;
    if (filter === 'pending') return !s.verified;
    return true;
  });

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-700 text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {skills.filter((s) => s.verified).length} verified · {skills.filter((s) => !s.verified).length} pending verification
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'verified', 'pending'] as const).map((f) => (
            <button
              key={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-600 transition-all duration-150 capitalize ${
                filter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-light text-primary rounded-lg text-xs font-600 hover:bg-primary hover:text-white transition-all duration-150">
            <Plus size={13} />
            Add Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((skill) => (
          <SkillBar key={skill.id} skill={skill} active={active} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <Zap size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-base font-700 text-foreground mb-1">No {filter} skills</p>
          <p className="text-sm text-muted-foreground">Switch filter or add a new skill to your profile.</p>
        </div>
      )}
    </div>
  );
}

function Zap({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}