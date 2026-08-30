'use client';
import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import ProfileCard from './ProfileCard';
import VerificationBanner from './VerificationBanner';
import MetricsBentoGrid from './MetricsBentoGrid';
import RecentActivity from './RecentActivity';
import type { DashboardTab } from './StudentDashboardLayout';

interface Props {
  onTabChange: (tab: DashboardTab) => void;
}

export default function DashboardOverview({ onTabChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.05 });

  const greeting = () => {
    const hour = 7; // Using fixed hour from timestamp context
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div ref={ref} className="space-y-8">
      {/* Header */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}
      >
        <h2 className="text-2xl font-700 text-foreground">
          {greeting()}, Arjun 👋
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s your professional identity overview for 30 Aug 2026
        </p>
      </div>

      {/* Verification banner */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.1s',
        }}
      >
        <VerificationBanner onVerify={() => onTabChange('verification')} />
      </div>

      {/* Top section: Profile + Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Profile card */}
        <div
          className="xl:col-span-1"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.15s',
          }}
        >
          <ProfileCard />
        </div>

        {/* Metrics bento */}
        <div
          className="xl:col-span-3"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.2s',
          }}
        >
          <MetricsBentoGrid onTabChange={onTabChange} />
        </div>
      </div>

      {/* Bottom section: Activity */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.6s ease 0.3s',
        }}
      >
        <RecentActivity />
      </div>
    </div>
  );
}