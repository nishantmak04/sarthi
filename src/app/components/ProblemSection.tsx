'use client';
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { FileX, Link2Off, SearchX, AlertTriangle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const problems = [
  {
    id: 'prob-fragmented',
    icon: FileX,
    title: 'Fragmented Records',
    desc: 'Student data is scattered across schools, colleges, training institutes — no unified view exists.',
    color: 'text-danger',
    bg: 'bg-danger-light',
  },
  {
    id: 'prob-unverified',
    icon: Link2Off,
    title: 'Unverified Credentials',
    desc: 'Companies cannot verify certificates or skills without contacting each institute individually.',
    color: 'text-warning',
    bg: 'bg-warning-light',
  },
  {
    id: 'prob-lost',
    icon: SearchX,
    title: 'Lost Journey Data',
    desc: 'A student\'s training history and achievements are lost when moving between organizations.',
    color: 'text-accent',
    bg: 'bg-accent-light',
  },
  {
    id: 'prob-opaque',
    icon: AlertTriangle,
    title: 'Opaque Outcomes',
    desc: 'Government and HQ bodies have no real-time view of placement rates, skill gaps, or training impact.',
    color: 'text-primary',
    bg: 'bg-primary-light',
  },
];

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-muted/40">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="section-label mb-3">The Problem</p>
          <h2 className="text-hero-md text-foreground mb-4">
            Student data is broken and scattered
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every institution stores student information in silos. When a student moves from education to employment, their verified history disappears.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems?.map((problem, i) => {
            const Icon = problem?.icon;
            return (
              <div
                key={problem?.id}
                className="bg-card border border-border rounded-xl p-6 card-hover"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
              >
                <div className={`w-12 h-12 ${problem?.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={22} className={problem?.color} />
                </div>
                <h3 className="text-base font-700 text-foreground mb-2">{problem?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem?.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Visual separator */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <div className="px-6 py-3 bg-card border border-border rounded-full">
            <p className="text-sm font-600 text-muted-foreground">Sarthi solves this</p>
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>
    </section>
  );
}