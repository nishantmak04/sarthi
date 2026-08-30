'use client';
import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, Search, ChevronDown } from 'lucide-react';
import type { DashboardTab } from './StudentDashboardLayout';
import GlobalSearch from '@/components/ui/GlobalSearch';

const tabLabels: Record<DashboardTab, string> = {
  overview: 'Overview',
  journey: 'Career Journey',
  skills: 'Skills',
  certificates: 'Certificates',
  verification: 'Monthly Verification',
};

const notifications = [
  { id: 'notif-1', text: 'Your monthly profile verification is due in 3 days.', time: '2h ago', unread: true },
  { id: 'notif-2', text: 'AWS Cloud Practitioner certificate has been verified.', time: '1d ago', unread: true },
  { id: 'notif-3', text: 'TCS confirmed your employment record.', time: '3d ago', unread: false },
  { id: 'notif-4', text: 'New skill endorsement from Rajiv Gandhi Polytechnic.', time: '5d ago', unread: false },
];

interface Props {
  onMenuClick: () => void;
  dark: boolean;
  onToggleTheme: () => void;
  activeTab: DashboardTab;
}

export default function StudentTopbar({ onMenuClick, dark, onToggleTheme, activeTab }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4 sticky top-0 z-20">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-150"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-base font-700 text-foreground">{tabLabels[activeTab]}</h1>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Last updated: 30 Aug 2026, 07:56 AM
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-xl text-sm text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all duration-150"
        >
          <Search size={15} />
          <span>Search...</span>
          <span className="text-xs bg-border px-1.5 py-0.5 rounded font-600">⌘K</span>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150"
        >
          <Search size={18} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-xs font-700 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-lg z-50 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <p className="text-sm font-700 text-foreground">Notifications</p>
                <span className="text-xs text-primary font-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                      notif.unread ? 'bg-primary-light/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {notif.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                      {!notif.unread && <div className="w-2 h-2 shrink-0" />}
                      <div>
                        <p className="text-xs text-foreground leading-relaxed">{notif.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-all duration-150"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-700">
              AM
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-700 text-foreground">Arjun Mehta</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-700 text-foreground">Arjun Mehta</p>
                <p className="text-xs text-muted-foreground">arjun.mehta@sarthi.in</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2.5 text-sm text-left text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  View Profile
                </button>
                <button className="w-full px-4 py-2.5 text-sm text-left text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  Account Settings
                </button>
                <div className="border-t border-border my-1" />
                <button className="w-full px-4 py-2.5 text-sm text-left text-danger hover:bg-danger-light transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}
        />
      )}

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}