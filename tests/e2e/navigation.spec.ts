import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/')
    
    // Check homepage loads
    await expect(page.locator('h1')).toContainText('Train smarter')
    
    // Navigate to Science
    await page.click('text=Science')
    await expect(page).toHaveURL('/science')
    await expect(page.locator('h1')).toContainText('Science')
    
    // Navigate to Pricing
    await page.click('text=Pricing')
    await expect(page).toHaveURL('/pricing')
    await expect(page.locator('h1')).toContainText('Pricing')
    
    // Navigate to Blog
    await page.click('text=Blog')
    await expect(page).toHaveURL('/blog')
    await expect(page.locator('h1')).toContainText('Blog')
    
    // Navigate to Community
    await page.click('text=Community')
    await expect(page).toHaveURL('/community')
    await expect(page.locator('h1')).toContainText('Community')
    
    // Navigate to Support
    await page.click('text=Support')
    await expect(page).toHaveURL('/support')
    await expect(page.locator('h1')).toContainText('help')
  })
  
  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Tab through navigation items
    await page.keyboard.press('Tab') // Skip to main content or first nav item
    
    // Find first navigation link
    const firstNavLink = page.locator('nav a').first()
    await firstNavLink.focus()
    
    // Verify focus is visible
    await expect(firstNavLink).toBeFocused()
    
    // Press Enter to navigate
    await page.keyboard.press('Enter')
    
    // Verify navigation occurred
    await expect(page).not.toHaveURL('/')
  })
  
  test('mobile menu should work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu"]')
    await expect(menuButton).toBeVisible()
    
    // Open mobile menu
    await menuButton.click()
    await expect(page.locator('nav a:has-text("Science")')).toBeVisible()
    
    // Close menu with Escape key
    await page.keyboard.press('Escape')
    
    // Menu should close (navigation links hidden)
    await expect(page.locator('nav a:has-text("Science")').last()).not.toBeVisible()
  })
  
  test('should have sticky navigation on scroll', async ({ page }) => {
    await page.goto('/')
    
    const nav = page.locator('nav')
    
    // Check initial state
    await expect(nav).toBeVisible()
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(100)
    
    // Nav should still be visible (sticky)
    await expect(nav).toBeVisible()
  })
})

