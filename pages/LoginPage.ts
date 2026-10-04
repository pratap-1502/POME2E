import { Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly resetButton: Locator

  constructor(readonly page: Page) {
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('#btnsubmit')
    this.resetButton = page.locator('#btnreset')
  }

  async goto() {
    await this.page.goto('/login.php')
    await this.loginButton.waitFor({ state: 'visible' })
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
