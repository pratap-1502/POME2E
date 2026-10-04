import { Locator, Page } from '@playwright/test'

export class FeedbackBanner {
  readonly success: Locator
  readonly error: Locator
  readonly successDialog: Locator
  readonly dismissSuccessButton: Locator

  constructor(page: Page) {
    this.success = page.locator('.alert-success, .ewSuccess').first()
    this.error = page.locator('.alert-danger, .alert-error, .ewError').first()
    this.successDialog = page
      .locator('.alertify.ajs-in')
      .filter({ has: page.locator('.alert-success, .ewSuccess') })
    this.dismissSuccessButton = this.successDialog.getByRole('button', {
      name: 'OK',
      exact: true,
    })
  }

  async dismissSuccess() {
    await this.dismissSuccessButton.click()
    await this.successDialog.waitFor({ state: 'hidden' })
  }
}
