import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fi'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always use prefix for locale routes
  localePrefix: 'always'
});
 
export const config = {
  // Only match locale-prefixed routes
  // This allows non-localized pages to work normally
  matcher: ['/(en|fi)/:path*']
};

