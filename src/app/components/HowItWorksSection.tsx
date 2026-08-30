'use client';
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Building2, UserCheck, Briefcase, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
  {
    id: 'step-institute',
    step: '01',
    icon: Building2,
    title: 'Institute Registers Student',
    desc: 'Training institutes and colleges register students on Sarthi, creating a verified Student ID linked to their UDISE ID.',
    color: 'text-primary',
    bg: 'bg-primary-light',
    border: 'border-primary/20',
  },
  {
    id: 'step-student',
    step: '02',
    icon: UserCheck,
    title: 'Student Builds Identity',
    desc: 'Students add skills, upload certificates, record achievements, and maintain their verified professional profile.',
    color: 'text-accent',
    bg: 'bg-accent-light',
    border: 'border-accent/20',
  },
  {
    id: 'step-company',
    step: '03',
    icon: Briefcase,
    title: 'Company Verifies & Hires',
    desc: 'Companies search by Student ID, verify identity, confirm employment, and contribute to the student\'s professional record.',
    color: 'text-secondary',
    bg: 'bg-secondary-light',
    border: 'border-secondary/20',
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section id="how-it-works" ref={ref} className="py-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="section-label mb-3">How It Works</p>
          <h2 className="text-hero-md text-foreground mb-4">
            Three Factors. One connected identity.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sarthi connects institutes, students, and companies into a single verified identity network — making every credential trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connecting lines (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

          {steps?.map((step, i) => {
            const Icon = step?.icon;
            return (
              <div
                key={step?.id}
                className="relative"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div className={`bg-card border ${step?.border} rounded-2xl p-8 card-hover h-full`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 ${step?.bg} rounded-xl flex items-center justify-center`}>
                      <Icon size={26} className={step?.color} />
                    </div>
                    <span className="text-4xl font-800 text-border">{step?.step}</span>
                  </div>
                  <h3 className="text-lg font-700 text-foreground mb-3">{step?.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step?.desc}</p>

                  {i < steps?.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <ArrowRight size={20} className="text-muted-foreground" style={{ transform: 'rotate(90deg)' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
