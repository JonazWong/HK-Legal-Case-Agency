'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Globe } from 'lucide-react';
import { Input, Select } from '@/components/ui';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/components/ui/glass-card';
import { PremierButton } from '@/components/ui/premier-button';
import { ParticleBackground } from '@/components/effects/particle-background';
import { pageVariants, pageTransition } from '@/lib/animations';

export default function SignupPage() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const isEn = pathname.startsWith('/en');
  const localePrefix = isEn ? '/en' : '/zh';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firmName: '',
    locale: 'zh',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(isEn ? 'Passwords do not match' : '密碼不相符');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          firmName: formData.firmName,
          locale: formData.locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (isEn ? 'Failed to create account' : '建立帳戶失敗'));
        setLoading(false);
        return;
      }

      // Auto sign in after successful registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-premier-black px-4 py-12 relative overflow-hidden">
      {/* Particle Background Effect */}
      <ParticleBackground particleCount={40} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-premier-mystery-violet/10 via-transparent to-premier-gold/5 pointer-events-none" />

      {/* Signup Card */}
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
              {isEn ? 'Create Your Account' : '建立您的帳戶'}
            </GlassCardTitle>
            <GlassCardDescription className="text-center text-premier-pearl/70">
              {isEn ? 'Start your 14-day free trial today' : '立即開始 14 天免費試用'}
            </GlassCardDescription>
          </GlassCardHeader>
          
          <GlassCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Full Name' : '姓名'}
                </label>
                <Input
                  name="name"
                  placeholder={isEn ? 'John Doe' : '陳大文'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Email Address' : '電郵地址'}
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder={isEn ? 'your@email.com' : 'your@email.com'}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Firm Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Firm Name' : '律所名稱'}
                </label>
                <Input
                  name="firmName"
                  placeholder={isEn ? 'Your Law Firm Ltd.' : '貴律師事務所'}
                  value={formData.firmName}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  placeholder={isEn ? 'Min. 8 characters' : '最少 8 個字元'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
                <p className="text-xs text-premier-pearl/50 mt-1">
                  {isEn
                    ? 'Must contain uppercase, lowercase, number, and special character'
                    : '必須包含大階、小階、數字及特殊符號'}
                </p>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Confirm Password' : '確認密碼'}
                </label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder={isEn ? 'Re-enter your password' : '再次輸入密碼'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl placeholder:text-premier-pearl/30 focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Language Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-premier-pearl/90">
                  {isEn ? 'Preferred Language' : '偏好語言'}
                </label>
                <Select
                  name="locale"
                  value={formData.locale}
                  onChange={handleChange}
                  options={[
                    { value: 'zh', label: isEn ? 'Traditional Chinese (繁體中文)' : '繁體中文 (Traditional Chinese)' },
                    { value: 'en', label: isEn ? 'English' : '英文 (English)' },
                  ]}
                  className="bg-premier-black/50 border-premier-gold/30 text-premier-pearl focus:border-premier-gold focus:ring-premier-gold/20"
                />
              </div>

              {/* Create Account Button */}
              <PremierButton
                type="submit"
                variant="primary"
                size="lg"
                icon={UserPlus}
                loading={loading}
                className="w-full mt-6"
              >
                {isEn ? 'Create Account' : '建立帳戶'}
              </PremierButton>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-premier-pearl/60">
                {isEn ? 'Already have an account?' : '已經有帳戶？'}{' '}
                <Link 
                  href={`${localePrefix}/login`} 
                  className="text-premier-gold hover:text-premier-gold-rose font-medium transition-colors"
                >
                  {isEn ? 'Sign in' : '登入'}
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-5 p-4 bg-premier-mystery-violet/10 border border-premier-mystery-violet/20 rounded-premier-md">
              <p className="text-xs text-premier-pearl/50 text-center leading-relaxed">
                {isEn
                  ? 'By creating an account, you agree to our Terms of Service and Privacy Policy'
                  : '建立帳戶即表示你同意我們的服務條款及私隱政策'}
              </p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  );
}

