'use client';
import React, { useState } from 'react';
import { Award, Calendar, Building2, X, ExternalLink, Plus } from 'lucide-react';

const certificates = [
  {
    id: 'cert-aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '12 Aug 2024',
    expiry: '12 Aug 2027',
    status: 'Verified',
    category: 'Cloud',
    credentialId: 'AWS-CLF-C02-847',
    color: 'border-warning/30 bg-warning-light/30',
    badgeColor: 'bg-warning-light text-warning',
  },
  {
    id: 'cert-python',
    name: 'Python Advanced Certification',
    issuer: 'NASSCOM FutureSkills',
    date: '15 Jan 2024',
    expiry: 'No Expiry',
    status: 'Verified',
    category: 'Programming',
    credentialId: 'NASSCOM-PY-2024-0847',
    color: 'border-primary/30 bg-primary-light/30',
    badgeColor: 'bg-primary-light text-primary',
  },
  {
    id: 'cert-fullstack',
    name: 'Full Stack Web Development',
    issuer: 'NSDC Training Center',
    date: '31 Jan 2024',
    expiry: 'No Expiry',
    status: 'Verified',
    category: 'Development',
    credentialId: 'NSDC-FSD-2024-MH-0847',
    color: 'border-secondary/30 bg-secondary-light/30',
    badgeColor: 'bg-secondary-light text-secondary',
  },
  {
    id: 'cert-google',
    name: 'Google Digital Skills for Africa',
    issuer: 'Google',
    date: '20 Mar 2024',
    expiry: 'No Expiry',
    status: 'Verified',
    category: 'Digital',
    credentialId: 'GOOGLE-DSA-2024-0847',
    color: 'border-accent/30 bg-accent-light/30',
    badgeColor: 'bg-accent-light text-accent',
  },
  {
    id: 'cert-react',
    name: 'React.js Developer Certificate',
    issuer: 'Rajiv Gandhi Polytechnic',
    date: '10 Mar 2024',
    expiry: 'No Expiry',
    status: 'Verified',
    category: 'Frontend',
    credentialId: 'RGP-REACT-2024-0847',
    color: 'border-primary/30 bg-primary-light/30',
    badgeColor: 'bg-primary-light text-primary',
  },
  {
    id: 'cert-infosys',
    name: 'Infosys Internship Completion',
    issuer: 'Infosys Limited',
    date: '31 Jul 2023',
    expiry: 'No Expiry',
    status: 'Verified',
    category: 'Industry',
    credentialId: 'INF-INT-2023-PUN-0847',
    color: 'border-secondary/30 bg-secondary-light/30',
    badgeColor: 'bg-secondary-light text-secondary',
  },
  {
    id: 'cert-docker',
    name: 'Docker Fundamentals',
    issuer: 'Docker Inc.',
    date: 'Pending',
    expiry: '—',
    status: 'Pending',
    category: 'DevOps',
    credentialId: 'Awaiting verification',
    color: 'border-border',
    badgeColor: 'bg-muted text-muted-foreground',
  },
];

export default function CertificatesTab() {
  const [selected, setSelected] = useState<typeof certificates?.[0] | null>(null);

  const verifiedCount = certificates?.filter((c) => c?.status === 'Verified')?.length;
  const pendingCount = certificates?.filter((c) => c?.status === 'Pending')?.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-700 text-foreground">Certificates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {verifiedCount} verified &middot; {pendingCount} pending
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary-light text-primary rounded-xl text-sm font-600 hover:bg-primary hover:text-white transition-all duration-150 self-start sm:self-auto">
          <Plus size={15} />
          Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {certificates?.map((cert) => (
          <button
            key={cert?.id}
            onClick={() => setSelected(cert)}
            className={`text-left bg-card border rounded-2xl p-5 card-hover transition-all duration-200 ${cert?.color}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center border border-border shadow-sm">
                <Award size={22} className="text-warning" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-600 ${cert?.badgeColor}`}>
                {cert?.status === 'Verified' ? '✓ Verified' : '⏳ Pending'}
              </span>
            </div>

            <h3 className="text-sm font-700 text-foreground mb-1 leading-snug">{cert?.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Building2 size={11} />
              <span>{cert?.issuer}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={11} />
              <span>{cert?.date}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground font-mono truncate">{cert?.credentialId}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-lg animate-scale-in">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-warning-light rounded-2xl flex items-center justify-center">
                <Award size={28} className="text-warning" />
              </div>
              <div>
                <h3 className="text-base font-700 text-foreground">{selected?.name}</h3>
                <p className="text-sm text-muted-foreground">{selected?.issuer}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className={`text-xs font-700 ${selected?.status === 'Verified' ? 'text-secondary' : 'text-warning'}`}>
                  {selected?.status === 'Verified' ? '✓ Verified' : '⏳ Pending Verification'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-xs text-muted-foreground">Issue Date</span>
                <span className="text-xs font-600 text-foreground">{selected?.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-xs text-muted-foreground">Expiry</span>
                <span className="text-xs font-600 text-foreground">{selected?.expiry}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-xs text-muted-foreground">Category</span>
                <span className="text-xs font-600 text-foreground">{selected?.category}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-muted-foreground">Credential ID</span>
                <span className="text-xs font-700 text-foreground font-mono">{selected?.credentialId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 btn-primary py-2.5 text-sm justify-center">
                <ExternalLink size={14} />
                Verify Online
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 btn-secondary py-2.5 text-sm justify-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}