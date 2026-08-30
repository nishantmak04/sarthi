'use client';
import React, { useState } from 'react';
import { CheckCircle, Clock, Shield, User, GraduationCap, Zap, Award, Briefcase, Phone, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


const sections = [
  {
    id: 'ver-personal',
    icon: User,
    title: 'Personal Information',
    items: ['Full Name: Arjun Mehta', 'Date of Birth: 14 Mar 2001', 'State: Maharashtra', 'Mobile: +91 98765 43210'],
    status: 'reviewed' as const,
  },
  {
    id: 'ver-edu',
    icon: GraduationCap,
    title: 'Education',
    items: ['B.Tech Computer Science — Rajiv Gandhi Polytechnic', 'CGPA: 8.4 / 10 — Batch 2019–2023', 'UDISE ID: 09010101847'],
    status: 'reviewed' as const,
  },
  {
    id: 'ver-skills',
    icon: Zap,
    title: 'Skills',
    items: ['14 skills on record', '11 verified by institute or employer', '3 self-reported pending verification'],
    status: 'pending' as const,
  },
  {
    id: 'ver-certs',
    icon: Award,
    title: 'Certificates',
    items: ['7 certificates total', 'AWS Cloud Practitioner — Valid until Aug 2027', 'NASSCOM Python Advanced — No Expiry'],
    status: 'reviewed' as const,
  },
  {
    id: 'ver-employment',
    icon: Briefcase,
    title: 'Employment',
    items: ['Current: TCS — Software Engineer L2', 'Joined: 12 Aug 2024', 'Previous: Infosys Internship (Feb–Jul 2023)'],
    status: 'reviewed' as const,
  },
  {
    id: 'ver-contact',
    icon: Phone,
    title: 'Contact Information',
    items: ['Email: arjun.mehta@sarthi.in', 'Mobile: +91 98765 43210', 'State: Maharashtra, India'],
    status: 'reviewed' as const,
  },
];

export default function VerificationTab() {
  const [sectionStates, setSectionStates] = useState<Record<string, 'pending' | 'reviewed' | 'confirmed'>>(
    Object.fromEntries(sections.map((s) => [s.id, s.status]))
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allReviewed = Object.values(sectionStates).every((s) => s === 'reviewed' || s === 'confirmed');

  const confirmSection = (id: string) => {
    setSectionStates((prev) => ({ ...prev, [id]: 'confirmed' }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Backend integration point: POST /api/verification/monthly-confirm
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitted(true);
    setSubmitting(false);
    toast.success('Profile verified successfully! Next review: 30 Sep 2026');
  };

  const confirmedCount = Object.values(sectionStates).filter((s) => s === 'confirmed').length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-700 text-foreground">Monthly Profile Verification</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review and confirm your profile details to maintain verified status. This takes about 2 minutes.
        </p>
      </div>

      {/* Status card */}
      <div className="bg-warning-light border border-warning/30 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
            <Clock size={20} className="text-warning" />
          </div>
          <div>
            <p className="text-sm font-700 text-foreground">Verification Due</p>
            <p className="text-xs text-muted-foreground">Last verified: 3 Aug 2026 · Due: 3 Sep 2026</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-800 text-warning tabular-nums">3</p>
          <p className="text-xs text-muted-foreground">days left</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="font-600 text-foreground">Sections Confirmed</span>
          <span className="font-700 text-primary">{confirmedCount} / {sections.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${(confirmedCount / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      {!submitted ? (
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const state = sectionStates[section.id];
            const isConfirmed = state === 'confirmed';

            return (
              <div
                key={section.id}
                className={`bg-card border rounded-2xl p-5 transition-all duration-300 ${
                  isConfirmed ? 'border-secondary/30 bg-secondary-light/20' : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isConfirmed ? 'bg-secondary-light' : 'bg-muted'}`}>
                      <Icon size={18} className={isConfirmed ? 'text-secondary' : 'text-muted-foreground'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-700 text-foreground">{section.title}</h3>
                        {isConfirmed && <CheckCircle size={14} className="text-secondary" />}
                      </div>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={`item-${section.id}-${item.slice(0, 8)}`} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {!isConfirmed ? (
                    <button
                      onClick={() => confirmSection(section.id)}
                      className="shrink-0 px-4 py-2 bg-primary text-white rounded-xl text-xs font-600 hover:bg-primary-dark transition-all duration-150"
                    >
                      Confirm ✓
                    </button>
                  ) : (
                    <span className="shrink-0 px-4 py-2 bg-secondary-light text-secondary rounded-xl text-xs font-600">
                      Confirmed ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!allReviewed || submitting}
            className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting verification...
              </>
            ) : (
              <>
                <Shield size={18} />
                {allReviewed ? 'Complete Monthly Verification' : `Confirm all ${sections.length} sections to continue`}
              </>
            )}
          </button>
        </div>
      ) : (
        /* Success state */
        <div className="bg-secondary-light border border-secondary/30 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-700 text-foreground mb-2">Profile Verified</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Your monthly verification is complete. All sections confirmed on 30 Aug 2026.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl text-sm text-muted-foreground">
            <Clock size={14} />
            Next verification: 30 Sep 2026
          </div>
        </div>
      )}
    </div>
  );
}