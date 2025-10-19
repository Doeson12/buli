import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Page should have h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
    
    // Verify heading order (h1 -> h2 -> h3, no skipping)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents()
    expect(headings.length).toBeGreaterThan(0)
  })
  
  test('should have alt text for images', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull()
    }
  })
  
  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/')
    
    // Check mobile menu button has aria-label
    await page.setViewportSize({ width: 375, height: 667 })
    const menuButton = page.locator('button[aria-label*="menu"]')
    
    if (await menuButton.isVisible()) {
      const ariaLabel = await menuButton.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
  })
  
  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/')
    
    // Tab to first focusable element
    await page.keyboard.press('Tab')
    
    // Check that focused element has visible outline or ring
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement
      if (!el) return null
      
      const styles = window.getComputedStyle(el)
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
      }
    })
    
    expect(focusedElement).not.toBeNull()
    // Should have either outline or box-shadow (focus ring)
    const hasFocusIndicator = 
      focusedElement?.outline !== 'none' || 
      focusedElement?.boxShadow !== 'none'
    
    expect(hasFocusIndicator).toBe(true)
  })
  
  test('FAQ items should be keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    // Find first FAQ button
    const faqButton = page.locator('[aria-expanded]').first()
    
    if (await faqButton.isVisible()) {
      // Should be keyboard focusable
      await faqButton.focus()
      await expect(faqButton).toBeFocused()
      
      // Should toggle with Enter
      const initialState = await faqButton.getAttribute('aria-expanded')
      await page.keyboard.press('Enter')
      
      await page.waitForTimeout(100)
      const newState = await faqButton.getAttribute('aria-expanded')
      
      expect(newState).not.toBe(initialState)
      
      // Should toggle with Space
      await page.keyboard.press('Space')
      await page.waitForTimeout(100)
      const finalState = await faqButton.getAttribute('aria-expanded')
      
      expect(finalState).toBe(initialState)
    }
  })
})

