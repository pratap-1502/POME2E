import { Locator, Page } from '@playwright/test'

export class FeedbackBanner {
  readonly success: Locator
  readonly error: Locator
  readonly dismissSuccessButton: Locator

  constructor(page: Page) {
    this.success = page.locator('.alert-success, .ewSuccess').first()
    this.error = page.locator('.alert-danger, .alert-error, .ewError').first()
    this.dismissSuccessButton = page.getByRole('button', {
      name: 'OK',
      exact: true,
    }).last()
  }

  async dismissSuccess() {
    if (await this.dismissSuccessButton.isVisible()) {
      await this.dismissSuccessButton.click()
    }
    await this.success.waitFor({ state: 'hidden' })
  }
}
