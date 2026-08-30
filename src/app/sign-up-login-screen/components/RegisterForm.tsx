'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import type { RoleKey } from './AuthScreen';

interface RegisterFormData {
  fullName: string;
  email: string;
  mobile: string;
  studentId?: string;
  udiseId?: string;
  instituteCode?: string;
  companyId?: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function RegisterForm({ role, roleLabel }: { role: RoleKey; roleLabel: string }) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    // Backend integration point: POST /api/auth/register with { ...data, role }
    await new Promise((r) => setTimeout(r, 1400));
    router.push('/student-dashboard');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="reg-name" className="block text-sm font-600 text-foreground mb-1.5">
          Full Name
        </label>
        <input
          id="reg-name"
          type="text"
          placeholder="Arjun Mehta"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${errors.fullName ? 'border-danger' : 'border-input hover:border-primary/40'}`}
          {...register('fullName', { required: 'Full name is required' })}
        />
        {errors.fullName && <p className="mt-1 text-xs text-danger">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="block text-sm font-600 text-foreground mb-1.5">
          Email Address
        </label>
        <input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${errors.email ? 'border-danger' : 'border-input hover:border-primary/40'}`}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="reg-mobile" className="block text-sm font-600 text-foreground mb-1.5">
          Mobile Number
        </label>
        <input
          id="reg-mobile"
          type="tel"
          placeholder="+91 98765 43210"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${errors.mobile ? 'border-danger' : 'border-input hover:border-primary/40'}`}
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
          })}
        />
        {errors.mobile && <p className="mt-1 text-xs text-danger">{errors.mobile.message}</p>}
      </div>

      {/* Role-specific fields */}
      {role === 'student' && (
        <>
          <div>
            <label htmlFor="reg-student-id" className="block text-sm font-600 text-foreground mb-1.5">
              Student ID
              <span className="ml-1 text-xs text-muted-foreground font-400">(from your institute)</span>
            </label>
            <input
              id="reg-student-id"
              type="text"
              placeholder="STU-2024-XXXX"
              className="w-full px-4 py-3 rounded-xl border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/40 transition-all duration-150"
              {...register('studentId')}
            />
          </div>
          <div>
            <label htmlFor="reg-udise" className="block text-sm font-600 text-foreground mb-1.5">
              UDISE ID
              <span className="ml-1 text-xs text-muted-foreground font-400">(optional)</span>
            </label>
            <input
              id="reg-udise"
              type="text"
              placeholder="09010101001"
              className="w-full px-4 py-3 rounded-xl border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/40 transition-all duration-150"
              {...register('udiseId')}
            />
          </div>
        </>
      )}

      {role === 'institute' && (
        <div>
          <label htmlFor="reg-inst-code" className="block text-sm font-600 text-foreground mb-1.5">
            Institute Code
          </label>
          <input
            id="reg-inst-code"
            type="text"
            placeholder="INS-XXXX"
            className="w-full px-4 py-3 rounded-xl border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/40 transition-all duration-150"
            {...register('instituteCode')}
          />
        </div>
      )}

      {role === 'company' && (
        <div>
          <label htmlFor="reg-company-id" className="block text-sm font-600 text-foreground mb-1.5">
            Company ID
          </label>
          <input
            id="reg-company-id"
            type="text"
            placeholder="CMP-XXXX"
            className="w-full px-4 py-3 rounded-xl border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/40 transition-all duration-150"
            {...register('companyId')}
          />
        </div>
      )}

      {/* Password */}
      <div>
        <label htmlFor="reg-password" className="block text-sm font-600 text-foreground mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPass ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${errors.password ? 'border-danger' : 'border-input hover:border-primary/40'}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
      </div>

      {/* Confirm password */}
      <div>
        <label htmlFor="reg-confirm-password" className="block text-sm font-600 text-foreground mb-1.5">
          Confirm Password
        </label>
        <input
          id="reg-confirm-password"
          type="password"
          placeholder="Re-enter your password"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-150 ${errors.confirmPassword ? 'border-danger' : 'border-input hover:border-primary/40'}`}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) => val === password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && <p className="mt-1 text-xs text-danger">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-primary/30 shrink-0"
            {...register('agreeTerms', { required: 'You must agree to the terms' })}
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline font-600">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline font-600">Privacy Policy</a>
          </span>
        </label>
        {errors.agreeTerms && <p className="mt-1 text-xs text-danger">{errors.agreeTerms.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating account...
          </>
        ) : (
          `Register as ${roleLabel}`
        )}
      </button>
    </form>
  );
}