'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Award, Zap, Briefcase, Building2, BookOpen, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import type { DashboardTab } from './StudentDashboardLayout';
import Icon from '@/components/ui/AppIcon';


// 6 cards → 3×2 grid
const metrics = [
  {
    id: 'metric-certs',
    label: 'Certificates',
    value: 7,
    unit: '',
    sub: '6 verified · 1 pending',
    icon: Award,
    trend: +2,
    trendLabel: 'this month',
    color: 'text-warning',
    bg: 'bg-warning-light',
    tabKey: 'certificates' as DashboardTab,
  },
  {
    id: 'metric-skills',
    label: 'Skills',
    value: 14,
    unit: '',
    sub: '11 verified · 3 self-reported',
    icon: Zap,
    trend: +3,
    trendLabel: 'this month',
    color: 'text-secondary',
    bg: 'bg-secondary-light',
    tabKey: 'skills' as DashboardTab,
  },
  {
    id: 'metric-experience',
    label: 'Experience',
    value: 18,
    unit: 'mo',
    sub: 'Infosys · TCS · Freelance',
    icon: Briefcase,
    trend: +6,
    trendLabel: 'months added',
    color: 'text-accent',
    bg: 'bg-accent-light',
    tabKey: 'journey' as DashboardTab,
  },
  {
    id: 'metric-employment',
    label: 'Employment',
    value: 1,
    unit: '',
    sub: 'TCS — Software Engineer L2',
    icon: Building2,
    trend: 0,
    trendLabel: 'current',
    color: 'text-primary',
    bg: 'bg-primary-light',
    tabKey: 'journey' as DashboardTab,
  },
  {
    id: 'metric-training',
    label: 'Training Completion',
    value: 94,
    unit: '%',
    sub: 'Full Stack Dev · NSDC',
    icon: BookOpen,
    trend: +4,
    trendLabel: 'vs last month',
    color: 'text-secondary',
    bg: 'bg-secondary-light',
    tabKey: 'journey' as DashboardTab,
  },
  {
    id: 'metric-views',
    label: 'Profile Views',
    value: 38,
    unit: '',
    sub: 'Last 30 days',
    icon: Eye,
    trend: -5,
    trendLabel: 'vs last month',
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    tabKey: 'overview' as DashboardTab,
  },
];

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return val;
}

function MetricCard({
  metric,
  active,
  delay,
  onTabChange,
}: {
  metric: typeof metrics[0];
  active: boolean;
  delay: number;
  onTabChange: (tab: DashboardTab) => void;
}) {
  const count = useCounter(metric.value, active);
  const Icon = metric.icon;
  const isPositive = metric.trend > 0;
  const isNegative = metric.trend < 0;

  return (
    <button
      onClick={() => onTabChange(metric.tabKey)}
      className="bg-card border border-border rounded-2xl p-5 card-hover text-left w-full transition-all duration-300"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease ${delay}s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${metric.bg} rounded-xl flex items-center justify-center`}>
          <Icon size={18} className={metric.color} />
        </div>
        {metric.trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-600 ${isPositive ? 'text-secondary' : 'text-danger'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : ''}{metric.trend}
          </div>
        )}
      </div>
      <p className="text-3xl font-800 text-foreground tabular-nums mb-1">
        {count}{metric.unit}
      </p>
      <p className="text-xs font-600 text-muted-foreground mb-1">{metric.label}</p>
      <p className="text-xs text-muted-foreground/70">{metric.sub}</p>
    </button>
  );
}

export default function MetricsBentoGrid({ onTabChange }: { onTabChange: (tab: DashboardTab) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, i) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          active={active}
          delay={i * 0.08}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
}