import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages`)).messages[locale as 'en' | 'fi'],
}))

