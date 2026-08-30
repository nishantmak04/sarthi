'use client';
import React, { useState, useEffect } from 'react';
import StudentSidebar from './StudentSidebar';
import StudentTopbar from './StudentTopbar';
import DashboardOverview from './DashboardOverview';
import JourneyTab from './JourneyTab';
import SkillsTab from './SkillsTab';
import CertificatesTab from './CertificatesTab';
import VerificationTab from './VerificationTab';

export type DashboardTab = 'overview' | 'journey' | 'skills' | 'certificates' | 'verification';

export default function StudentDashboardLayout() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sarthi-theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sarthi-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sarthi-theme', 'light');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview onTabChange={setActiveTab} />;
      case 'journey': return <JourneyTab />;
      case 'skills': return <SkillsTab />;
      case 'certificates': return <CertificatesTab />;
      case 'verification': return <VerificationTab />;
      default: return <DashboardOverview onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <StudentSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-navy/50 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        <StudentTopbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          dark={dark}
          onToggleTheme={toggleTheme}
          activeTab={activeTab}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}