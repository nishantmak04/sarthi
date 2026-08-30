'use client';
import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, BookOpen, Zap, Award, Briefcase, Building2, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const journeyStages = [
  {
    id: 'journey-edu',
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'Foundation',
    desc: 'Academic foundation from schools and colleges. UDISE ID links the student\'s formal education records — board results, attendance, performance.',
    detail: 'Rajiv Gandhi Polytechnic, Pune — B.Tech Computer Science',
    year: '2019 – 2023',
    status: 'Completed',
    color: '#2563EB',
    bg: 'bg-primary-light',
    textColor: 'text-primary',
  },
  {
    id: 'journey-train',
    icon: BookOpen,
    title: 'Training',
    subtitle: 'Skill Building',
    desc: 'Vocational and professional training from NSDC-affiliated institutes. Course completion, attendance, and assessment results are recorded.',
    detail: 'NSDC Certified Training — Full Stack Development',
    year: '2023 – 2024',
    status: 'Completed',
    color: '#7C3AED',
    bg: 'bg-accent-light',
    textColor: 'text-accent',
  },
  {
    id: 'journey-skills',
    icon: Zap,
    title: 'Skills',
    subtitle: 'Competencies',
    desc: 'Verified skills with proficiency levels. Each skill is validated by the institute or employer — no self-reporting without verification.',
    detail: 'Python • React • SQL • Node.js • AWS',
    year: '2023 – Present',
    status: 'Active',
    color: '#10B981',
    bg: 'bg-secondary-light',
    textColor: 'text-secondary',
  },
  {
    id: 'journey-cert',
    icon: Award,
    title: 'Certificates',
    subtitle: 'Credentials',
    desc: 'Digitally verified certificates from issuing organizations. Each certificate includes issuer signature, date, and verification hash.',
    detail: 'AWS Cloud Practitioner • Python Advanced • NASSCOM Digital Skills',
    year: '2023 – 2024',
    status: 'Verified',
    color: '#F59E0B',
    bg: 'bg-warning-light',
    textColor: 'text-warning',
  },
  {
    id: 'journey-exp',
    icon: Briefcase,
    title: 'Experience',
    subtitle: 'Work History',
    desc: 'Internships, projects, and work experience verified by organizations. Duration, role, and performance are recorded permanently.',
    detail: 'Infosys Internship — 6 months • Freelance Projects — 12 months',
    year: '2023 – 2024',
    status: 'Verified',
    color: '#EF4444',
    bg: 'bg-danger-light',
    textColor: 'text-danger',
  },
  {
    id: 'journey-employ',
    icon: Building2,
    title: 'Employment',
    subtitle: 'Current Role',
    desc: 'Current employment confirmed by the company using their Company ID. Salary, role, and joining date are securely recorded.',
    detail: 'TCS — Software Engineer L2 • Joined Aug 2024',
    year: '2024 – Present',
    status: 'Active',
    color: '#2563EB',
    bg: 'bg-primary-light',
    textColor: 'text-primary',
  },
  {
    id: 'journey-growth',
    icon: TrendingUp,
    title: 'Growth',
    subtitle: 'Professional Progress',
    desc: 'Ongoing performance tracking, promotions, new skills, and career milestones. The journey never ends — it only grows.',
    detail: 'Performance Score: 87/100 • 2 Promotions • 8 New Skills',
    year: '2024 – Future',
    status: 'Ongoing',
    color: '#10B981',
    bg: 'bg-secondary-light',
    textColor: 'text-secondary',
  },
];

export default function CareerJourneySection() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const ActiveIcon = journeyStages?.[activeStage]?.icon;

  return (
    <section ref={sectionRef} className="py-24 bg-muted/40">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="section-label mb-3">Career Journey</p>
          <h2 className="text-hero-md text-foreground mb-4">
            Every stage. Verified. Connected.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow a student&apos;s complete professional journey — from first enrollment to career growth. Click any stage to explore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline (left) */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-4 bottom-4 w-0.5 journey-line opacity-30 rounded-full" />

              {journeyStages?.map((stage, i) => {
                const Icon = stage?.icon;
                const isActive = i === activeStage;
                const isComplete = i < activeStage;

                return (
                  <button
                    key={stage?.id}
                    onClick={() => setActiveStage(i)}
                    className="relative flex items-start gap-4 mb-6 w-full text-left group"
                  >
                    {/* Node */}
                    <div
                      className={`absolute -left-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'border-primary bg-primary scale-125'
                          : isComplete
                          ? 'border-secondary bg-secondary' :'border-border bg-card'
                      }`}
                    >
                      {isComplete && (
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                      )}
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'bg-primary-light border-primary/30 shadow-sm'
                          : 'bg-card border-border group-hover:border-primary/30 group-hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon
                            size={16}
                            style={{ color: isActive || isComplete ? stage?.color : 'var(--muted-foreground)' }}
                          />
                          <span className={`text-sm font-700 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {stage?.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{stage?.year}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{stage?.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel (right) */}
          <div
            className="lg:sticky lg:top-24"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s ease 0.3s',
            }}
          >
            <div
              className="bg-card border border-border rounded-2xl p-8 shadow-md transition-all duration-400"
              key={`detail-${activeStage}`}
              style={{ animation: 'scale-in 0.3s ease-out forwards' }}
            >
              {/* Stage header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 ${journeyStages?.[activeStage]?.bg} rounded-2xl flex items-center justify-center`}
                  >
                    <ActiveIcon size={28} style={{ color: journeyStages?.[activeStage]?.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-700 text-foreground">{journeyStages?.[activeStage]?.title}</h3>
                    <p className={`text-sm font-600 ${journeyStages?.[activeStage]?.textColor}`}>
                      {journeyStages?.[activeStage]?.subtitle}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-600 ${
                    journeyStages?.[activeStage]?.status === 'Active' || journeyStages?.[activeStage]?.status === 'Ongoing'
                      ? 'bg-secondary-light text-secondary'
                      : journeyStages?.[activeStage]?.status === 'Verified' ?'bg-primary-light text-primary' :'bg-muted text-muted-foreground'
                  }`}
                >
                  {journeyStages?.[activeStage]?.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {journeyStages?.[activeStage]?.desc}
              </p>

              <div className="bg-muted rounded-xl p-4 border border-border">
                <p className="text-xs font-600 text-muted-foreground mb-2">Current Record</p>
                <p className="text-sm font-600 text-foreground">{journeyStages?.[activeStage]?.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{journeyStages?.[activeStage]?.year}</p>
              </div>

              {/* Progress indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Journey Progress</span>
                  <span>{Math.round(((activeStage + 1) / journeyStages?.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-700"
                    style={{ width: `${((activeStage + 1) / journeyStages?.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  {journeyStages?.map((s, i) => (
                    <button
                      key={`dot-${s?.id}`}
                      onClick={() => setActiveStage(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i <= activeStage ? 'bg-primary' : 'bg-border'
                      } ${i === activeStage ? 'scale-150' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}