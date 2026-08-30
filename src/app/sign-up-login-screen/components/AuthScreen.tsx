'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { GraduationCap, Building2, Briefcase, BarChart3, Sun, Moon } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Icon from '@/components/ui/AppIcon';


const roles = [
  {
    id: 'role-student',
    key: 'student' as const,
    icon: GraduationCap,
    label: 'Student',
    sublabel: 'Trainee / Learner',
    color: 'text-primary',
    bg: 'bg-primary-light',
    border: 'border-primary/30',
  },
  {
    id: 'role-institute',
    key: 'institute' as const,
    icon: Building2,
    label: 'Institute',
    sublabel: 'School / College / Training',
    color: 'text-accent',
    bg: 'bg-accent-light',
    border: 'border-accent/30',
  },
  {
    id: 'role-company',
    key: 'company' as const,
    icon: Briefcase,
    label: 'Company',
    sublabel: 'Employer / Organization',
    color: 'text-secondary',
    bg: 'bg-secondary-light',
    border: 'border-secondary/30',
  },
  {
    id: 'role-hq',
    key: 'hq' as const,
    icon: BarChart3,
    label: 'Headquarters',
    sublabel: 'Admin / Government',
    color: 'text-warning',
    bg: 'bg-warning-light',
    border: 'border-warning/30',
  },
];

export type RoleKey = 'student' | 'institute' | 'company' | 'hq';

export default function AuthScreen() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('student');
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const activeRole = roles.find((r) => r.key === selectedRole)!;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div
          className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-800 text-2xl text-white tracking-tight">Sarthi</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-800 text-white leading-tight mb-4">
            One Identity.
            <br />
            <span className="text-gradient-green">One Journey.</span>
            <br />
            Every Opportunity.
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-sm">
            Build your verified professional identity from education to employment — trusted by 1.2M+ students across India.
          </p>

          {/* Journey stages */}
          <div className="space-y-3">
            {['🎓 Education', '📚 Training', '⚡ Skills', '🏆 Certificates', '💼 Employment'].map((stage, i) => (
              <div
                key={`auth-stage-${i}`}
                className="flex items-center gap-3 text-white/70 text-sm font-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {stage}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs">
            NSDC Partner • Govt. of India Recognized • 1,247 Institutes
          </p>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-800 text-lg text-foreground">Sarthi</span>
          </Link>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-150"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 overflow-y-auto px-8 py-10 max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-700 text-foreground mb-1">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tab === 'login' ? 'Sign in to your Sarthi account' : 'Join Sarthi and build your verified identity'}
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <label className="block text-xs font-600 text-muted-foreground mb-3 uppercase tracking-wider">
              Select your role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = selectedRole === role.key;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.key)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left ${
                      isActive ? `${role.bg} ${role.border} shadow-sm` : 'bg-muted/40 border-border hover:border-primary/30'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/60' : 'bg-muted'}`}>
                      <Icon size={18} className={isActive ? role.color : 'text-muted-foreground'} />
                    </div>
                    <div>
                      <p className={`text-sm font-700 ${isActive ? role.color : 'text-foreground'}`}>{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.sublabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-600 transition-all duration-200 ${
                tab === 'login' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-600 transition-all duration-200 ${
                tab === 'register' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          {tab === 'login' ? (
            <LoginForm role={selectedRole} roleLabel={activeRole.label} />
          ) : (
            <RegisterForm role={selectedRole} roleLabel={activeRole.label} />
          )}
        </div>
      </div>
    </div>
  );
}