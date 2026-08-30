'use client';
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Lock, Eye, ShieldCheck, Database, Key, AlertOctagon } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const features = [
  {
    id: 'sec-privacy',
    icon: Lock,
    title: 'Salary Privacy',
    desc: 'Salary data is encrypted and visible only to the student and authorized HQ admins. Company users see a protected placeholder.',
  },
  {
    id: 'sec-verify',
    icon: ShieldCheck,
    title: 'Verified Credentials',
    desc: 'Every certificate, skill, and employment record is verified by the issuing organization before being added to the profile.',
  },
  {
    id: 'sec-access',
    icon: Eye,
    title: 'Role-Based Access',
    desc: 'Students, institutes, companies, and HQ each see only the data relevant to their role. No unauthorized cross-access.',
  },
  {
    id: 'sec-audit',
    icon: Database,
    title: 'Audit Trail',
    desc: 'Every data change is logged with timestamp, user ID, and action. Full audit history available to HQ administrators.',
  },
  {
    id: 'sec-keys',
    icon: Key,
    title: 'Cryptographic Hashes',
    desc: 'Certificates include a verification hash that any party can independently verify — preventing tampering or forgery.',
  },
  {
    id: 'sec-alert',
    icon: AlertOctagon,
    title: 'Anomaly Detection',
    desc: 'Unusual activity — duplicate IDs, rapid changes, or unverified bulk uploads — triggers automatic review flags.',
  },
];

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="section-label mb-3">Security & Privacy</p>
          <h2 className="text-hero-md text-foreground mb-4">
            Built on trust. Protected by design.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Student data is sensitive. Sarthi is architected with privacy-first principles — every piece of data is controlled, verified, and protected.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, i) => {
            const Icon = feature?.icon;
            return (
              <div
                key={feature?.id}
                className="bg-card border border-border rounded-xl p-6 card-hover"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 0.6s ease ${i * 0.08}s`,
                }}
              >
                <div className="w-11 h-11 bg-primary-light rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="text-base font-700 text-foreground mb-2">{feature?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature?.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}