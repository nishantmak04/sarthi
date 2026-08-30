'use client';
import React from 'react';
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react';

interface Props {
  onVerify: () => void;
}

export default function VerificationBanner({ onVerify }: Props) {
  return (
    <div className="bg-warning-light border border-warning/30 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center shrink-0">
          <AlertTriangle size={20} className="text-warning" />
        </div>
        <div>
          <p className="text-sm font-700 text-foreground">Monthly Profile Verification Due</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your profile was last verified 27 days ago. Review and confirm your details to maintain verified status.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} className="text-warning" />
              <span>Last verified: <strong className="text-foreground">3 Aug 2026</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} className="text-danger" />
              <span>Due in: <strong className="text-danger">3 days</strong></span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onVerify}
        className="flex items-center gap-2 px-5 py-2.5 bg-warning text-white rounded-xl text-sm font-600 hover:bg-amber-500 transition-all duration-150 hover:-translate-y-0.5 shrink-0 group"
      >
        Review & Confirm
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}