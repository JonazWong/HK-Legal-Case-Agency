'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, Chrome } from 'lucide-react';
import { Input } from '@/components/ui';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/components/ui/glass-card';
import { PremierButton } from '@/components/ui/premier-button';
import { ParticleBackground } from '@/components/effects/particle-background';
import { pageVariants, pageTransition } from '@/lib/animations';

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const isEn = pathname.startsWith('/en');
  const localePrefix = isEn ? '/en' : '/zh';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        try {
          const sessionRes = await fetch('/api/auth/session');
          const sessionData = sessionRes.ok ? await sessionRes.json() : null;
          const role = sessionData?.user?.role as string | undefined;

          if (role === 'CLIENT') {
            router.push(`${localePrefix}/client`);
          } else {
            router.push(`${localePrefix}/dashboard`);
          }
        } catch {
          router.push(`${localePrefix}/dashboard`);
        } finally {
          router.refresh();
        }
      }
    } catch (err) {
      setError(isEn ? 'An unexpected error occurred' : '發生未預期的錯誤');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: `${localePrefix}/dashboard` });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-premier-black px-4 py-12 relative overflow-hidden">
      {/* Particle Background Effect */}
      <ParticleBackground particleCount={40} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-premier-mystery-violet/10 via-transparent to-premier-gold/5 pointer-events-none" />

      {/* Login Card */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard variant="gold" glow animated>
          <GlassCardHeader>
            <GlassCardTitle className="text-2xl text-center">
              {isEn ? 'Welcome Back' : '歡迎回來'}
            </GlassCardTitle>
            <GlassCardDescription className="text-center text-premier-pearl/70">
              {isEn ? 'Sign in to your account to continue' : '請登入以繼續使用系統'}
            </GlassCardDescription>
          </GlassCardHeader>
          
          <GlassCardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-premier-md backdrop-blur-sm"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Email Address' : '電郵地址'}
                </label>
                <Input
                  type="email"
                  placeholder={isEn ? 'your@email.com' : 'your@email.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Password' : '密碼'}
                </label>
                <Input
                  type="password"
                  placeholder={isEn ? 'Enter your password' : '輸入密碼'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Sign In Button */}
              <PremierButton
                type="submit"
                variant="primary"
                size="lg"
                icon={LogIn}
                loading={loading}
                className="w-full"
              >
                {isEn ? 'Sign In' : '登入'}
              </PremierButton>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-premier-gold/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-premier-black-light text-premier-pearl/60">
                    {isEn ? 'Or continue with' : '或使用其他方式登入'}
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              {process.env.NEXT_PUBLIC_GOOGLE_ENABLED !== 'false' && (
                <PremierButton
                  type="button"
                  variant="secondary"
                  size="lg"
                  icon={Chrome}
                  onClick={handleGoogleSignIn}
                  className="w-full"
                >
                  {isEn ? 'Sign in with Google' : '使用 Google 登入'}
                </PremierButton>
              )}
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-premier-pearl/60">
                {isEn ? "Don't have an account?" : '還未建立帳戶？'}{' '}
                <Link 
                  href={`${localePrefix}/signup`} 
                  className="text-premier-gold hover:text-premier-gold-rose font-medium transition-colors"
                >
                  {isEn ? 'Sign up' : '建立帳戶'}
                </Link>
              </p>
            </div>

            {/* Demo Accounts Info */}
            <div className="mt-5 p-4 bg-premier-mystery-violet/10 border border-premier-mystery-violet/20 rounded-premier-md">
              <p className="text-xs text-premier-pearl/50 text-center leading-relaxed">
                {isEn ? 'Demo accounts' : '示範帳戶'}: owner@wonglaw.hk / staff@wonglaw.hk
                <br />
                {isEn ? 'Password' : '密碼'}: demo123456
              </p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  );
}
