'use client';
import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Shield, ExternalLink } from 'lucide-react';

const COMPLETION = 92;
const CIRCUMFERENCE = 2 * Math.PI * 45; // r=45

export default function ProfileCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(COMPLETION), 400);
    return () => clearTimeout(timer);
  }, []);

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center h-full">
      {/* Avatar + Ring */}
      <div className="relative mb-4">
        <svg width="110" height="110" className="completion-ring -rotate-90">
          <circle cx="55" cy="55" r="45" fill="none" stroke="var(--muted)" strokeWidth="6" />
          <circle
            cx="55"
            cy="55"
            r="45"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-800">
            AM
          </div>
        </div>
        {/* Completion % */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-700 px-2.5 py-0.5 rounded-full whitespace-nowrap">
          {progress}%
        </div>
      </div>

      <div className="mt-3 mb-1">
        <h3 className="text-base font-700 text-foreground">Arjun Mehta</h3>
        <span className="verified-badge mt-1 inline-block">✓ Verified</span>
      </div>

      <p className="text-xs text-muted-foreground mb-4">Software Engineer L2 at TCS</p>

      {/* IDs */}
      <div className="w-full space-y-2 mb-5">
        <div className="flex items-center justify-between px-3 py-2 bg-muted rounded-lg">
          <span className="text-xs text-muted-foreground">Student ID</span>
          <span className="text-xs font-700 text-foreground font-mono">STU-2024-0847</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2 bg-muted rounded-lg">
          <span className="text-xs text-muted-foreground">UDISE ID</span>
          <span className="text-xs font-700 text-foreground font-mono">09010101847</span>
        </div>
      </div>

      {/* Meta */}
      <div className="w-full space-y-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin size={12} />
          <span>Maharashtra, India</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>Joined: Aug 2023</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield size={12} className="text-secondary" />
          <span className="text-secondary font-600">Identity Verified</span>
        </div>
      </div>

      {/* Profile completion */}
      <div className="w-full">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Profile completion</span>
          <span className="font-700 text-primary">{progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Add work experience to reach 100%</p>
      </div>

      <button className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-xs font-600 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-150">
        <ExternalLink size={13} />
        View Public Profile
      </button>
    </div>
  );
}