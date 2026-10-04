import { expect, test } from '../../fixtures/erp.fixture'
import { environment } from '../../config/environment'
import { DashboardPage } from '../../pages/DashboardPage'

test('administrator can log in successfully @smoke', async ({ loginPage }) => {
  await loginPage.goto()
  await loginPage.login(environment.username, environment.password)

  const dashboardPage = new DashboardPage(loginPage.page)
  await expect(dashboardPage.page).toHaveURL(/dashboard\.php/)
  await expect(dashboardPage.page).toHaveTitle(/Dashboard/)
  await expect(dashboardPage.userName).toContainText('Administrator')
  await expect(dashboardPage.logoutLink).toBeVisible()
})
