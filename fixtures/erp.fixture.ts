import { test as base, expect, Page } from '@playwright/test'
import { SessionKeeper } from '../auth/SessionKeeper'
import { Sidebar } from '../components/Sidebar'
import { environment } from '../config/environment'
import { AdministratorPage } from '../pages/AdministratorPage'
import { CustomersPage } from '../pages/CustomersPage'
import { DashboardPage } from '../pages/DashboardPage'
import { HelpCategoriesPage } from '../pages/HelpCategoriesPage'
import { LoginPage } from '../pages/LoginPage'
import { OutstandingsPage } from '../pages/OutstandingsPage'
import { PurchasesPage } from '../pages/PurchasesPage'
import { SalesPage } from '../pages/SalesPage'
import { SettingsPage } from '../pages/SettingsPage'
import { StockItemsPage } from '../pages/StockItemsPage'
import { SuppliersPage } from '../pages/SuppliersPage'

type ErpFixtures = {
  administratorPage: AdministratorPage
  authenticatedPage: Page
  customersPage: CustomersPage
  dashboardPage: DashboardPage
  helpCategoriesPage: HelpCategoriesPage
  loginPage: LoginPage
  outstandingsPage: OutstandingsPage
  purchasesPage: PurchasesPage
  salesPage: SalesPage
  settingsPage: SettingsPage
  sidebar: Sidebar
  stockItemsPage: StockItemsPage
  suppliersPage: SuppliersPage
}

export const test = base.extend<ErpFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.goto()
    await loginPage.login(
      environment.username,
      environment.password,
    )
    await new DashboardPage(page).waitUntilLoaded()
    const sessionKeeper = new SessionKeeper(page)
    sessionKeeper.start()
    try {
      await use(page)
    } finally {
      sessionKeeper.stop()
    }
  },

  dashboardPage: async ({ authenticatedPage }, use) => {
    await use(new DashboardPage(authenticatedPage))
  },

  stockItemsPage: async ({ authenticatedPage }, use) => {
    await use(new StockItemsPage(authenticatedPage))
  },

  suppliersPage: async ({ authenticatedPage }, use) => {
    await use(new SuppliersPage(authenticatedPage))
  },

  purchasesPage: async ({ authenticatedPage }, use) => {
    await use(new PurchasesPage(authenticatedPage))
  },

  customersPage: async ({ authenticatedPage }, use) => {
    await use(new CustomersPage(authenticatedPage))
  },

  salesPage: async ({ authenticatedPage }, use) => {
    await use(new SalesPage(authenticatedPage))
  },

  outstandingsPage: async ({ authenticatedPage }, use) => {
    await use(new OutstandingsPage(authenticatedPage))
  },

  administratorPage: async ({ authenticatedPage }, use) => {
    await use(new AdministratorPage(authenticatedPage))
  },

  helpCategoriesPage: async ({ authenticatedPage }, use) => {
    await use(new HelpCategoriesPage(authenticatedPage))
  },

  settingsPage: async ({ authenticatedPage }, use) => {
    await use(new SettingsPage(authenticatedPage))
  },

  sidebar: async ({ authenticatedPage }, use) => {
    await use(new Sidebar(authenticatedPage))
  },
})

export { expect }
