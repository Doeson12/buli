import { getRequestConfig } from 'next-intl/server';
import { messages } from '../lib/i18n/messages';
 
export default getRequestConfig(async ({ locale }) => {
  // Default to 'en' if no locale is provided
  const resolvedLocale = locale || 'en';
  
  return {
    locale: resolvedLocale,
    messages: messages[resolvedLocale as keyof typeof messages] || messages.en
  };
});

