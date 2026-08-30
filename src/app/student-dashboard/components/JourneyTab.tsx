'use client';
import React, { useState } from 'react';
import { GraduationCap, BookOpen, Zap, Award, Briefcase, Building2, TrendingUp, Clock } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stages = [
  {
    id: 'j-edu',
    icon: GraduationCap,
    title: 'Education',
    org: 'Rajiv Gandhi Polytechnic, Pune',
    course: 'B.Tech Computer Science',
    period: 'Jun 2019 – May 2023',
    status: 'Completed',
    statusColor: 'bg-secondary-light text-secondary',
    details: ['CGPA: 8.4 / 10', 'Stream: Computer Science & Engineering', 'Board: MSBTE, Maharashtra'],
    verified: true,
  },
  {
    id: 'j-train',
    icon: BookOpen,
    title: 'Training',
    org: 'NSDC Authorized Training Center',
    course: 'Full Stack Web Development',
    period: 'Jul 2023 – Jan 2024',
    status: 'Completed',
    statusColor: 'bg-secondary-light text-secondary',
    details: ['Duration: 6 months', 'Completion: 94%', 'Assessment Score: 87/100'],
    verified: true,
  },
  {
    id: 'j-skills',
    icon: Zap,
    title: 'Skills Acquired',
    org: 'Multiple Sources',
    course: 'Python, React, SQL, AWS, Node.js +9 more',
    period: '2023 – Present',
    status: 'Active',
    statusColor: 'bg-primary-light text-primary',
    details: ['14 skills total', '11 verified by institute/employer', '3 self-reported (pending verification)'],
    verified: true,
  },
  {
    id: 'j-cert',
    icon: Award,
    title: 'Certifications',
    org: 'AWS, NASSCOM, Google',
    course: 'Cloud Practitioner, Python Advanced, Digital Skills',
    period: '2023 – 2024',
    status: 'Verified',
    statusColor: 'bg-secondary-light text-secondary',
    details: ['7 certificates total', '6 verified', '1 pending review'],
    verified: true,
  },
  {
    id: 'j-intern',
    icon: Briefcase,
    title: 'Internship',
    org: 'Infosys Limited, Pune',
    course: 'Full Stack Developer Intern',
    period: 'Feb 2023 – Jul 2023',
    status: 'Verified',
    statusColor: 'bg-secondary-light text-secondary',
    details: ['Duration: 6 months', 'Team: Digital Commerce', 'Stipend: ₹18,000/month'],
    verified: true,
  },
  {
    id: 'j-employ',
    icon: Building2,
    title: 'Current Employment',
    org: 'Tata Consultancy Services (TCS)',
    course: 'Software Engineer L2',
    period: 'Aug 2024 – Present',
    status: 'Active',
    statusColor: 'bg-primary-light text-primary',
    details: ['Location: Pune, Maharashtra', 'Department: Digital Platforms', 'Salary: 🔒 Protected'],
    verified: true,
  },
  {
    id: 'j-growth',
    icon: TrendingUp,
    title: 'Professional Growth',
    org: 'TCS',
    course: 'Performance & Milestones',
    period: '2024 – Present',
    status: 'Ongoing',
    statusColor: 'bg-accent-light text-accent',
    details: ['Performance Score: 87/100', '2 skill upgrades this year', 'Next review: Dec 2026'],
    verified: false,
  },
];

export default function JourneyTab() {
  const [expanded, setExpanded] = useState<string | null>('j-employ');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-700 text-foreground">Career Journey</h2>
        <p className="text-sm text-muted-foreground mt-1">Your complete professional timeline — verified and connected.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30 rounded-full" />

        <div className="space-y-4">
          {stages?.map((stage) => {
            const Icon = stage?.icon;
            const isExpanded = expanded === stage?.id;

            return (
              <div key={stage?.id} className="relative pl-16">
                {/* Node */}
                <div className={`absolute left-3 top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  stage?.status === 'Active' || stage?.status === 'Ongoing' ?'border-primary bg-primary'
                    : stage?.verified
                    ? 'border-secondary bg-secondary' :'border-border bg-card'
                }`}>
                  {stage?.verified && (
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 6l3 3L10 3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {!stage?.verified && <Clock size={10} className="text-muted-foreground" />}
                </div>

                {/* Card */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : stage?.id)}
                  className={`w-full text-left bg-card border rounded-2xl p-5 transition-all duration-300 hover:shadow-sm ${
                    isExpanded ? 'border-primary/30 shadow-sm' : 'border-border hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        stage?.status === 'Active' ? 'bg-primary-light' : 'bg-muted'
                      }`}>
                        <Icon size={18} className={stage?.status === 'Active' ? 'text-primary' : 'text-muted-foreground'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-sm font-700 text-foreground">{stage?.title}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-600 ${stage?.statusColor}`}>
                            {stage?.status}
                          </span>
                          {stage?.verified && <span className="verified-badge">✓ Verified</span>}
                        </div>
                        <p className="text-sm font-600 text-foreground">{stage?.org}</p>
                        <p className="text-xs text-muted-foreground">{stage?.course}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock size={10} />
                          {stage?.period}
                        </p>
                      </div>
                    </div>
                    <div className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stage?.details?.map((detail) => (
                          <div key={`detail-${stage?.id}-${detail?.slice(0, 8)}`} className="bg-muted rounded-xl px-3 py-2.5">
                            <p className="text-xs text-foreground font-600">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}