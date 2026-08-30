// Landing Page — entry point at /
import React from 'react';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import CareerJourneySection from './components/CareerJourneySection';
import IdentityNetworkSection from './components/IdentityNetworkSection';
import RoleSection from './components/RoleSection';
import StatsSection from './components/StatsSection';
import SecuritySection from './components/SecuritySection';
import FinalCTASection from './components/FinalCTASection';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <CareerJourneySection />
        <IdentityNetworkSection />
        <RoleSection />
        <StatsSection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}