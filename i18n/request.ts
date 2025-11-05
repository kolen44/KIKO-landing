import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  // default locale changed to Russian as requested
  const locale = localeCookie?.value || 'ru'; 

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    timeZone: 'Europe/Istanbul'
  };
});