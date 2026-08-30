'use client';
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Building2, Briefcase, BarChart3, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const roles = [
  {
    id: 'role-student',
    anchor: 'for-students',
    icon: GraduationCap,
    title: 'For Students',
    desc: 'Own your complete professional identity. Never lose your verified certificates, skills, or employment history again.',
    features: [
      'Unified Student ID + UDISE ID',
      'Verified certificate gallery',
      'Skill endorsements from institutes',
      'Career journey timeline',
      'Monthly verification reminders',
      'Employment history record',
    ],
    color: 'text-primary',
    bg: 'bg-primary-light',
    border: 'border-primary/20',
    cta: 'Join as Student',
  },
  {
    id: 'role-institute',
    anchor: 'for-institutes',
    icon: Building2,
    title: 'For Institutes',
    desc: 'Register students, issue verified certificates, and track placement outcomes — all from one dashboard.',
    features: [
      'Unique Institute ID issuance',
      'Bulk student registration',
      'Digital certificate issuance',
      'Placement tracking dashboard',
      'Course completion analytics',
      'Skill distribution reports',
    ],
    color: 'text-accent',
    bg: 'bg-accent-light',
    border: 'border-accent/20',
    cta: 'Register Institute',
  },
  {
    id: 'role-company',
    anchor: 'for-companies',
    icon: Briefcase,
    title: 'For Companies',
    desc: 'Verify candidate identity in seconds. Search by Student ID, skill, or course — hire with confidence.',
    features: [
      'Unique Company ID',
      'Instant identity verification',
      'Search by skill or Student ID',
      'Employment record submission',
      'Verified certificate access',
      'Candidate background check',
    ],
    color: 'text-secondary',
    bg: 'bg-secondary-light',
    border: 'border-secondary/20',
    cta: 'Join as Company',
  },
  {
    id: 'role-hq',
    anchor: 'for-hq',
    icon: BarChart3,
    title: 'For Headquarters',
    desc: 'Real-time command center. Monitor placement rates, skill gaps, and training outcomes across all states.',
    features: [
      'National analytics dashboard',
      'State-wise distribution maps',
      'Employment trend charts',
      'Skill gap identification',
      'Institute performance metrics',
      'Policy impact measurement',
    ],
    color: 'text-warning',
    bg: 'bg-warning-light',
    border: 'border-warning/20',
    cta: 'HQ Access',
  },
];

export default function RoleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.05 });

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
          <p className="section-label mb-3">Built for Everyone</p>
          <h2 className="text-hero-md text-foreground mb-4">
            One platform. Four powerful roles.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {roles?.map((role, i) => {
            const Icon = role?.icon;
            return (
              <div
                key={role?.id}
                id={role?.anchor}
                className={`bg-card border ${role?.border} rounded-2xl p-7 card-hover flex flex-col`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
              >
                <div className={`w-14 h-14 ${role?.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon size={26} className={role?.color} />
                </div>
                <h3 className="text-lg font-700 text-foreground mb-2">{role?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{role?.desc}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {role?.features?.map((feature) => (
                    <li key={`feat-${role?.id}-${feature?.slice(0, 10)}`} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className={`${role?.color} mt-0.5 shrink-0`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-2.5 rounded-xl text-sm font-600 border transition-all duration-200 ${role?.bg} ${role?.color} ${role?.border} hover:shadow-sm`}>
                  {role?.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}