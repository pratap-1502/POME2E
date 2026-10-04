import { test, expect } from '../../fixtures/erp.fixture'
import {
  buildCustomer,
  buildSale,
  buildStockItem,
  buildSupplier,
} from '../../data/record.builders'
import { environment } from '../../config/environment'
import { FeedbackBanner } from '../../components/FeedbackBanner'

async function expectAddSucceeded(feedback: FeedbackBanner) {
  await expect(feedback.error).not.toBeVisible()
  await expect(feedback.success).toBeVisible()
  await expect(feedback.success).toContainText(/add succeeded|successfully added/i)
}

test.describe('record creation @regression @write', () => {
  test.describe.configure({ mode: 'serial' })

  test.skip(
    !environment.runMutatingTests,
    'Set RUN_MUTATING_TESTS=1 because these tests add records to the shared ERP site.',
  )

  test('supplier can be added successfully', async ({ suppliersPage }) => {
    const supplier = buildSupplier()

    await suppliersPage.goto()
    await suppliersPage.openAddForm()
    const generatedNumber = await suppliersPage.generatedNumber()
    await suppliersPage.fillForm(supplier)
    await suppliersPage.submit()
    await suppliersPage.confirmAdd()

    await expect(suppliersPage.page).toHaveURL(/a_supplierslist\.php/)
    await expectAddSucceeded(suppliersPage.feedback)
    expect(generatedNumber).toMatch(/^Supplier-\d+$/)
  })

  test('customer can be added successfully', async ({ customersPage }) => {
    const customer = buildCustomer()

    await customersPage.goto()
    await customersPage.openAddForm()
    const generatedNumber = await customersPage.generatedNumber()
    await customersPage.fillForm(customer)
    await customersPage.submit()
    await customersPage.confirmAdd()

    await expect(customersPage.page).toHaveURL(/a_customerslist\.php/)
    await expectAddSucceeded(customersPage.feedback)
    expect(generatedNumber).toMatch(/^Customer-\d+$/)
  })

  test('stock item can be added successfully', async ({ stockItemsPage, suppliersPage }) => {
    const supplier = buildSupplier()
    const stockItem = buildStockItem()

    await suppliersPage.goto()
    await suppliersPage.openAddForm()
    await suppliersPage.fillForm(supplier)
    await suppliersPage.submit()
    await suppliersPage.confirmAdd()
    await expectAddSucceeded(suppliersPage.feedback)

    await stockItemsPage.goto()
    await stockItemsPage.openAddForm()
    const generatedNumber = await stockItemsPage.generatedNumber()
    await stockItemsPage.fillForm(stockItem, supplier.name)
    await stockItemsPage.submit()
    await stockItemsPage.confirmAdd()

    await expect(stockItemsPage.page).toHaveURL(/a_stock_itemslist\.php/)
    await expectAddSucceeded(stockItemsPage.feedback)
    expect(generatedNumber).toMatch(/^Stock-\d+$/)
  })

  test('sale can be added successfully', async ({
    customersPage,
    salesPage,
    stockItemsPage,
    suppliersPage,
  }) => {
    const supplier = buildSupplier()
    const customer = buildCustomer()
    const stockItem = buildStockItem()
    const sale = buildSale()

    await suppliersPage.goto()
    await suppliersPage.openAddForm()
    await suppliersPage.fillForm(supplier)
    await suppliersPage.submit()
    await suppliersPage.confirmAdd()
    await expectAddSucceeded(suppliersPage.feedback)

    await stockItemsPage.goto()
    await stockItemsPage.openAddForm()
    await stockItemsPage.fillForm(stockItem, supplier.name)
    await stockItemsPage.submit()
    await stockItemsPage.confirmAdd()
    await expectAddSucceeded(stockItemsPage.feedback)

    await customersPage.goto()
    await customersPage.openAddForm()
    await customersPage.fillForm(customer)
    await customersPage.submit()
    await customersPage.confirmAdd()
    await expectAddSucceeded(customersPage.feedback)

    await salesPage.goto()
    await salesPage.openAddForm()
    const generatedNumber = await salesPage.generatedNumber()
    await salesPage.fillForm(sale, {
      customerName: customer.name,
      stockItemName: stockItem.name,
    })
    await salesPage.submit()
    await salesPage.confirmAdd()

    await expect(salesPage.page).toHaveURL(/a_saleslist\.php/)
    await expectAddSucceeded(salesPage.feedback)
    expect(generatedNumber).toMatch(/^Sales-\d+$/)
  })
})


