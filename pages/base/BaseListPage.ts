import { Locator, Page } from '@playwright/test'

export abstract class BaseListPage {
  readonly recordsTable: Locator
  readonly quickSearchInput: Locator
  readonly quickSearchButton: Locator
  readonly quickSearchToggle: Locator

  protected constructor(
    readonly page: Page,
    readonly path: string,
    readonly urlPattern: RegExp,
  ) {
    this.recordsTable = page.locator('table.ewTable').first()
    const quickSearchForm = page.locator('form.ewForm').filter({ has: page.locator('#psearch') })
    this.quickSearchInput = quickSearchForm.locator('#psearch')
    this.quickSearchButton = quickSearchForm.locator('#btnsubmit')
    this.quickSearchToggle = page.locator('.ewSearchToggle')
  }

  async goto() {
    await this.page.goto(this.path)
    await this.waitUntilLoaded()
  }

  async waitUntilLoaded() {
    await this.page.waitForURL(this.urlPattern)
    await this.recordsTable.waitFor({ state: 'visible' })
  }

  protected async search(searchTerm: string) {
    if (!(await this.quickSearchInput.isVisible())) {
      await this.quickSearchToggle.click()
      await this.quickSearchInput.waitFor({ state: 'visible' })
    }
    await this.quickSearchInput.fill(searchTerm)
    await this.quickSearchButton.click()
    await this.waitUntilLoaded()
  }
}
