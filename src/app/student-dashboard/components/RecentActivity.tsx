'use client';
import React from 'react';
import { CheckCircle, Award, Briefcase, Zap, Shield, AlertTriangle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  {
    id: 'act-1',
    icon: CheckCircle,
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary-light',
    title: 'Employment confirmed by TCS',
    sub: 'Software Engineer L2 · Joined 12 Aug 2024',
    time: '2 days ago',
    type: 'success',
  },
  {
    id: 'act-2',
    icon: Award,
    iconColor: 'text-warning',
    iconBg: 'bg-warning-light',
    title: 'AWS Cloud Practitioner certificate verified',
    sub: 'Issued by Amazon Web Services · Valid until Aug 2027',
    time: '5 days ago',
    type: 'success',
  },
  {
    id: 'act-3',
    icon: Zap,
    iconColor: 'text-primary',
    iconBg: 'bg-primary-light',
    title: 'React.js skill endorsed',
    sub: 'Endorsed by Rajiv Gandhi Polytechnic · Level: Advanced',
    time: '8 days ago',
    type: 'info',
  },
  {
    id: 'act-4',
    icon: Shield,
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary-light',
    title: 'Monthly verification completed',
    sub: 'All sections reviewed and confirmed · Next due: 30 Sep 2026',
    time: '27 days ago',
    type: 'success',
  },
  {
    id: 'act-5',
    icon: Briefcase,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-light',
    title: 'Internship record added — Infosys',
    sub: 'Full Stack Developer Intern · 6 months · Pune',
    time: '2 months ago',
    type: 'info',
  },
  {
    id: 'act-6',
    icon: AlertTriangle,
    iconColor: 'text-warning',
    iconBg: 'bg-warning-light',
    title: 'Profile completion reminder',
    sub: 'Add work experience to reach 100% completion',
    time: '3 months ago',
    type: 'warning',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-700 text-foreground">Recent Activity</h3>
        <button className="text-xs text-primary font-600 hover:underline">View all</button>
      </div>

      <div className="space-y-1">
        {activities?.map((activity, i) => {
          const Icon = activity?.icon;
          return (
            <div
              key={activity?.id}
              className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-muted/50 transition-all duration-150 group cursor-pointer"
            >
              <div className={`w-9 h-9 ${activity?.iconBg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon size={16} className={activity?.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-600 text-foreground">{activity?.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity?.sub}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{activity?.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}