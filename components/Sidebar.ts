import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from './ConfirmationDialog'

export class Sidebar {
  readonly dashboardLink: Locator
  readonly stockItemsLink: Locator
  readonly suppliersLink: Locator
  readonly purchasesLink: Locator
  readonly customersLink: Locator
  readonly salesLink: Locator
  readonly outstandingsLink: Locator
  readonly administratorLink: Locator
  readonly helpCategoriesLink: Locator
  readonly settingsLink: Locator
  readonly logoutLink: Locator
  readonly logoutConfirmation: ConfirmationDialog

  constructor(private readonly page: Page) {
    this.dashboardLink = this.link('Dashboard')
    this.stockItemsLink = this.link('Stock Items')
    this.suppliersLink = this.link('Suppliers')
    this.purchasesLink = this.link('Purchases')
    this.customersLink = this.link('Customers')
    this.salesLink = this.link('Sales')
    this.outstandingsLink = this.link('Outstandings')
    this.administratorLink = this.link('Administrator')
    this.helpCategoriesLink = this.link('Help (Categories)')
    this.settingsLink = this.link('Settings')
    this.logoutLink = page.locator('#logout')
    this.logoutConfirmation = new ConfirmationDialog(page)
  }

  async logout() {
    await this.logoutLink.click()
    await this.logoutConfirmation.confirm()
    await this.page.waitForURL(/login\.php/)
  }

  private link(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }
}
