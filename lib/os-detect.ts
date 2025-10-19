/**
 * Detect user's operating system
 */
export function detectOS(): 'iOS' | 'Android' | 'Mac' | 'Windows' | 'Linux' | 'Unknown' {
  if (typeof window === 'undefined') return 'Unknown'
  
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS'
  }
  
  // Android detection
  if (/android/i.test(userAgent)) {
    return 'Android'
  }
  
  // Mac detection
  if (/Mac/.test(platform)) {
    return 'Mac'
  }
  
  // Windows detection
  if (/Win/.test(platform)) {
    return 'Windows'
  }
  
  // Linux detection
  if (/Linux/.test(platform)) {
    return 'Linux'
  }
  
  return 'Unknown'
}

/**
 * Check if the current device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}

/**
 * Get the appropriate app store link based on OS
 */
export function getAppStoreLink(os: ReturnType<typeof detectOS>): string {
  // Replace with actual App Store URLs
  const links = {
    iOS: 'https://apps.apple.com/app/idXXXXXXXXX',
    Android: 'https://play.google.com/store/apps/details?id=com.buli.app',
    default: 'https://apps.apple.com/app/idXXXXXXXXX',
  }
  
  return os === 'iOS' || os === 'Android' ? links[os] : links.default
}

/**
 * Get deep link for the app
 */
export function getDeepLink(): string {
  return 'buli://'
}

