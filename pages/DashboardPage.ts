import { Locator, Page } from '@playwright/test'

export class DashboardPage {
  readonly path = '/dashboard.php'
  readonly urlPattern = /dashboard\.php/
  readonly userName: Locator
  readonly logoutLink: Locator

  constructor(readonly page: Page) {
    this.userName = page.locator('#msUserName')
    this.logoutLink = page.locator('#logout')
  }

  async goto() {
    await this.page.goto(this.path)
    await this.waitUntilLoaded()
  }

  async waitUntilLoaded() {
    await this.page.waitForURL(this.urlPattern)
    await this.userName.waitFor({ state: 'visible' })
  }
}
