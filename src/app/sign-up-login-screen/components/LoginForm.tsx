'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Copy, Check } from 'lucide-react';
import type { RoleKey } from './AuthScreen';

// Backend integration point: replace this with actual auth API call
const demoCredentials: Record<RoleKey, { email: string; password: string; label: string }> = {
  student: { email: 'arjun.mehta@sarthi.in', password: 'Student@2024', label: 'Student Demo' },
  institute: { email: 'admin@rajivpoly.sarthi.in', password: 'Institute@2024', label: 'Institute Demo' },
  company: { email: 'hr@tcs.sarthi.in', password: 'Company@2024', label: 'Company Demo' },
  hq: { email: 'director@nsdc.sarthi.in', password: 'HQ@Admin2024', label: 'HQ Admin Demo' },
};

const routeByRole: Record<RoleKey, string> = {
  student: '/student-dashboard',
  institute: '/student-dashboard',
  company: '/student-dashboard',
  hq: '/student-dashboard',
};

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm({ role, roleLabel }: { role: RoleKey; roleLabel: string }) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ defaultValues: { rememberMe: false } });

  const creds = demoCredentials[role];

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  const fillCredentials = () => {
    setValue('email', creds.email);
    setValue('password', creds.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    // Backend integration point: POST /api/auth/login with { email, password, role }
    await new Promise((r) => setTimeout(r, 1200));

    if (data.email === creds.email && data.password === creds.password) {
      router.push(routeByRole[role]);
    } else {
      setError('email', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label htmlFor="login-email" className="block text-sm font-600 text-foreground mb-1.5">
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${
            errors.email ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
          }`}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
          })}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-danger font-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="login-password" className="block text-sm font-600 text-foreground mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPass ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${
              errors.password ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
            }`}
            {...register('password', { required: 'Password is required' })}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-danger font-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-input text-primary focus:ring-primary/30"
            {...register('rememberMe')}
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <a href="#" className="text-sm text-primary hover:text-primary-dark font-600 transition-colors">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ minWidth: '100%' }}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Signing in...
          </>
        ) : (
          `Sign in as ${roleLabel}`
        )}
      </button>

      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
            Demo Credentials ({creds.label})
          </p>
          <button
            type="button"
            onClick={fillCredentials}
            className="text-xs font-600 text-primary hover:text-primary-dark transition-colors"
          >
            Autofill →
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 bg-card px-3 py-2 rounded-lg border border-border">
            <span className="text-xs text-muted-foreground font-500 shrink-0">Email:</span>
            <span className="text-xs text-foreground font-600 truncate flex-1 text-right">{creds.email}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(creds.email, 'email')}
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === 'email' ? <Check size={13} className="text-secondary" /> : <Copy size={13} />}
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 bg-card px-3 py-2 rounded-lg border border-border">
            <span className="text-xs text-muted-foreground font-500 shrink-0">Password:</span>
            <span className="text-xs text-foreground font-600 flex-1 text-right">{creds.password}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(creds.password, 'password')}
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === 'password' ? <Check size={13} className="text-secondary" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}