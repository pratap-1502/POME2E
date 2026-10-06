import { expect } from '@playwright/test'
import { Sidebar } from '../../components/Sidebar'
import { CustomersPage } from '../../pages/CustomersPage'
import { SuppliersPage } from '../../pages/SuppliersPage'
import { CustomerInput, SupplierInput } from '../../types/record.types'

async function expectAddSucceeded(
  feedback: SuppliersPage['feedback'] | CustomersPage['feedback'],
) {
  await expect(feedback.error).not.toBeVisible()
  await expect(feedback.success).toBeVisible()
  await expect(feedback.success).toContainText(/add succeeded|successfully added/i)
  await feedback.dismissSuccess()
}

export async function createAndVerifySupplier(
  suppliersPage: SuppliersPage,
  sidebar: Sidebar,
  supplier: SupplierInput,
) {
  await sidebar.suppliersLink.click()
  await suppliersPage.waitUntilLoaded()
  await suppliersPage.openAddForm()
  const generatedNumber = await suppliersPage.generatedNumber()
  await suppliersPage.fillForm(supplier)
  await suppliersPage.submit()
  await suppliersPage.confirmAdd()

  await expect(suppliersPage.page).toHaveURL(/a_supplierslist\.php/)
  await expectAddSucceeded(suppliersPage.feedback)
  expect(generatedNumber).toMatch(/^Supplier-\d+$/)

  await suppliersPage.searchByNumber(generatedNumber)
  await expect.poll(() => suppliersPage.foundSupplierNumber()).toBe(generatedNumber)
}

export async function createAndVerifyCustomer(
  customersPage: CustomersPage,
  sidebar: Sidebar,
  customer: CustomerInput,
) {
  await sidebar.customersLink.click()
  await customersPage.waitUntilLoaded()
  await customersPage.openAddForm()
  const generatedNumber = await customersPage.generatedNumber()
  await customersPage.fillForm(customer)
  await customersPage.submit()
  await customersPage.confirmAdd()

  await expect(customersPage.page).toHaveURL(/a_customerslist\.php/)
  await expectAddSucceeded(customersPage.feedback)
  expect(generatedNumber).toMatch(/^Customer-\d+$/)

  await customersPage.searchByNumber(generatedNumber)
  await expect.poll(() => customersPage.foundCustomerNumber()).toBe(generatedNumber)
}
