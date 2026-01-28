'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

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
      setError('Passwords do not match');
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
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-teal-dark">
            {isEn ? 'Create Your Account' : '建立您的帳戶'}
          </CardTitle>
          <CardDescription className="text-center">
            {isEn ? 'Start your 14-day free trial today' : '立即開始 14 天免費試用'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-alert-red bg-opacity-10 border border-alert-red rounded-md">
                <p className="text-sm text-alert-red">{error}</p>
              </div>
            )}

            <Input
              label={isEn ? 'Full Name' : '姓名'}
              name="name"
              placeholder={isEn ? 'John Doe' : '陳大文'}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label={isEn ? 'Email Address' : '電郵地址'}
              name="email"
              type="email"
              placeholder={isEn ? 'your@email.com' : 'your@email.com'}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label={isEn ? 'Firm Name' : '律所名稱'}
              name="firmName"
              placeholder={isEn ? 'Your Law Firm Ltd.' : '貴律師事務所'}
              value={formData.firmName}
              onChange={handleChange}
              required
            />

            <Input
              label={isEn ? 'Password' : '密碼'}
              name="password"
              type="password"
              placeholder={isEn ? 'Min. 8 characters' : '最少 8 個字元'}
              value={formData.password}
              onChange={handleChange}
              helperText={
                isEn
                  ? 'Must contain uppercase, lowercase, number, and special character'
                  : '必須包含大階、小階、數字及特殊符號'
              }
              required
            />

            <Input
              label={isEn ? 'Confirm Password' : '確認密碼'}
              name="confirmPassword"
              type="password"
              placeholder={isEn ? 'Re-enter your password' : '再次輸入密碼'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Select
              label={isEn ? 'Preferred Language' : '偏好語言'}
              name="locale"
              value={formData.locale}
              onChange={handleChange}
              options={[
                { value: 'zh', label: isEn ? 'Traditional Chinese (繁體中文)' : '繁體中文 (Traditional Chinese)' },
                { value: 'en', label: isEn ? 'English' : '英文 (English)' },
              ]}
            />

            <Button type="submit" fullWidth loading={loading}>
              {isEn ? 'Create Account' : '建立帳戶'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-cool-gray">
              {isEn ? 'Already have an account?' : '已經有帳戶？'}{' '}
              <Link href={`${localePrefix}/login`} className="text-mint-green hover:underline font-medium">
                {isEn ? 'Sign in' : '登入'}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-cool-gray">
              {isEn
                ? 'By creating an account, you agree to our Terms of Service and Privacy Policy'
                : '建立帳戶即表示你同意我們的服務條款及私隱政策'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
