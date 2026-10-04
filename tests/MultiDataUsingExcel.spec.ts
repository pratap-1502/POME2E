import { resolve } from 'node:path'
import { environment } from '../config/environment'
import { ExcelFileUtil } from '../data/ExcelFileUtil'
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

const workbookPath = resolve(process.cwd(), 'TestData', 'ERPExceldata.xlsx')
const suppliers = ExcelFileUtil.getExcelData<SupplierDataRecord>(
  workbookPath,
  'supplierdata',
)
const customers = ExcelFileUtil.getExcelData<CustomerDataRecord>(
  workbookPath,
  'customerdata',
)

test.describe('multiple ERP data from Excel @regression @write', () => {
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

  for (const supplierRecord of suppliers) {
    test(`Validate Supplier: ${supplierRecord.Name}`, async ({
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

  for (const customerRecord of customers) {
    test(`Validate Customer Module: ${customerRecord.Name}`, async ({
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
