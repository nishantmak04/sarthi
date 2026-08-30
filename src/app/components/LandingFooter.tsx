import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function LandingFooter() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={32} />
              <span className="font-800 text-xl text-white tracking-tight">Sarthi</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              One Identity. One Journey. Every Opportunity.
            </p>
            <p className="text-xs text-white/30">
              Empowering India&apos;s workforce with verified professional identities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-700 text-white/80 mb-4">Platform</h4>
            <ul className="space-y-3">
              {['For Students', 'For Institutes', 'For Companies', 'For HQ']?.map((item) => (
                <li key={`footer-${item}`}>
                  <Link href="/sign-up-login-screen" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-700 text-white/80 mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Privacy Policy', 'Terms of Service', 'Contact']?.map((item) => (
                <li key={`footer-co-${item}`}>
                  <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2026 Sarthi. All rights reserved. Made in India 🇮🇳
          </p>
          <p className="text-xs text-white/30">
            NSDC Partner • Govt. of India Initiative
          </p>
        </div>
      </div>
    </footer>
  );
}