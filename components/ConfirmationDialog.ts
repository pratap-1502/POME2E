import { Locator, Page } from '@playwright/test'

export class ConfirmationDialog {
  readonly confirmButton: Locator

  constructor(page: Page) {
    this.confirmButton = page.getByRole('button', { name: 'OK!', exact: true })
  }

  async confirm() {
    await this.confirmButton.click()
  }
}
