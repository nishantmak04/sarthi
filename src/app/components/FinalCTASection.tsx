'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '../hooks/useInView';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-muted/40">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="relative bg-navy rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-600 mb-8">
              <Sparkles size={14} />
              Start your journey today
            </div>

            <h2 className="text-4xl md:text-5xl font-800 text-white mb-6 leading-tight">
              Build your verified identity.
              <br />
              <span className="text-gradient-green">Own your journey.</span>
            </h2>

            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Join 1.2 million students, 1,247 institutes, and 842 companies already on Sarthi — India&apos;s most trusted student identity platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/sign-up-login-screen"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-700 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-blue group text-base"
              >
                Get Started Free
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sign-up-login-screen"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-600 rounded-xl border border-white/20 transition-all duration-200 text-base"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}