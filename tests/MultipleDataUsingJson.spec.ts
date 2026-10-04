import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { environment } from '../config/environment'
import {
  CustomerDataRecord,
  mapCustomerData,
  mapSupplierData,
  SupplierDataRecord,
} from '../data/party-data.mapper'
import { expect, test } from '../fixtures/erp.fixture'
import {
  createAndVerifyCustomer,
  createAndVerifySupplier,
} from './support/partyFlows'

interface ErpJsonData {
  readonly suppliers: SupplierDataRecord[]
  readonly customers: CustomerDataRecord[]
}

const dataFile = resolve(process.cwd(), 'TestData', 'ERPData.json')
const data = JSON.parse(readFileSync(dataFile, 'utf8')) as ErpJsonData

test.describe('multiple ERP data from JSON @regression @write', () => {
  test.describe.configure({ mode: 'serial' })
  test.skip(
    !environment.runMutatingTests,
    'Set RUN_MUTATING_TESTS=1 because these tests add records to the shared ERP site.',
  )

  test.beforeEach(async ({ dashboardPage }) => {
    await expect(dashboardPage.userName).toContainText('Administrator')
  })

  test.afterEach(async ({ loginPage, sidebar }) => {
    await sidebar.logout()
    await expect(loginPage.loginButton).toBeVisible()
  })

  for (const supplierRecord of data.suppliers) {
    test(`Validate Supplier: ${supplierRecord.SupplierName}`, async ({
      sidebar,
      suppliersPage,
    }) => {
      await createAndVerifySupplier(
        suppliersPage,
        sidebar,
        mapSupplierData(supplierRecord),
      )
    })
  }

  for (const customerRecord of data.customers) {
    test(`Validate Customer Module: ${customerRecord.CustomerName}`, async ({
      customersPage,
      sidebar,
    }) => {
      await createAndVerifyCustomer(
        customersPage,
        sidebar,
        mapCustomerData(customerRecord),
      )
    })
  }
})
