'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users } from 'lucide-react';

const journeyStages = [
  { id: 'stage-edu', label: 'Education', color: '#2563EB', x: 50, y: 20 },
  { id: 'stage-train', label: 'Training', color: '#7C3AED', x: 200, y: 80 },
  { id: 'stage-skills', label: 'Skills', color: '#10B981', x: 350, y: 30 },
  { id: 'stage-cert', label: 'Certificates', color: '#F59E0B', x: 500, y: 90 },
  { id: 'stage-exp', label: 'Experience', color: '#EF4444', x: 650, y: 25 },
  { id: 'stage-employ', label: 'Employment', color: '#2563EB', x: 800, y: 80 },
];

const floatingCards = [
  {
    id: 'fc-verified',
    icon: <CheckCircle size={14} className="text-secondary" />,
    text: 'Identity Verified',
    sub: 'Student ID: STU-2024-0847',
    delay: '0s',
    pos: 'top-[15%] right-[8%]',
  },
  {
    id: 'fc-cert',
    icon: <Shield size={14} className="text-primary" />,
    text: 'Certificate Verified',
    sub: 'Python Advanced — NASSCOM',
    delay: '2s',
    pos: 'top-[45%] right-[3%]',
  },
  {
    id: 'fc-employ',
    icon: <TrendingUp size={14} className="text-warning" />,
    text: 'Employment Confirmed',
    sub: 'TCS — Software Engineer',
    delay: '1s',
    pos: 'bottom-[20%] right-[10%]',
  },
  {
    id: 'fc-profile',
    icon: <Users size={14} className="text-accent" />,
    text: '92% Profile Complete',
    sub: 'Last verified: 3 days ago',
    delay: '3s',
    pos: 'top-[30%] left-[2%]',
  },
];

export default function HeroSection() {
  const [activeNode, setActiveNode] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveNode((prev) => {
          const next = (prev + 1) % journeyStages?.length;
          return next;
        });
        setLineProgress((prev) => Math.min(prev + 20, 100));
      }, 800);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (intervalRef?.current) clearInterval(intervalRef?.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-hero bg-grid-pattern">
      {/* Background blobs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary-light text-primary text-xs font-600 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Trusted by 1,200+ Institutes across India
            </div>

            {/* Headline */}
            <h1
              className="text-hero-xl text-gradient-hero mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              One Identity.
              <br />
              One Journey.
              <br />
              Every Opportunity.
            </h1>

            {/* Description */}
            <p
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg animate-fade-in-up"
              style={{ animationDelay: '0.35s', opacity: 0 }}
            >
              Build, verify and track a student&apos;s complete journey from education and training to employment and professional growth — all in one trusted platform.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-4 mb-12 animate-fade-in-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <Link href="/sign-up-login-screen" className="btn-primary text-base py-3 px-7 group">
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#how-it-works"
                className="btn-secondary text-base py-3 px-7"
              >
                Explore Sarthi
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center gap-6 animate-fade-in-up"
              style={{ animationDelay: '0.65s', opacity: 0 }}
            >
              {[
                { label: '1.2M+ Students', color: 'text-primary' },
                { label: '98% Verified', color: 'text-secondary' },
                { label: 'Govt. Recognized', color: 'text-accent' },
              ]?.map((item) => (
                <div key={`trust-${item?.label}`} className="flex items-center gap-2">
                  <CheckCircle size={16} className={item?.color} />
                  <span className="text-sm font-600 text-muted-foreground">{item?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Journey Visualization */}
          <div
            className="relative h-[480px] animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {/* Main visualization card */}
            <div className="relative bg-card border border-border rounded-2xl shadow-lg p-6 h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="section-label">Career Journey</p>
                  <h3 className="text-sm font-600 text-foreground mt-1">Arjun Mehta — STU-2024-0847</h3>
                </div>
                <span className="verified-badge">✓ Verified</span>
              </div>

              {/* SVG Journey Path */}
              <div className="relative w-full h-48 mb-6">
                <svg width="100%" height="100%" viewBox="0 0 860 180" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="journeyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="50%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--secondary)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Connection path */}
                  <path
                    d={`M ${journeyStages?.map((s) => `${s?.x + 20},${s?.y + 20}`)?.join(' L ')}`}
                    fill="none"
                    stroke="url(#journeyGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="1000"
                    strokeDashoffset={`${1000 - lineProgress * 10}`}
                    style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
                  />

                  {/* Nodes */}
                  {journeyStages?.map((stage, i) => (
                    <g key={stage?.id}>
                      <circle
                        cx={stage?.x + 20}
                        cy={stage?.y + 20}
                        r={i <= activeNode ? 14 : 10}
                        fill={i <= activeNode ? stage?.color : 'var(--muted)'}
                        style={{ transition: 'all 0.4s ease', filter: i === activeNode ? 'url(#glow)' : 'none' }}
                        opacity={i <= activeNode ? 1 : 0.4}
                      />
                      {i <= activeNode && (
                        <text
                          x={stage?.x + 20}
                          y={stage?.y + 20}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="white"
                          fontSize="9"
                          fontWeight="700"
                        >
                          ✓
                        </text>
                      )}
                      <text
                        x={stage?.x + 20}
                        y={stage?.y + 44}
                        textAnchor="middle"
                        fill={i <= activeNode ? 'var(--foreground)' : 'var(--muted-foreground)'}
                        fontSize="11"
                        fontWeight={i <= activeNode ? '600' : '400'}
                        style={{ transition: 'all 0.4s ease' }}
                      >
                        {stage?.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Active stage info */}
              <div className="bg-muted rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-500 mb-1">Current Stage</p>
                    <p className="text-base font-700 text-foreground">
                      {journeyStages?.[activeNode]?.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-500 mb-1">Progress</p>
                    <p className="text-base font-700 text-primary tabular-nums">
                      {Math.round(((activeNode + 1) / journeyStages?.length) * 100)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-700"
                    style={{ width: `${((activeNode + 1) / journeyStages?.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards?.map((card) => (
              <div
                key={card?.id}
                className={`absolute ${card?.pos} hidden xl:flex items-center gap-2.5 bg-card border border-border rounded-xl px-3.5 py-2.5 shadow-md`}
                style={{ animationDelay: card?.delay, animation: `float 6s ease-in-out ${card?.delay} infinite` }}
              >
                {card?.icon}
                <div>
                  <p className="text-xs font-700 text-foreground">{card?.text}</p>
                  <p className="text-xs text-muted-foreground">{card?.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground font-500">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-muted-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}