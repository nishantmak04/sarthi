'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import GlobalSearch from '@/components/ui/GlobalSearch';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sarthi-theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement?.classList?.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e?.metaKey || e?.ctrlKey) && e?.key === 'k') {
        e?.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement?.classList?.add('dark');
      localStorage.setItem('sarthi-theme', 'dark');
    } else {
      document.documentElement?.classList?.remove('dark');
      localStorage.setItem('sarthi-theme', 'light');
    }
  };

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Students', href: '#for-students' },
    { label: 'For Institutes', href: '#for-institutes' },
    { label: 'For Companies', href: '#for-companies' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={32} />
            <span className="font-sans font-800 text-xl tracking-tight text-foreground">
              Sarthi
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks?.map((link) => (
              <a
                key={`nav-${link?.label}`}
                href={link?.href}
                className="px-4 py-2 text-sm font-500 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-150"
              >
                {link?.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/60 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              aria-label="Open search"
            >
              <Search size={14} />
              <span className="text-xs">Search</span>
              <kbd className="text-xs bg-border px-1.5 py-0.5 rounded font-600">⌘K</kbd>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              href="/sign-up-login-screen"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-600 text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary hover:bg-primary-light transition-all duration-150"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up-login-screen"
              className="btn-primary text-sm py-2 px-5"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-150"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-1 pt-3 animate-fade-in">
            {navLinks?.map((link) => (
              <a
                key={`mobile-nav-${link?.label}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-150"
              >
                {link?.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <Link
                href="/sign-up-login-screen"
                className="btn-secondary text-sm py-2.5 justify-center"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up-login-screen"
                className="btn-primary text-sm py-2.5 justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}