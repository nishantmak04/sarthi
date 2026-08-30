'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Map,
  Zap,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  X,
} from 'lucide-react';
import type { DashboardTab } from './StudentDashboardLayout';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { id: 'nav-overview', key: 'overview' as DashboardTab, icon: LayoutDashboard, label: 'Overview' },
  { id: 'nav-journey', key: 'journey' as DashboardTab, icon: Map, label: 'Career Journey' },
  { id: 'nav-skills', key: 'skills' as DashboardTab, icon: Zap, label: 'Skills' },
  { id: 'nav-certificates', key: 'certificates' as DashboardTab, icon: Award, label: 'Certificates' },
  { id: 'nav-verification', key: 'verification' as DashboardTab, icon: ShieldCheck, label: 'Verification' },
];

interface Props {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function StudentSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: Props) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col bg-card border-r border-border transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-border px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <AppLogo size={28} />
              <span className="font-800 text-base text-foreground tracking-tight">Sarthi</span>
            </div>
          )}
          {collapsed && <AppLogo size={28} />}
          <button
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 ${collapsed ? 'ml-0' : ''}`}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Student info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-700 shrink-0">
                AM
              </div>
              <div className="min-w-0">
                <p className="text-sm font-700 text-foreground truncate">Arjun Mehta</p>
                <p className="text-xs text-muted-foreground truncate">STU-2024-0847</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto hide-scrollbar">
          {!collapsed && (
            <p className="px-3 text-xs font-600 text-muted-foreground uppercase tracking-wider mb-3">
              Dashboard
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.key)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-600 transition-all duration-150 group relative ${
                  isActive
                    ? 'sidebar-item-active' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : ''} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {/* Tooltip for collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-navy text-white text-xs font-600 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className={`px-2 py-4 border-t border-border space-y-1`}>
          <button
            title={collapsed ? 'Settings' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          >
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </button>
          <Link
            href="/sign-up-login-screen"
            title={collapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 text-muted-foreground hover:bg-danger-light hover:text-danger transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-40 w-72 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 border-b border-border px-4">
          <div className="flex items-center gap-2.5">
            <AppLogo size={28} />
            <span className="font-800 text-base text-foreground">Sarthi</span>
          </div>
          <button onClick={onMobileClose} className="p-2 rounded-lg text-muted-foreground hover:bg-muted">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-700">
              AM
            </div>
            <div>
              <p className="text-sm font-700 text-foreground">Arjun Mehta</p>
              <p className="text-xs text-muted-foreground">STU-2024-0847</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={`mob-${item.id}`}
                onClick={() => { onTabChange(item.key); onMobileClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-600 transition-all duration-150 ${
                  isActive ? 'sidebar-item-active' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : ''} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <Link
            href="/sign-up-login-screen"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 text-muted-foreground hover:bg-danger-light hover:text-danger transition-all duration-150"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}