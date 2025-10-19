import { test, expect } from '@playwright/test'

test.describe('Seamless Background', () => {
  test('background should persist across route changes', async ({ page }) => {
    await page.goto('/')
    
    // Get background element
    const background = page.locator('[class*="fixed"][class*="inset-0"][class*="-z-10"]').first()
    
    // Verify background is rendered
    await expect(background).toBeVisible()
    
    // Take initial screenshot region
    const initialBox = await background.boundingBox()
    expect(initialBox).toBeTruthy()
    
    // Navigate to another page
    await page.click('text=Science')
    await expect(page).toHaveURL('/science')
    
    // Background should still be visible
    await expect(background).toBeVisible()
    
    // Navigate to another page
    await page.click('text=Pricing')
    await expect(page).toHaveURL('/pricing')
    
    // Background should still be visible
    await expect(background).toBeVisible()
    
    // Verify no visual "cut" by checking background remains in DOM
    const backgroundAfter = page.locator('[class*="fixed"][class*="inset-0"][class*="-z-10"]').first()
    await expect(backgroundAfter).toBeVisible()
  })
  
  test('background should not remount on navigation', async ({ page }) => {
    await page.goto('/')
    
    // Add a test attribute to background via console
    await page.evaluate(() => {
      const bg = document.querySelector('[class*="fixed"][class*="inset-0"][class*="-z-10"]')
      if (bg) {
        (bg as HTMLElement).dataset.testId = 'original-background'
      }
    })
    
    // Navigate
    await page.click('text=Pricing')
    await expect(page).toHaveURL('/pricing')
    
    // Check if same background element exists
    const stillOriginal = await page.evaluate(() => {
      const bg = document.querySelector('[class*="fixed"][class*="inset-0"][class*="-z-10"]')
      return bg ? (bg as HTMLElement).dataset.testId === 'original-background' : false
    })
    
    expect(stillOriginal).toBe(true)
  })
  
  test('background animations should respect prefers-reduced-motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    
    // Check that animated elements don't have animation classes or have very short durations
    const animatedElements = page.locator('[class*="animate-float"]')
    const count = await animatedElements.count()
    
    if (count > 0) {
      // If animations exist, they should have reduced duration or be disabled
      const duration = await page.evaluate(() => {
        const el = document.querySelector('[class*="animate-float"]')
        if (!el) return null
        const style = window.getComputedStyle(el)
        return style.animationDuration
      })
      
      // Animation should be effectively disabled (very short)
      expect(duration).toMatch(/0\.01ms|0s/)
    }
  })
})

