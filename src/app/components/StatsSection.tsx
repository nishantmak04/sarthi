'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

const stats = [
  { id: 'stat-s', value: 1247832, label: 'Students Registered', suffix: '+', color: 'text-primary' },
  { id: 'stat-i', value: 1247, label: 'Partner Institutes', suffix: '', color: 'text-accent' },
  { id: 'stat-c', value: 842, label: 'Hiring Companies', suffix: '', color: 'text-secondary' },
  { id: 'stat-p', value: 84, label: 'Placement Rate', suffix: '%', color: 'text-warning' },
  { id: 'stat-v', value: 3800000, label: 'Certificates Verified', suffix: '+', color: 'text-danger' },
  { id: 'stat-sk', value: 96, label: 'Verification Accuracy', suffix: '%', color: 'text-primary' },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCounter(stat.value, active);
  const display = count >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : count.toString();

  return (
    <div className="text-center p-8">
      <p className={`text-4xl font-800 ${stat.color} tabular-nums mb-2`}>
        {display}{stat.suffix}
      </p>
      <p className="text-sm font-500 text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-navy dark:bg-navy-800">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-sm font-600 tracking-widest uppercase text-primary-light/70 mb-3">By the Numbers</p>
          <h2 className="text-3xl font-800 text-white">Sarthi by the numbers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}