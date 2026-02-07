import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'zh';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
