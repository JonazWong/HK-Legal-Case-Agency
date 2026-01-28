'use client';

import { usePathname, useRouter } from 'next/navigation';

const locales = ['zh', 'en'] as const;

type Locale = (typeof locales)[number];

function getCurrentLocale(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en';
  // 預設視為中文
  return 'zh';
}

function buildPath(pathname: string, nextLocale: Locale): string {
  if (!pathname || pathname === '/') {
    return `/${nextLocale}`;
  }

  // 登入 / 註冊頁：在切換語言時維持相同功能頁
  if (pathname === '/login' || pathname.startsWith('/login')) {
    return `/${nextLocale}/login`;
  }

  if (pathname === '/signup' || pathname.startsWith('/signup')) {
    return `/${nextLocale}/signup`;
  }

  if (pathname.startsWith('/en') || pathname.startsWith('/zh')) {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPath = segments.join('/');
    return newPath || '/';
  }

  // 對於沒有語言前綴的路徑，切換語言時導向對應語言的首頁
  return `/${nextLocale}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const currentLocale = getCurrentLocale(pathname);

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return;

    // 設定 next-intl 使用的 cookie，讓後續請求沿用所選語言
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/`;

    const targetPath = buildPath(pathname, nextLocale);
    router.push(targetPath);
  };

  const baseButton =
    'px-2 py-1 text-xs font-semibold rounded-md border transition-colors';

  return (
    <div className="inline-flex items-center gap-1 bg-black/60 text-gray-100 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => handleSwitch('zh')}
        className={`${baseButton} ${
          currentLocale === 'zh'
            ? 'bg-accent border-accent text-black'
            : 'bg-transparent border-gray-500 text-gray-200 hover:bg-gray-700'
        }`}
      >
        中文
      </button>
      <span className="text-gray-400 text-xs">/</span>
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        className={`${baseButton} ${
          currentLocale === 'en'
            ? 'bg-accent border-accent text-black'
            : 'bg-transparent border-gray-500 text-gray-200 hover:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}
