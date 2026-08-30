'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Building2, User, Briefcase, Shield, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const networkNodes = [
  {
    id: 'node-institute',
    label: 'Training Institute',
    sublabel: 'NSDC Partner • ID: INS-0234',
    icon: Building2,
    color: '#7C3AED',
    bg: 'bg-accent-light',
    step: 0,
  },
  {
    id: 'node-institute-id',
    label: 'Institute ID',
    sublabel: 'INS-2024-0234-MH',
    icon: Shield,
    color: '#2563EB',
    bg: 'bg-primary-light',
    step: 1,
  },
  {
    id: 'node-student',
    label: 'Student Profile',
    sublabel: 'Arjun Mehta • STU-2024-0847',
    icon: User,
    color: '#10B981',
    bg: 'bg-secondary-light',
    step: 2,
  },
  {
    id: 'node-company-id',
    label: 'Company ID',
    sublabel: 'TCS-EMP-0847-MH',
    icon: Shield,
    color: '#F59E0B',
    bg: 'bg-warning-light',
    step: 3,
  },
  {
    id: 'node-company',
    label: 'Employment Record',
    sublabel: 'TCS • Software Engineer L2',
    icon: Briefcase,
    color: '#2563EB',
    bg: 'bg-primary-light',
    step: 4,
  },
];

export default function IdentityNetworkSection() {
  const [activeStep, setActiveStep] = useState(-1);
  const [verified, setVerified] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let step = 0;
    const interval = setInterval(() => {
      if (step < networkNodes?.length) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => setVerified(true), 400);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [inView]);

  const replay = () => {
    setActiveStep(-1);
    setVerified(false);
    setTimeout(() => {
      let step = 0;
      const interval = setInterval(() => {
        if (step < networkNodes?.length) {
          setActiveStep(step);
          step++;
        } else {
          clearInterval(interval);
          setTimeout(() => setVerified(true), 400);
        }
      }, 700);
    }, 300);
  };

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="section-label mb-3">Identity Network</p>
          <h2 className="text-hero-md text-foreground mb-4">
            One verified chain of trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sarthi links institute, student, and company records into a single cryptographically verifiable chain — eliminating fake credentials forever.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className="bg-card border border-border rounded-2xl p-8 shadow-lg"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            {/* Network nodes */}
            <div className="space-y-2">
              {networkNodes?.map((node, i) => {
                const Icon = node?.icon;
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;

                return (
                  <div key={node?.id}>
                    <div
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                        isActive
                          ? `bg-card border-primary/30 shadow-sm`
                          : 'bg-muted/40 border-border opacity-40'
                      } ${isCurrent ? 'scale-[1.02]' : ''}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive ? node?.bg : 'bg-muted'
                        }`}
                      >
                        <Icon
                          size={22}
                          style={{ color: isActive ? node?.color : 'var(--muted-foreground)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-700 transition-all duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {node?.label}
                        </p>
                        <p className="text-xs text-muted-foreground font-500">{node?.sublabel}</p>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                          isActive
                            ? 'border-secondary bg-secondary' :'border-border bg-transparent'
                        }`}
                      >
                        {isActive && (
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <path
                              d="M2 6l3 3L10 3"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ animation: 'check-draw 0.3s ease-out forwards' }}
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Connection line */}
                    {i < networkNodes?.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div
                          className={`w-0.5 h-5 rounded-full transition-all duration-500 ${
                            i < activeStep ? 'bg-primary opacity-60' : 'bg-border opacity-30'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Verified state */}
            <div
              className={`mt-6 p-5 rounded-xl border transition-all duration-600 ${
                verified
                  ? 'bg-secondary-light border-secondary/30' :'bg-muted border-border opacity-0'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle size={24} className="text-secondary" />
                <div className="text-center">
                  <p className="text-base font-700 text-secondary">Identity Successfully Verified</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    All 5 nodes confirmed • Verification hash: 0xA3F9...B2D1
                  </p>
                </div>
              </div>
            </div>

            {verified && (
              <button
                onClick={replay}
                className="w-full mt-4 py-2.5 text-sm font-600 text-muted-foreground hover:text-primary border border-border hover:border-primary rounded-xl transition-all duration-200"
              >
                ↺ Replay Verification
              </button>
            )}
          </div>
        </div>

        {/* Stats below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { id: 'stat-students', label: 'Students Verified', value: '1.2M+', color: 'text-primary' },
            { id: 'stat-institutes', label: 'Partner Institutes', value: '1,247', color: 'text-accent' },
            { id: 'stat-companies', label: 'Hiring Companies', value: '842', color: 'text-secondary' },
            { id: 'stat-certs', label: 'Certificates Issued', value: '3.8M+', color: 'text-warning' },
          ]?.map((stat) => (
            <div
              key={stat?.id}
              className="text-center p-6 bg-card border border-border rounded-xl card-hover"
              style={{
                opacity: inView ? 1 : 0,
                transition: 'all 0.6s ease 0.4s',
              }}
            >
              <p className={`text-3xl font-800 ${stat?.color} tabular-nums mb-1`}>{stat?.value}</p>
              <p className="text-sm text-muted-foreground font-500">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}