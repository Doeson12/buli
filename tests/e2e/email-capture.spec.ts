import { test, expect } from '@playwright/test'

test.describe('Email Capture', () => {
  test('should validate email format', async ({ page }) => {
    await page.goto('/')
    
    // Find email input
    const emailInput = page.locator('input[type="email"]').first()
    const submitButton = emailInput.locator('..').locator('button').first()
    
    // Try submitting invalid email
    await emailInput.fill('invalid-email')
    await submitButton.click()
    
    // Should show error
    await expect(page.locator('text=/valid email/i')).toBeVisible()
  })
  
  test('should handle successful submission', async ({ page }) => {
    // Mock API response
    await page.route('**/api/subscribe', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          message: 'Thanks! Check your email to confirm.',
          success: true 
        }),
      })
    })
    
    await page.goto('/')
    
    // Find email form
    const emailInput = page.locator('input[type="email"]').first()
    const submitButton = emailInput.locator('..').locator('button').first()
    
    // Submit valid email
    await emailInput.fill('test@example.com')
    await submitButton.click()
    
    // Should show success message
    await expect(page.locator('text=/Thanks!/i')).toBeVisible()
  })
  
  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/subscribe', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ 
          error: 'Something went wrong. Please try again.'
        }),
      })
    })
    
    await page.goto('/')
    
    // Find email form
    const emailInput = page.locator('input[type="email"]').first()
    const submitButton = emailInput.locator('..').locator('button').first()
    
    // Submit email
    await emailInput.fill('test@example.com')
    await submitButton.click()
    
    // Should show error message
    await expect(page.locator('text=/went wrong/i')).toBeVisible()
  })
  
  test('should disable form during submission', async ({ page }) => {
    // Mock slow API
    await page.route('**/api/subscribe', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })
    
    await page.goto('/')
    
    const emailInput = page.locator('input[type="email"]').first()
    const submitButton = emailInput.locator('..').locator('button').first()
    
    await emailInput.fill('test@example.com')
    await submitButton.click()
    
    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled()
    await expect(emailInput).toBeDisabled()
    
    // Wait for completion
    await page.waitForTimeout(1100)
    
    // Should be re-enabled (or show success)
    const isDisabled = await submitButton.isDisabled()
    const hasSuccess = await page.locator('text=/Thanks!/i').isVisible()
    
    expect(isDisabled || hasSuccess).toBe(true)
  })
})

