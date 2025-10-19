import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a default locale
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`../lib/i18n/messages.ts`)).default
  };
});

